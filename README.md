# OpenFairViewer
OpenFairViewer - a FAIR, ISO and OGC (meta)data compliant GIS data viewer for browsing, accessing and sharing geo-referenced statistics
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2249305.svg)](https://doi.org/10.5281/zenodo.2249305)

# Basic configuration

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

