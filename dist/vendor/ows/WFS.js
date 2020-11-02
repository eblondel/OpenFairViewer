import '../../import-jsonix';
import '../../import-ogc-schemas';
import OWS from './OWS.js';
import WFSCapabilities from './WFSCapabilities.js';

class WFS extends OWS {
	
	constructor(url, version, config) {
		
		var owsVersion = "1.1.0";
		
		super(url, owsVersion, config);
		this.version = version;
		/**
		 * Jsonix Configuration
		 * */
		if (config == null){
			throw 'Missing Configuration! It is a must to WFS to know the profile';
		} else if (config[2] != undefined){
			this.credentials = config[2];
		}
		this.jsonnixContext = new Jsonix.Context(config[0], config[1]);
		// init by doing a GetCapabilities and parsing metadata
		this.url = url;
	}
	
	GetCapabilities = function(){
		var getCapabilities = new WFSCapabilities(this.owsVersion, this.version);
		// XML to Post.
		var myXML = this.marshalDocument(getCapabilities);
		var this_ = this;
		return this.httpPost(this.url, "application/xml", myXML, this.credentials).then(function(responseXML){
			var capabilities = this_.unmarshalDocument(responseXML);
			console.log(capabilities);
			return capabilities;
		});
	}
	
	
};

export default WFS;
