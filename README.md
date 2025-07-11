# OpenFairViewer
OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer for browsing, accessing and sharing geo-referenced statistics
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2249305.svg)](https://doi.org/10.5281/zenodo.2249305)

## Sponsors

Many thanks to the following organizations that have provided fundings for strenghtening ``OpenFairViewer``:

<div style="float:left;">
  <a href="https://www.fao.org/home/en/"><img height=100 width=200 src="https://www.fao.org/fileadmin/templates/family-farming-decade/images/FAO-IFAD-Logos/FAO-Logo-EN.svg"></a>
  <a href="https://en.ird.fr/"><img src="https://en.ird.fr/sites/ird_fr/files/2019-08/logo_IRD_2016_BLOC_UK_COUL.png" height=100 width=100/></a>
  <a href="https://www.inrae.fr" target="_blank"><img height=50 width=100 src="https://www.wikimer.org/wp-content/uploads/2020/03/logo_inrae.png"></a>
</div>

The following projects have contributed to strenghten ``OpenFairViewer``:

* **Blue-Cloud** _Blue-Cloud has received funding from the European Union's Horizon programme call BG-07-2019-2020, topic: [A] 2019 - Blue Cloud services, Grant Agreement No.862409._ 
* **CCSAFE** 

## Contributors

* Julien Barde @juldebar
* Wilfried Heintz @wheintz
* Alexandre Bennici @abennici

## Special thanks

Warm and special thanks to [@highsource](https://github.com/highsource) (Alexey Valikov, RIP), for his amazing libraries ([jsonix](https://github.com/highsource/jsonix), [ogc-schemas](https://github.com/highsource/ogc-schemas)) to parse XML and OGC schemas.

## Introduction 

The OpenFairViewer is an HTML5/JS map viewer application  developed to adopt the FAIR Data principles, while complying with ISO/OGC standards for geospatial data. It enables data findn, access, query and sharing of geospatial data, in interoperable way.

The development of OpenFairViewer is done in synergy with the [geoflow](https://github.com/r-geoflow/geoflow) R package which provides a workflow tool to facilitate the management / publication of geospatial data and metadata using OGC services. 

## Installation

To deploy and configure an OpenFairViewer, you should install [node.js](https://nodejs.org/en/download/) that will provide the ``npm`` command required to build your OpenFairViewer project. Once node.js installed, install the following packages:

```
npm instal parcel-bundler --save-dev
npm install parcel-plugin-static-files-copy  --save-dev
```

Next, create a project with ``npm init``, or create the below ``package.json`` as follows:

```json
{
  "name": "openfairviewer_test",
  "version": "1.0.0",
  "description": "My mapviewer powered by OpenFairViewer",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "parcel index.html",
    "build": "parcel build --public-url ./ index.html"
  },
  "staticFiles": {
    "staticPath": [
      {
        "staticPath": "node_modules/openfairviewer/src/templates",
        "staticOutDir": "templates"
      },
      {
        "staticPath": "node_modules/openfairviewer/src/img",
        "staticOutDir": "img"
      }
    ]
  },
  "author": "Your name",
  "license": "licence",
  "devDependencies": {
    "cssnano": "^4.1.10",
    "parcel-bundler": "^1.12.4",
    "parcel-plugin-static-files-copy": "^2.5.0"
  },
  "dependencies": {

  }
}

```

Next, install OpenFairViewer using the following commands:

* for the latest (Github `master` branch)

```
npm install eblondel/openfairviewer
```

* for the latest release

```
npm install eblondel/openfairviewer#2.7.5
```

After the installation, OpenFairViewer will be installed as dependency.

## Configuration

The initialization of the viewer is done with a Javascript only, with a single ``main.js`` script. A simple ``index.html`` file is required referencing this javascript file, then all the HTML markup required is generated by OpenFairViewer. As OpenFairViewer is _metadata-driven_, the minimal configuration is done by specifying the OGC Catalogue Service for the Web (CSW) endpoint URL.

```javascript
import $ from 'jquery';
window.$ = $;

import OpenFairViewer from 'openfairviewer/src/OpenFairViewer.js';
 
window.OFV = null;
$(document).ready(function(){
	new OpenFairViewer({
		id: 'OFV',
		profile : '<p>Welcome to my <b>data portal!</b> powered by OpenFairViewer</p>',
		OGC_CSW_BASEURL: "https://localhost:8080/geonetwork/srv/eng/csw"
	}).init(true); //init is required to initialize the instance
	console.log(OFV);
});

```

The ``id`` is required to create an ``OpenFairViewer`` that will be queryable for any further interaction and customization with the application.

The ``profile`` is a summary markup description of your application that will appear when opening the application in a "About" panel dialog.



To run the application, you can run ``npm start``, it will compile deploy your viewer to http://localhost:1234

To create a build for deployment on web servers, run ``npm run build``. The compiled web resources will be created in the ``dist`` directory, and can be copied to your web-server.


## Options

Apart from global options, options of OpenFairViewer are grouped according to the main component of application, ie **language**, **labels**, **find**, **access**, **map**

An OpenFairViewer instance can be then customized handling one more options like this:

```javascript
import $ from 'jquery';
window.$ = $;

import OpenFairViewer from 'openfairviewer/src/OpenFairViewer.js';
 
window.OFV = null;
$(document).ready(function(){
	new OpenFairViewer({
		//an identifier used for the OpenFairViewer instance
		id: 'OFV', 
		//a profile (plain html markup or text) used as About window opened on viewer start
		profile : '<p>Welcome to my <b>data portal!</b> powered by OpenFairViewer</p>',
		//an OGC CSW endpoint URL
		OGC_CSW_BASEURL: "https://localhost:8080/geonetwork/srv/eng/csw"
	},{
		language: {<language options here>},
        labels: { <label options here> },
		find: { <browse options here> },
		access: { <browse options here> },
		map: { <map options here> }
	}).init(true);
	console.log(OFV);
});

```

### *global* options

| Name    | Type       | Description                                                  | Default value |
| ------- | ---------- | ------------------------------------------------------------ | ------------- |
| oninit    | `function`  | A function to trigger on viewer init | null          |

The next sections highlight the current groups of options available in OpenFairViewer

### *language* options

| Name    | Type       | Description                                                  | Default value |
| ------- | ---------- | ------------------------------------------------------------ | ------------- |
| auto    | `boolean`  | The auto mode will detect the browser language and tries to apply a language for label terms. If no labels are available in the browser language, the english labels will be applied. | true          |
| default | ``String`` | The default language to apply in case `auto` mode is set to ``false`` Use this parameter and disable ``auto`` to set a fixed language for the application | "en"          |

### *labels* options

| Name  | Type     | Description                                                  | Default value |
| ----- | -------- | ------------------------------------------------------------ | ------------- |
| file  | `String` | The relative path of a JSON file to specify custom label terms |               |
| terms | `Object` | Label terms used for customization of labels or forthcoming support of i18n. If ignored, default (English) labels will be taken from the embedded label terms (handled in JSON files). This option is useful when some specific terms needs to be overwriten. |               |

### _find_ options

Name | Type | Description| Default value
-----|------|------------|----------------
filter | ``Object``| An OGC filter to restrain the selection of datasets through the CSW. See example at https://github.com/eblondel/OpenFairViewer/blob/master/main.js  | _empty_
filterByWMS| ``Boolean``| Indicates if only datasets with OGC WMS map resources should be listed | false
datasetInfoHandler| ``function`` | A function taking as parameter a metadata object. By default it will open a new tab with the XML version of the metadata through an OGC CSW GetRecordById request. | Function returning CSW GetRecordByID XML in new tab
maxitems| ``Integer``| Maximum number of datasets to retrieve from the catalogue| null
facets|``Array``| An array of facet definitions to enable quick search buttons. Each facet should come with a `type` (only "tags" supported for now), `title` (to be displayed), and an array of facet `items`. Each item should come with an `id`, `title` (to be displayed), `color` (CSS color code to use for text), `background` (CSS background color), `icon` (optional CSS class string to use with Font awesome) and the corresponding `filter` to apply for the facet item(mandatory OGC filter to restrain the selection of datasets through the CSW).


### _access_ options

Name | Type | Description| Default value
-----|------|------------|----------------
columns | ``Integer``| Number of columns to use for displaying the dynamic query form. **_Experimental_** (to use cautiously) | 2 
time | ``String``| Name of the widget to use for time selection. Default is 'datePicker'. Possible alternative value 'slider' for time slider. **_Experimental_** (to use cautiously) | 'datePicker'
values_to_exclude_for | ``Object`` | Object include the dimension codes for which values (to specify as array) should be
excluded from the dimension filter. eg. ``{ aggregation_method: ['none'] }`` | null
exports | `Array` | A array of export button definitions to add to the dataset access form, or overwrite default exports. The default exports are listed [here](https://github.com/eblondel/OpenFairViewer/blob/master/src/OpenFairViewer.js#L667). The definition of an export is done by adding an `object` containing the following properties (see below example): `id` (identifier of the export method), `enabled` (true/false to enable or disable the export method), `services`: an `Array` giving the services required for executing the export logic (eg. ["wfs"]), `main` (true/false) indicating if the export has to be added to the main exports or in the "additional export methods" panel, `title` (Text to display as button title), `class` (a CSS class to point to an image icon), `handler` (a function to execute on export button click event) | 
dashboard | `Object` | An object to declare dashboards; See below sub-options. `handlers` A function taking a single ``layer`` parameter that can be used to connect a dashboard The function should return an html markup (eg. IFrame embedding the link to a R Shiny app). The dashboard handler function can handle various content depending on the target layer, but |
 | ``boolean`` | ``enabled``: Activate the capacity to plug dashboards. |true
 | ``Array`` | Sub options for dasbhoard ``handlers``:  One ore more objects that define dashboard handlers. Each object should contain a `name` (name of the dashboards), a `targets` (array of strings to be used as dataset pid matchers to indicate if the dashboard applies or not to the dataset), a `handler` function  with arg ``dataset`` to return dashboards as plain html. To use R shiny app dashboards, you can import the ``OpenFairShiny.js`` that provides utilities to load Shiny apps as iFrames. By default, no dashboard will be associated to the layer. See below example of ``handler`` function. |null

Example of export definitions, where we deactivate the map png export (provided by default), and add a custom export button:

```r
[
 {
     'id': 'data-map-png',
     'enabled': false
 },
 {
 	'id': 'export-custom',
    'main': false, 
    'enabled': true,
    'services': ['wfs'],
    'title': 'Export data with custom method',
    'class': 'export-custom-css-class',
    'handler': function(){
        //business logic to run on button click event
    }
 }
]
```

Example of dashboard handler:

```javascript
function(dataset){
    var layer = OFV.getLayerByProperty(dataset.pid, 'id');
	OpenFairShiny.dashboardHandler("https://myshinyproxy.org/app_direct/myShinyApp/", layer, false);
}
```

### _map_ options

Name | Type | Description| Default value
-----|------|------------|----------------
**mode** | `String` | Map mode either `2D` or `3D` to initialize the map viewer. Note the `3D` mode requires to add CesiumJS library directly in the index.html of the application (see example at https://github.com/eblondel/OpenFairViewer/blob/master/index.html). If available, OpenFairViewer will display a button (at bottom right of the screen) to switch  between `2D`/`3D` modes. | `2D` 
**control_options** | `Object` | Object that includes options for the map controls. Each sub-option correspond to one of the map controls enabled in the application. | 
 | `Object` | `loadingpanel`: Options of the LoadingPanel control (more details at https://github.com/eblondel/ol-loadingpanel). | Loading panel configured with 'progressbar' widget 
**attribution** | ``String`` | A string giving html markup for the map attribution. | null 
**extent** | ``Array``| Bounding box to use to bind the map geographic extent | [-180, -90, 180, 90]
**zoom** | ``Integer``| Zoom level to use for the map | 3
**projection**|``String``|Default map projection|'EPSG:4326'
**proj4defs**|``Array``|An array of Proj4 projection definitions in the form ``{epsgcode: "here the epsgcode", proj4string, : "here the proj4 string definition"}``|empty
**layergroups**|``Array``| Array of layer groups. Each layer group should be an object in the form  ``{name: "<layergroup name>", fold: 'open'}`` where fold is open/close depending if the layer group should be open or close at start| [{name: "Base overlays", fold: 'close'},{name: "Statistical maps", fold: 'open'}]
**mainlayergroup**|``Integer``|Index within ``layergroups`` to define the main layer group (where layers loaded from the ``browse`` part will be added) | 1
**baselayers** |``Array``| An array of baselayers defined with OpenLayers 6 layer objects| List of 5 baselayers including: EMoDnet Bathymetry world base layer, UN Clear Map (Simple, Dark), OpenStreetMaps, World Imagery 
**overlays**|``Array``| Array of base overlays to add to the map. Each overlay is defined as simplified object ``{group: <mainOverlayGroup>, id: <id>,title: <title>, wmsUrl: <wmsUrl>, wmsVersion: <wmsVersion>, layer: <layer>, hidden: <true/false>, visible: <true/false>, showLegend: <true/false>, opacity: <0 to 1>, tiled: <true/false>, cql_filter: <cql_filter>, style: <style>}``. | _empty_
**layer_options**|`Object`| An object handling layer options. See below | 
|`boolean`| `tiled`: if tiled WMS layers should be used | true 
|`Number`| `opacity`: default layer opacity to use | 0.9 
**point_vectorizing**|`boolean`| Option to indicate whether point datasets should be set-up as vector layers (based on WFS). | false 
**point_clustering**|`boolean`| Option to indicate whether point datasets should be set-up as clustered vector layers (based on WFS). Requires `point_vectorizing` to be `true`. | false 
**point_clustering_options**|`Object`| Object including the point clustering options inherited from the `SelectCluster` interaction plugin (See https://viglino.github.io/ol-ext/doc/doc-pages/ol.interaction.SelectCluster.html for details). Extra options here include the below: |  
|`function`| `style`: Function with args (feature, resolution) used to display a feature either clustered or not. | A default function that will show a simple circle for single feature and a larger circle with the number of features displayed for a cluster. 
|`function`| `selectClusterFeatureStyle`: Function with args (feature, resolution) used to display the cluster 'exploded' features | Default orangle small circle for 'exploded' features attached to the cluster feature by a dashed gray line 
|`function`| `selectClusterStyle`: Function with args (feature, resolution) used to display the selected feature either clustered or not. | same as the `style` default function 
**thematicmapping_options**|``Object``| Sub options for thematic mapping in geo-referenced statistics if thematic mapping is enabled for a layer. See belows |
|``Array``| ``breaks`` for labeling class interval breaks |[""," to ",""]
|`boolean`| `thresholding`: enable threshold of statistical values. This will be propagated to filters applied to statistical variables (both to WMS visualization and WFS for data) |true
|`String`| `threshold`: a simple threshold definition using mathematical operators (=,>=,<=,>,<). By default only positive values are kept. ***Experimental*** (likely to evolve) |"> 0"
**popup**|``Object``| Sub options for map layer tooltip/popup. , |
|`boolean`| ``enabled``: true/false |true
|`String`| ``mode``: the mode of handling the popup. Either 'map' (default) to display a map popup, or 'dialog' to display the popup as fix "Feature info" dialog on the bottomright.
|`function`| ``handler``: A function with args ``layer``/ ``feature`` to return popup content as plain html. Default will list attributes of features. The access is operated through WMS GetFeatureInfo protocol for WMS layers, and WFS GetFeature for vector WFS layers. This requires that the data protocol uses the same protocol as the viewer (no mix of http/https origin) and is CORS enabled to allow GetFeatureInfo XMLHttpRequest to be performed. To use R shiny app as popups, you can import the ``OpenFairShiny.js`` that provides utilities to load Shiny apps as iFrames. This handler allows to condition the plug of different popup handlers depending on the layers. By default, a simple handler (DEFAULT_HANDLER) will be provided by OpenFairViewer. See below example. |
|`function`| `onopen`: A function with with args ``layer``/ ``feature``to trigger on popup opening. |
|`function`| `onclose`: A function with with args ``layer``/ ``feature``to trigger on popup closing. |
**cesium**|``Object``| 3D mode options. See below. |
|`String`| `defaultAccessToken`. The Cesium service token to configure in your OpenFairViewer instance if you want to use 3D mode |


Example of popup handler:

```javascript
function(layer, feature){
	if(layer.id.startsWith('my_layer')){
			return OpenFairShiny.popupHandler("https://myshinyproxy.org/app_direct/myShinyPopup/", layer, feature, false);
		}else{
			return this.DEFAULT_HANDLER(layer, feature);
		}
	}
}
```
