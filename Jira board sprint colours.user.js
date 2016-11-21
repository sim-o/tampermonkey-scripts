// ==UserScript==
// @name         Jira board sprint colours
// @namespace    mailto:s.kerle+jirahsl@gmail.com
// @version      0.1
// @description  try to take over the world!
// @author       Simon
// @match        https://rsvpops.atlassian.net/secure/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function number(buffer, offset) {
        var view = new DataView(buffer);
        return view.getUint32(offset);
    }

    setInterval(() => {
        var issues = Array.apply(null, document.querySelectorAll('.ghx-issue'));
        issues.forEach(issue => {
            if (!issue.dataset.jirahsl) {
                issue.dataset.jirahsl = true;
                var sprint = issue.querySelector('.ghx-extra-field[data-tooltip^="Sprint:"]').getAttribute('data-tooltip').trim();
                crypto.subtle.digest('sha-1', new TextEncoder('utf-8').encode(sprint)).then(v => {
                    issue.style.background = 'hsl(' + (number(v,0) % 360) + ',' + (50 + (number(v,4) % 50)) + '%,90%)';
                });
            }
        });
    }, 100);

    // Your code here...
})();