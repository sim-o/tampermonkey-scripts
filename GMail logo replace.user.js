// ==UserScript==
// @name         GMail logo replace
// @namespace    mailto:simon.kerle@rsvp.com.au
// @version      0.1
// @description  enter something useful
// @author       Simon Kerle
// @match        https://mail.google.com/mail/u/*
// @grant        none
// ==/UserScript==

var styleContent = [
    '#gbq1 a { height: 60px; overflow: hidden; text-decoration: none; }',
    '#gbq1 a:before {',
    ' content: "Simon!"; height: 60px; display: block;',
    ' color: rgb(255, 255, 255);',
    ' font-size: 25px;',
    ' padding-left: 30px;',
    ' text-shadow: rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px, rgb(255, 255, 255) 0px 0px 15px, rgb(255, 45, 149) 0px 0px 20px, rgb(255, 45, 149) 0px 0px 30px, rgb(255, 45, 149) 0px 0px 40px, rgb(255, 45, 149) 0px 0px 50px, rgb(255, 45, 149) 0px 0px 75px;',
    '}'
].join('\n');

var style = document.createElement('style');
style.appendChild(document.createTextNode(styleContent));
document.body.appendChild(style);