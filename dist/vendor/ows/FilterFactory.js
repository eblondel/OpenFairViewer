
import Filter from './Filter';
import IsLike from './IsLike';
import IsEqualTo from './IsEqualTo';
import IsNotEqualTo from './IsNotEqualTo';
import IsLessThan from './IsLessThan';
import IsLessThanOrEqualTo from './IsLessThanOrEqualTo';
import IsGreaterThan from './IsGreaterThan';
import IsGreaterThanOrEqualTo from './IsGreaterThanOrEqualTo';
import BBOX from './BBOX';
import And from './And';
import Or from './Or';
import Not from './Not';

/**
 * @classdesc
 * FilterFactory
 */
class FilterFactory {
	
	constructor(config, opt_options){
		this.version = config.version;
		this.schemas = config.schemas;
	}
	
	IsLike(propertyName, literal){
		return new IsLike(this.version, this.schemas, propertyName, literal);
	}
	
	IsEqualTo(propertyName, literal){
		return new IsEqualTo(this.version, this.schemas, propertyName, literal);
	}
	
	IsNotEqualTo(propertyName, literal){
		return new IsNotEqualTo(this.version, this.schemas, propertyName, literal);
	}
	
	IsLessThan(propertyName, literal){
		return new IsLessThan(this.version, this.schemas, propertyName, literal);
	}
	
	IsLessThanOrEqualTo(propertyName, literal){
		return new IsLessThanOrEqualTo(this.version, this.schemas, propertyName, literal);
	}
	
	IsGreaterThan(propertyName, literal){
		return new IsGreaterThan(this.version, this.schemas, propertyName, literal);
	}
	
	IsGreaterThanOrEqualTo(propertyName, literal){
		return new IsGreaterThanOrEqualTo(this.version, this.schemas, propertyName, literal);
	}
	
	Not(filter){
		return new Not(this.version, this.schemas, filter);
	}
	
	And(filters){
		return new And(this.version, this.schemas, filters);
	}
	
	Or(filters){
		return new Or(this.version, this.schemas, filters);
	}
	
}

export default FilterFactory;