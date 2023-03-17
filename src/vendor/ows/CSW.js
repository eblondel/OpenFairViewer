import '../../import-jsonix';
import '../../import-ogc-schemas';
import OWS from './OWS.js';
import CSWCapabilities from './CSWCapabilities.js';
import CSWGetRecords from './CSWGetRecords.js';
import CSWGetRecordById from './CSWGetRecordById.js';
import CSWGetDomain from './CSWGetDomain.js';
import CSWConstraint from './CSWConstraint.js';
import CSWQuery from './CSWQuery.js';
import Filter from './Filter.js';
import IsLike from './IsLike.js';
import IsEqualTo from './IsEqualTo.js';
import IsNotEqualTo from './IsNotEqualTo.js';
import IsLessThan from './IsLessThan.js';
import IsLessThanOrEqualTo from './IsLessThanOrEqualTo.js';
import IsGreaterThan from './IsGreaterThan.js';
import IsGreaterThanOrEqualTo from './IsGreaterThanOrEqualTo.js';
import BBOX from './BBOX.js';
import And from './And.js';
import Or from './Or.js';

class CSW extends OWS {
	
	constructor(url, version, config) {
		
		var owsVersion = null;
		switch(version){
			case "2.0.2": owsVersion = "1.1.0"; break;
			case "3.0.0": owsVersion = "2.0"; break;
		}
		
		super(url, owsVersion, config);
		this.version = version;
		/**
		 * Jsonix Configuration
		 * */
		if (config == null){
			throw 'Missing Configuration! It is a must to CSW to know the profile';
		} else if (config[2] != undefined){
			this.credentials = config[2];
		}
		this.jsonnixContext = new Jsonix.Context(config[0], config[1]);
		// init by doing a GetCapabilities and parsing metadata
		this.url = url;
	}
	
	GetCapabilities(){
		var getCapabilities = new CSWCapabilities(this.owsVersion, this.version);
		// XML to Post.
		var myXML = this.marshalDocument(getCapabilities);
		var this_ = this;
		return this.httpPost(this.url, myXML, this.credentials).then(function(responseXML){
			var capabilities = this_.unmarshalDocument(responseXML);
			console.log(capabilities);
			return capabilities;
		});
	}
	
	GetDomain(propertyName){
		var this_ = this;
		var getdomainAction = new GetDomain(this.owsVersion, this.version, propertyName);
		var myXML = this.marshalDocument(getdomainAction);
		return Ows4js.Util.httpPost(this.url, myXML, this.credentials).then(function(responseXML){
			return this_.unmarshalDocument(responseXML);
		});
	}
	
	GetRecords(startPosition, maxRecords, filter, outputSchema) {
		var this_ = this;
		var query;
		if (filter === undefined || filter === null) {
			query = new CSWQuery(this.version, 'full');
		} else {
			// Create Query
			query = new CSWQuery(this.version, 'full', new CSWConstraint(this.version, filter));
		}
		// Create de GetRecords Action.
		var recordAction = new CSWGetRecords(
			this.owsVersion, this.version,
			startPosition, maxRecords, query, outputSchema
		);
		
		// XML to Post.
		var myXML = this.marshalDocument(recordAction);
		console.log(recordAction);
		console.log(myXML);
		// Post XML
		return this.httpPost(this.url, myXML, this.credentials).then(function(responseXML){
			var records = this_.unmarshalDocument(responseXML);
			console.log(records);
			return records;
		});

	}
	
	GetRecordById(ids, outputSchema) {
		var this_ = this;
		var byIdAction = new CSWGetRecordById(this.owsVersion, this.version, ids, outputSchema);
		
		//console.log(byIdAction);
		var myXML = this.marshalDocument(byIdAction);
		//console.log(myXML);
		return this.httpPost(this.url, myXML, this.credentials).then(function(responseXML){
			var records = this_.unmarshalDocument(responseXML);
			console.log(records);
			return records;
		});
	};
	
	
};

export default CSW;
