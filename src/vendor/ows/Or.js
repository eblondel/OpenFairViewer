import Filter from './Filter.js';

class Or extends Filter {
	constructor(version, schemas, filter1, filter2){
		if(!(filter1 instanceof Filter)) alert("Filter 1 in 'Or' logical filter should be an object of class 'Filter'");
		if(!(filter2 instanceof Filter)) alert("Filter 2 in 'Or' logical filter should be an object of class 'Filter'");
		super(version, schemas);
		this.object['ogc:Filter'].logicOps = {
            'ogc:Or':{
                TYPE_NAME: "Filter_1_1_0.BinaryLogicOpType",
            }
        };
		var filterOp1 = Filter.getOperator(filter1);
		var filterOp2 = Filter.getOperator(filter2);
		this.object['ogc:Filter'].logicOps['ogc:Or'].ops = [filterOp1].concat(filterOp2);
	}
}

export default Or;