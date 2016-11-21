// ==UserScript==
// @name         Gym
// @namespace    mailto:simon.kerle@rsvp.com.au
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://bayswater247fitness.com.au/timetable/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var styleContent = [
    '.slot .length { font-size: 12px !important; margin-top: 4px !important; }'
].join('\n');

var style = document.createElement('style');
style.appendChild(document.createTextNode(styleContent));
document.body.appendChild(style);