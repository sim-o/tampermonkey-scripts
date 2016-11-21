// ==UserScript==
// @name         JIRA Stay Logged In
// @namespace    s.kerle@gmail.com/jirastayloggedin
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rsvpops.atlassian.net/*
// @grant        GM_xmlhttpRequest
// @connect      self
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var username = "simon.kerle",
        password = [192, 235, 230, 237, 180, 180, 228, 225, 228]
            .map(function (c) { return String.fromCharCode(0x85 ^ c); }).join('');

    setInterval(function () {
        $.ajax({
            method: 'POST',
            url: '/rest/auth/1/session',
            data: JSON.stringify({ username: username, password: password }),
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            dataType: 'json'
        });
    }, 60000);
})();