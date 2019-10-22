# OpenFairViewer
OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer for browsing, accessing and sharing geo-referenced statistics
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2249305.svg)](https://doi.org/10.5281/zenodo.2249305)

## Basic configuration

The OpenFairViewer is a HTML5/JS map viewer application that operates standard browsing, access, query and sharing of geospatial data.

The initialization of the viewer is done with a Javascript. The minimal configuration is done by specifying the OGC Catalogue Service for the Web (CSW) endpoint URL.

```{javascript}
var app = app || {};
 
$(document).ready(function(){
	app = new OpenFairViewer({
		OGC_CSW_BASEURL: "https://localhost:8080/geonetwork/srv/eng/csw"
	});
	app.init();
});

```

## Options

The options of OpenFairViewer are grouped according to the main component of application, ie **browse**, **query**, **map**

An OpenFairViewer instance can be then customized handling one more options like this:

```{javascript}
var app = app || {};
 
$(document).ready(function(){
	app = new OpenFairViewer({
		OGC_CSW_BASEURL: "https://localhost:8080/geonetwork/srv/eng/csw"
	},{
		browse: { <browse options here> },
		query: { <query options here> },
		map: { <map options here> }
	});
	app.init();
});

```

The next sections highlight the current options available in OpenFairViewer

### _browse_ options

Name | Type | Description| Default value
----------------------------------------
filters| ``Array``| An array of filters applied with 'AND' condition. Filters are defined are defined according to CSW capabilities. Each filter can be defined as object ```{name: <property>, value: <value>}```, eg. all datasets whose identifier contains the string 'species' ```{name: "dc:identifier", value: "%species%" }``` | _empty_
filterByWMS| ``Boolean``| Indicates if only datasets with OGC WMS map resources should be listed | false
datasetInfoHandler| ``function`` | A function taking as parameter a metadata object. By default it will open a new tab with | ```function(metadata){ var datasetInfoUrl = this_.csw.url + "?service=CSW&request=GetRecordById&Version=2.0.2&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&id=" + metadata.fileIdentifier;window.open(datasetInfoUrl, '_blank');}```
maxitems| ``Integer``| Maximum number of datasets to retrieve from the catalogue| null


### _query_ options

Name | Type | Description| Default value
----------------------------------------
columns | ``Integer``| Number of columns to use for displaying the dynamic query form. **_Experimental_**| 1
time | ``String``| Name of the widget to use for time selection. Default is 'datePicker'. Possible alternative value 'slider' for time slider. **_Experimental_** | 'datePicker'

### _map_ options

Name | Type | Description| Default value
----------------------------------------
extent | ``Array``| Bounding box to use to bind the map geographic extent | [-180, -90, 180, 90]
zoom | ``Integer``| Zoom level to use for the map | 3
projection|``String``|Default map projection|'EPSG:4326'
layergroups|``Array``| Array of layer groups. Each layer group should be an object in the form  ``{name: "<layergroup name>"}``| [{name: "Base overlays"},{name: "Statistical maps"}]
mainlayergroup|``Integer``|Index within ``layergroups`` to define the main layer group (where layers loaded from the ``browse`` part will be added) | 1
baselayers |``Array``| An array of baselayers defined with OpenLayers 3 layer objects| [UN Geospatial](https://geoservices.un.org) baselayers
overlays|``Array``| Array of base overlays to add to the map. Each overlay is defined as simplified object ``{group: <mainOverlayGroup>, id: <id>,title: <title>, wmsUrl: <wmsUrl>, layer: <layer>, hidden: <true/false>, visible: <true/false>, showLegend: <true/false>, opacity: <0 to 1>, tiled: <true/false>, cql_filter: <cql_filter>, style: <style>}``. | _empty_
aggregated_layer_suffix|``String``| Layer name suffix used to characterize aggregated layers| "_aggregated"
attribution|``String``|A string giving html markup for the map attribution.|null
styling|``Object``| Sub options for dynamic styling in geo-referenced statistics. ``dynamic``: true/false, ``breaks`` for labeling class interval breaks [""," to ",""]|
tooltip|``Object``| Sub options for map layer tooltip/popup. ``enabled``: true/false, ``handler``: function with parameters ``(layer, feature)`` for handling tooltip content. Default will list attributes of features. The tooltip is operated through WMS GetFeatureInfo protocol, hence requires that the data protocol uses the same protocol as the viewer (no mix of http/https origin) and is CORS enabled to allow GetFeatureInfo XMLHttpRequest to be performed|
