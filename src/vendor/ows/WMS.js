import '../../import-jsonix';
import '../../import-ogc-schemas';
import OWS from './OWS.js';

class WMS extends OWS {
	
	constructor(url, version, config) {
		
		var owsVersion = null;
		switch(version){
			case "1.1.1": owsVersion = "1.1.0"; break;
			case "1.3.0": owsVersion = "1.1.0"; break;
		}
		
		super(url, owsVersion, config);
		this.version = version;
		/**
		 * Jsonix Configuration
		 * */
		if (config == null){
			throw 'Missing Configuration! It is a must to WMS to know the profile';
		} else if (config[2] != undefined){
			this.credentials = config[2];
		}
		this.jsonnixContext = new Jsonix.Context(config[0], config[1]);
		// init by doing a GetCapabilities and parsing metadata
		this.url = url;
	}
	
	GetCapabilities(){
		var this_ = this;
		return this.httpGet(this.buildUrl(this.url, {service: 'WMS', request: 'GetCapabilities', version: this.version}), "application/xml", this.credentials).then(function(responseXML){
			var capabilities = this_.unmarshalDocument(responseXML);
			console.log(capabilities);
			return capabilities;
		});
	}
	
};

export default WMS;
