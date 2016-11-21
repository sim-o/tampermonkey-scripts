// ==UserScript==
// @name         Bitbucket fix
// @namespace    mailto://simon.kerle@rsvp.com.au
// @version      0.1
// @description  Press keys to scroll forwards and backwards in Bitbucket pull requests
// @author       Simon Kerle
// @include      https://bitbucket.org/*/pull-requests/*
// @grant        none
// ==/UserScript==

(function () {
	var scrollTop = window.scrollTop,
		st = function (e) { return e.getBoundingClientRect().top },
		fk = '='.charCodeAt(0), // change this for forward key
        bk = '-'.charCodeAt(0), // change this for back key
        above = 50;
    
	document.addEventListener('keypress', function (e) {
		if (e.target.nodeName === 'textarea') return;
		if (e.charCode === fk || e.charCode === bk) {
			var forward = e.charCode === fk,
				arr = Array.apply(null, document.querySelectorAll('.comment-thread-container'));
			if (!forward) {
				arr = arr.reverse();
			}
			arr.some(function (e) {
				var off = st(e);
				if (Math.abs(off - above) > 50 && (off > 0) === forward) {
					window.scrollBy(0, off - above);
					return true;
				}
			});
		}
	});
    
    // tab size of 8? really, bitbucket?
    var style = document.createElement('style');
    style.appendChild(document.createTextNode('pre{tab-size:4}'));
    document.body.appendChild(style);
})();