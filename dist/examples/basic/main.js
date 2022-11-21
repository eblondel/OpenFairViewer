import $ from 'jquery';
window.$ = $;

import OpenFairViewer from 'openfairviewer/src/OpenFairViewer.js';

window.OFV = null;
$(document).ready(function(){
	new OpenFairViewer({
		id: 'OFV',
		profile : '<p>Welcome to my <b>data portal!</b> powered by OpenFairViewer</p>',
		OGC_CSW_BASEURL: "https://localhost:8080/geonetwork/srv/eng/csw"
	}).init(true);
	console.log(OFV);
	
});
