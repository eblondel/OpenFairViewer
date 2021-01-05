import Filter from './Filter.js';

class IsGreaterThan extends Filter {
	constructor(version, schemas, propertyName, literal){
		super(version, schemas);
		this.object['ogc:Filter'].comparisonOps = {
			'ogc:PropertyIsGreaterThan' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyIsGreaterThan",
				expression: [{
					'ogc:Literal': {
						TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".LiteralType",
						content: [literal]
					}
				},{
					'ogc:PropertyName': {
						TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyNameType",
						content: [propertyName]
					}
				}]
			}
		};
	}
}

export default IsGreaterThan;