import Filter from './Filter.js';

class IsNotEqualTo extends Filter {
	constructor(version, schemas, propertyName, literal){
		super(version, schemas);
		this.object['ogc:Filter'].comparisonOps = {
			'ogc:PropertyIsNotEqualTo' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyIsNotEqualTo",
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

export default IsNotEqualTo;