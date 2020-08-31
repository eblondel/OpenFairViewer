/**
 * OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer (20200831)
 * Copyright (c) 2018 Emmanuel Blondel
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *		   
 */
	
OpenFairViewerUtils = {};

//Shiny
OpenFairViewerUtils.shiny = {};
//Shiny app handler for popups
OpenFairViewerUtils.shiny.popupHandler = function(shinyAppUrl, layer, feature){
	console.log("Custom popup handler with Shiny app");
	console.log(feature);
	var pid = layer.id;
	var layername = layer.getSource().getParams().LAYERS;
	var shinyapp_url = shinyAppUrl + "?";
	shinyapp_url += "pid=" + pid;
	shinyapp_url += "&layer=" + layername;
	shinyapp_url += "&wfs_server=" + layer.baseDataUrl.split('?')[0];
	shinyapp_url += "&wfs_version=1.0.0";
	shinyapp_url += "&strategy=" + layer.strategy;
	var params = null;
	switch(layer.strategy){
		case "ogc_filters": params = layer.getSource().getParams().CQL_FILTER; break;
		case "ogc_viewparams": params = layer.getSource().getParams().VIEWPARAMS; break;
	}
	if(params) shinyapp_url += "&par=" + params;
	shinyapp_url += "&geom=" + feature.geometry_column;
	shinyapp_url += "&x=" + feature.popup_coordinates[0];
	shinyapp_url += "&y=" + feature.popup_coordinates[1];
	shinyapp_url += "&srs=EPSG:4326";

	if(layer.dsd){
		var dsd_small = layer.dsd.map(function(item){ 
			var newItem = item; 
			delete newItem.values; 
			if(newItem.definition) if(newItem.definition.length == 0) newItem.definition = null ; 
			return newItem
		});
		console.log(JSON.stringify(dsd_small));
		shinyapp_url += "&dsd="+ encodeURI(JSON.stringify(dsd_small));
	}

	var html = '<iframe src ="' + shinyapp_url + '" width="400" height="300" frameborder="0" marginheight="0"></iframe>';
	return html;
};

//Shiny app handler for OpenFairviewer dashboard
OpenFairViewerUtils.shiny.dashboardHandler = function(shinyAppUrl, layer){
	console.log("Custom dashboard handler with Shiny app");
	var pid = layer.id;
	var layername = layer.getSource().getParams().LAYERS;
	var shinyapp_url = shinyAppUrl + "?";
	shinyapp_url += "pid=" + pid;
	shinyapp_url += "&layer=" + layername;
	shinyapp_url += "&wfs_server=" + layer.baseDataUrl.split('?')[0];
	shinyapp_url += "&wfs_version=1.0.0";
	shinyapp_url += "&strategy=" + layer.strategy;
	var params = null;
	switch(layer.strategy){
		case "ogc_filters": params = layer.getSource().getParams().CQL_FILTER; break;
		case "ogc_viewparams": params = layer.getSource().getParams().VIEWPARAMS; break;
	}
	if(params) shinyapp_url += "&par=" + params;
	shinyapp_url += "&srs=EPSG:4326";

	if(layer.dsd){
		var dsd_small = layer.dsd.map(function(item){ 
			var newItem = item; 
			delete newItem.values; 
			if(newItem.definition) if(newItem.definition.length == 0) newItem.definition = null ; 
			return newItem
		});
		console.log(JSON.stringify(dsd_small));
		shinyapp_url += "&dsd="+ encodeURI(JSON.stringify(dsd_small));
	}

	var html = '<iframe src ="' + shinyapp_url + '" width="100%" height="100%" frameborder="0" marginheight="0"></iframe>';
	return html;
};
