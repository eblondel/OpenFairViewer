import Filter from './Filter.js';

class IsLike extends Filter {
	constructor(version, schemas, propertyName, literal){
		super(version, schemas);
		this.object['ogc:Filter'].comparisonOps = {
			'ogc:PropertyIsLike' : {
				TYPE_NAME: "Filter_"+version.replaceAll('.','_')+".PropertyIsLikeType",
				escapeChar: "",
				singleChar: "_",
				wildCard: "%",
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

export default IsLike;