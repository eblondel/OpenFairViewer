
class CSWGetDomain {
	
	constructor(owsVersion, version, propertyName){
		this['csw:GetDomain'] ={
			TYPE_NAME: "CSW_"+version.replaceAll('.','_')+".GetDomainType",
			propertyName: propertyName,
			service: "CSW",
			version: version
		};
	}

}

export default CSWGetDomain;