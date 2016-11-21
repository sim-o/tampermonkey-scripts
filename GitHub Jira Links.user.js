// ==UserScript==
// @name         GitHub Jira Links
// @namespace    s.kerle@gmail.com/githubjira
// @version      0.1
// @description  Turns RSVP-\d+ into a Jira link
// @author       You
// @match        https://github.com/3HGroup/rsvp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function () {
        var title = document.querySelector('.js-issue-title');
        if (title.innerHTML.indexOf('<a') === -1) {
            var newTitle = title.innerHTML.replace(/RSVP-\d+\b/, function (g) {
                return '<a href="https://rsvpops.atlassian.net/browse/' + g + '">' + g + '</a>';
            });
            title.innerHTML = newTitle;
        }
    }, 1000);
})();