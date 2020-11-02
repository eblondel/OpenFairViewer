import '../../import-jsonix';
import '../../import-ogc-schemas';

class OWS {
	
	constructor(url, owsVersion, config) {
		this.url = url;
		this.owsVersion = owsVersion;
		this.config = config;
	}
	
	httpGet(url) {
		var httpRequest;
		try {
			try {
				httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {
				httpRequest = new XMLHttpRequest();
			}
			httpRequest.open('GET', url, false);
			httpRequest.send(null);
			return httpRequest;
		} catch (e) {
			throw e;
		}
	}
	
	httpPost(url, lang, request, credentials) {
		return new Promise(function(fulfill, reject){
			var httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange=function() {
				if (httpRequest.readyState==4 && httpRequest.status==200) {
					console.log(request);
					fulfill(httpRequest.responseXML);
				}
			};
			httpRequest.open('POST', url, true);
			httpRequest.setRequestHeader('Accept-Language',lang);
			if (credentials != undefined && credentials.user != undefined && credentials.pass != undefined){
				httpRequest.setRequestHeader("Authorization", "Basic " + btoa(credentials.user + ":" + credentials.pass));
			}
			httpRequest.send(request);
		});
	}
	
	buildUrl(url, params) {
		var kvps = [];

		for (var key in params) {
			if (params[key] !== null) {
				kvps.push(key+'='+params[key]);
			}
		}
		return url + '?' + kvps.join('&');
	}
	
	marshalDocument(object){
		return this.jsonnixContext.createMarshaller().marshalDocument(object);
	}

	unmarshalDocument(xml){
		return this.jsonnixContext.createUnmarshaller().unmarshalDocument(xml);
	}
	
	xmlToObject(xml){
		return this.unmarshalDocument(xml);
	}

	objectToXML(object){
		return this.marshalDocument(object);
	}

	unmarshalString(string){
		return this.jsonnixContext.createUnmarshaller().unmarshalString(string);
	}


}

export default OWS;