// ==UserScript==
// @name         Fix Kibana history
// @namespace    s.kerle@gmail.com/fix-kibana-history
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://search-awslogs-prod-qd5addbiud4d2ggnyayldctabm.ap-southeast-2.es.amazonaws.com/_plugin/kibana/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('input[ng-model="state.query"]{z-index:999999 !important}');
})();