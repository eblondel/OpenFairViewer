import Filter from './Filter.js';

class Or extends Filter {
	constructor(version, schemas, filters){
		super(version, schemas);
		this.object['ogc:Filter'].logicOps = {
            'ogc:Or':{
                TYPE_NAME: "Filter_1_1_0.BinaryLogicOpType",
            }
        };
		this.object['ogc:Filter'].logicOps['ogc:Or'].ops = filters.map(function(filter){return Filter.getOperator(filter);});
	}
}

export default Or;