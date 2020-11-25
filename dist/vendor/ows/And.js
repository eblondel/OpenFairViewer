import Filter from './Filter.js';

class And extends Filter {
	constructor(version, schemas, filters){
		super(version, schemas);
		this.object['ogc:Filter'].logicOps = {
            'ogc:And':{
                TYPE_NAME: "Filter_1_1_0.BinaryLogicOpType",
            }
        };
		this.object['ogc:Filter'].logicOps['ogc:And'].ops = filters.map(function(filter){return Filter.getOperator(filter);});
	}
}

export default And;