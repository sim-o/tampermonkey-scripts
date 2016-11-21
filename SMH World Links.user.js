// ==UserScript==
// @name         SMH World Links
// @namespace    mailto:s.kerle@gmail.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.smh.com.au/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var styleContent = [
    "a[href*='/world/'] { color: #f4a; }",
    "a[href*='/world/']:not([href*='/by'])::before {",
    "    opacity: 0.5;",
    "    display: inline-block;",
    "    content: '';",
    "    background-color: red;",
    "    width: 10px;",
    "    height: 10px;",
    "    border-radius: 6px;",
    "    border: 1px solid oldlace;",
    "    float: left;",
    "    margin: 2px 4px 2px 0px;",
    "    z-index: 10;",
    "}"
].join('\n');

var style = document.createElement('style');
style.appendChild(document.createTextNode(styleContent));
document.body.appendChild(style);