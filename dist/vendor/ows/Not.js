import Filter from './Filter.js';

class Not extends Filter {
	
	constructor(version, schemas, filter){
		super(version, schemas);
		this.object['ogc:Filter'].logicOps = {
            'ogc:Not': {
                TYPE_NAME: "Filter_1_1_0.UnaryLogicOpType"
            }
        };
		console.log(Filter.getOperator(filter));
		var filters = new Array()
		filters.push(Filter.getOperator(filter));
		this.object['ogc:Filter'].logicOps['ogc:Not'].comparisonOps = Filter.getOperator(filter);
	}
	
}

export default Not;