// ==UserScript==
// @name         Github style
// @namespace    mailto:simon.kerle@rsvp.com.au
// @version      0.1
// @description  github style fixes
// @author       Simon Kerle
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

var style = document.createElement('style');
style.appendChild(document.createTextNode([
    '.blob-code-inner { tab-size: 4 ! important }'
].join('\n')));
document.body.appendChild(style);