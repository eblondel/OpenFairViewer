import Filter from './Filter.js';

class IsBetween extends Filter {
	constructor(version, schemas, propertyName, lowerValue, upperValue){
		super(version, schemas);
		this.object['ogc:Filter'].comparisonOps = {
			'ogc:PropertyIsBetween' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyIsBetweenType",
				expression :{
					'ogc:PropertyName': {
						TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyNameType",
						content: propertyName
					}
				},
				lowerBoundary:{
					'ogc:Literal':{
						TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".LiteralType",
						content :[lowerValue]
					}
				},
				upperBoundary:{
					'ogc:Literal':{
						TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".LiteralType",
						content :[upperValue]
					}
				}
			}
		};
	}
}

export default IsBetween;