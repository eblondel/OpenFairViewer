import Filter from './Filter.js';

class IsLessThanOrEqualTo extends Filter {
	constructor(version, schemas, propertyName, literal){
		super(version, schemas);
		this.object['ogc:Filter'].comparisonOps = {
			'ogc:PropertyIsLessThanOrEqualTo' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyIsEqualTo",
				literal: {
					TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".LiteralType",
					content: [literal]
				},
				propertyName: {
					TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyNameType",
					content: [propertyName]
				}
			}
		};
	}
}

export default IsLessThanOrEqualTo;