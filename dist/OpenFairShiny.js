/**
 * OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer
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

 
export default class OpenFairShiny {

	/**
	 * popupHandler
	 * @param {String} shinyAppUrl
	 * @param {Layer} openlayers layer object extended within OpenFairViewer
	 * @param {Feature} openlayers feature object
	 * @param {Boolean} withGeom 
	 */
	static popupHandler(shinyAppUrl, layer, feature, withGeom){
		console.log("Custom popup handler with Shiny app");
		console.log(layer);
		console.log(feature);
		var pid = layer.id;
		var layername = layer.getSource().getParams().LAYERS;
		var shinyapp_url = shinyAppUrl + "?";
		shinyapp_url += "pid=" + pid;
		shinyapp_url += "&layer=" + layername;
		shinyapp_url += "&csw_server=" + layer.csw_server;
		shinyapp_url += "&csw_version=" + layer.csw_version;
		shinyapp_url += "&wfs_server=" + layer.baseDataUrl.split('?')[0];
		shinyapp_url += "&wfs_version=1.0.0";
		shinyapp_url += "&wms_server=" + (layer.getSource().getUrl? layer.getSource().getUrl() : layer.getSource().getUrls()[0]).replace('ows?service=WMS','wms');
		shinyapp_url += "&wms_version=" + layer.getSource().getParams().VERSION;
		shinyapp_url += "&feature_geom=" + withGeom;
		shinyapp_url += "&strategy=" + layer.strategy;
		var params = null;
		switch(layer.strategy){
			case "ogc_filters": params = layer.getSource().getParams().CQL_FILTER; break;
			case "ogc_viewparams": params = layer.getSource().getParams().VIEWPARAMS; break;
		}
		if(params) shinyapp_url += "&par=" + params;
		shinyapp_url += "&geom=" + feature.geometry_column;
		shinyapp_url += "&x=" + feature.info.x;
		shinyapp_url += "&y=" + feature.info.y;
		shinyapp_url += "&width=" + feature.info.width;
		shinyapp_url += "&height=" + feature.info.height;
		shinyapp_url += "&bbox=" + feature.info.bbox;
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

		var html = '<iframe src ="' + shinyapp_url + '" width="400" height="400" frameborder="0" marginheight="0"></iframe>';
		return html;
	}

	/**
	 * dashboardHandler
	 * @param {String} shinyAppUrl
	 * @param {Layer} openlayers layer object extended within OpenFairViewer
	 * @param {Boolean} withGeom 
	 */
	static dashboardHandler(shinyAppUrl, layer, withGeom){
		console.log("Custom dashboard handler with Shiny app");
		var pid = layer.id;
		var layername = layer.getSource().getParams().LAYERS;
		var shinyapp_url = shinyAppUrl + "?";
		shinyapp_url += "pid=" + pid;
		shinyapp_url += "&layer=" + layername;
		shinyapp_url += "&csw_server=" + layer.csw_server;
		shinyapp_url += "&csw_version=" + layer.csw_version;
		shinyapp_url += "&wfs_server=" + layer.baseDataUrl.split('?')[0];
		shinyapp_url += "&wfs_version=1.0.0";
		shinyapp_url += "&feature_geom=" + withGeom;
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
	}
		

}