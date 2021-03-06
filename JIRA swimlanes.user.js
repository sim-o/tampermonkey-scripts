// ==UserScript==
// @name         JIRA Swimlanes
// @namespace    https://github.com/sim-o/tampermonkey-scripts/jira.swimlanes.user.js
// @version      0.9
// @description  Shrink JIRA swimlanes
// @author       Simon Kerle
// @match        http://jira.rpdata.local/secure/RapidBoard.jspa*
// @match        https://jira.rpdata.local/secure/RapidBoard.jspa*
// @match        http://jira/secure/RapidBoard.jspa*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const toggled = {};

    function toggle(index) {
        console.log('toggling', index);
        if (toggled[index] === undefined) {
            GM_addStyle(`
                body.hidden-${index} .ghx-columns .ghx-column:nth-of-type(${index}),
                body.hidden-${index} .ghx-column-headers .ghx-column:nth-of-type(${index}),
                body.hidden-${index} .ghx-zone-overlay-table .ghx-zone-overlay-column:nth-of-type(${index}) { width: 20px !important; overflow-x: hidden !important; }
                body.hidden-${index} .ghx-columns .ghx-column:nth-of-type(${index}) > * { display: none; }
                body.hidden-${index} .ghx-column-headers .ghx-column:nth-of-type(${index}) h2 { white-space: pre; transform: rotate(90deg); }
            `);
        }
        toggled[index] = !toggled[index];

        if (toggled[index]) {
            document.body.classList.add(`hidden-${index}`);
        } else {
            document.body.classList.remove(`hidden-${index}`);
        }

        GM_setValue('toggled', JSON.stringify(toggled));
    }

    document.addEventListener('click', (e) => {
        let target = e.target;
        while (target) {
            if (target.parentNode.id === 'ghx-column-headers') {
                break;
            }
            target = target.parentNode;
        }

        if (target) {
            let index = 0;
            let sibling = target;
            while (sibling) {
                sibling = sibling.previousSibling;
                index++;
            }

            toggle(index);
        }
    });

    const loaded = GM_getValue('toggled', '{}');
    console.log('loaded', loaded);

    Object.entries(JSON.parse(loaded)).forEach(([key, value]) => { if (value) toggle(key); });

    setTimeout(() => {
        GM_addStyle(`
            .ghx-column-headers .ghx-column { cursor: pointer; overflow: hidden; }
            .ghx-column-headers .ghx-column h2 { transition: 300ms all; transform-origin: 12px 50%; }
        `);
        GH.MouseUtils.openInSameTab = (e) => {
            e.preventDefault();
            let target = e.target;
            while (target !== null && !target.classList.contains('ghx-issue')) {
                target = target.parentNode;
            }
            if (target) {
                const key = target.querySelector('.ghx-key a').href;
                window.open(key);
            }
            throw 'stop';
        };
    }, 10);
})();
