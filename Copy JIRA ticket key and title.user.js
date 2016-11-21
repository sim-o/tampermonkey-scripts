// ==UserScript==
// @name         Copy JIRA ticket key and title
// @namespace    simon.kerle@rsvp.com.au/Jira copy
// @version      0.1
// @description  Adds a copy to clipboard icon next to the ticket key at the top of each ticket page.
// @author       Simon Kerle
// @match        https://*.atlassian.net/browse/*
// @grant        GM_setClipboard
// @grant        GM_log
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    var pushState = unsafeWindow.history.pushState,
        replaceState = unsafeWindow.history.replaceState,
        iv;

    var check = function () {
        if (!iv) {
            iv = setInterval(function () {
                GM_log('check');
                if (findAndFix()) {
                    GM_log('found');
                    clearInterval(iv);
                    iv = null;
                }
            }, 200);
        }
    };

    unsafeWindow.history.pushState = function () {
        pushState.apply(unsafeWindow.history, arguments);
        check();
    };
    unsafeWindow.history.replaceState = function () {
        replaceState.apply(unsafeWindow.history, arguments);
        check();
    };

    findAndFix();
})();

function findAndFix() {
    'use strict';

    var after = document.querySelector('#key-val');
    if (!after) return false;

    var button = document.createElement('button');
    button.style = 'margin: 4px 4px 2px 8px; padding: 4px 3px 2px 4px; position: relative;';
    button.innerHTML = '<svg aria-hidden="true" class="octicon octicon-clippy" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M2 12h4v1H2v-1z m5-6H2v1h5v-1z m2 3V7L6 10l3 3V11h5V9H9z m-4.5-1H2v1h2.5v-1zM2 11h2.5v-1H2v1z m9 1h1v2c-0.02 0.28-0.11 0.52-0.3 0.7s-0.42 0.28-0.7 0.3H1c-0.55 0-1-0.45-1-1V3c0-0.55 0.45-1 1-1h3C4 0.89 4.89 0 6 0s2 0.89 2 2h3c0.55 0 1 0.45 1 1v5h-1V5H1v9h10V12zM2 4h8c0-0.55-0.45-1-1-1h-1c-0.55 0-1-0.45-1-1s-0.45-1-1-1-1 0.45-1 1-0.45 1-1 1h-1c-0.55 0-1 0.45-1 1z"></path></svg>';

    after.parentNode.insertBefore(button, after.nextSibling);

    var success = document.createElement('div');
    success.className = '__GM_copy-ticket_success';
    success.innerText = 'Copied!';
    button.appendChild(success);

    var timeout = null;
    button.addEventListener('click', function () {
        var key = document.querySelector('#key-val').innerText;
        var description = document.querySelector('#summary-val').innerText;
        GM_setClipboard(key + ' - ' + description, 'text');

        success.className = '__GM_copy-ticket_success';
        success.className = '__GM_copy-ticket_success __GM_copy-ticket_show';
        button.blur();

        if (timeout !== null)
            clearTimeout(timeout);
        timeout = setTimeout(function () {
            success.className = '__GM_copy-ticket_success';
        }, 2000);
    });

    var style = document.createElement('style');
    style.appendChild(document.createTextNode([
        '.__GM_copy-ticket_success { position: absolute; left: 10px; top: -12px; opacity: 0; transition: opacity 500ms; background: #fff; border: 1px solid #8fa; padding: 3px }',
        '.__GM_copy-ticket_show { visibility: visible; opacity: 1; }'

    ].join('\n')));
    document.body.appendChild(style);
    return true;
}