// ==UserScript==
// @name         JIRA Swimlanes
// @namespace    https://github.com/sim-o/tampermonkey-scripts/jira.swimlanes.user.js
// @version      0.1
// @description  Shrink JIRA swimlanes
// @author       Simon Kerle
// @run-at       document-start
// @match        http://jira.*/secure/RapidBoard.jspa*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
#ghx-pool-column {
  display: block !important;
  width: 100vw !important;
  overflow-x: scroll !important;
}
#ghx-pool {
  width: 2200px !important;
  padding-top: 0 !important;
}
#ghx-column-header-group {
  position: sticky !important;
  top: 0 !important;
  left: 0 !important;
}
#ghx-work {
  display: flex !important;
  flex-direction: row !important;
  overflow: visible !important;
}
#ghx-detail-view {
  position: relative !important;
  min-width: 50vw !important;
  background: white !important;
  z-index: 10000 !important;
}
`);
})();
