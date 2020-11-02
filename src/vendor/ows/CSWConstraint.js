
class CSWConstraint {
	
	constructor(version, filter){
		var owsVersion = null;
		switch(version){
			case "2.0.2": owsVersion = "1.1.0"; break;
			case "3.0.0": owsVersion = "2.0"; break;
		}
		this.TYPE_NAME = "CSW_"+version.replaceAll('.', '_')+".QueryConstraintType";
		this.version = owsVersion;
		this.filter = filter.get();
	}
	
}

export default CSWConstraint;