import Filter from './Filter.js';

class IsEqualTo extends Filter {
	constructor(version, schemas, propertyName, literal, matchCase){
		super(version, schemas);
		this.object['ogc:Filter'].comparisonOps = {
			'ogc:PropertyIsEqualTo' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyIsEqualTo",
				matchCase: (matchCase? matchCase : false),
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

export default IsEqualTo;