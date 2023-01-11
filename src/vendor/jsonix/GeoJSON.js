var GML_V_3_1_1 = {};
GML_V_3_1_1.GeoJSON = {};

GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter = Jsonix.Class({
	initialize : function() {
	},
	createGeometry:function(geometry) {
		Jsonix.Util.Ensure.ensureObject(geometry);
		var result = this.doCreateGeometry(geometry);
		// getSridConverter().convert(locator, geometryType, geometry);
		return result;
	},
	doCreateGeometry: function(geometry)
	{
		throw 'Abstract method.';
	},
	createGeometryFromProperty: function(property)
	{
		throw 'Abstract method.';
	},
	createGeometryFromElement: function(geometryElement) {
		Jsonix.Util.Ensure.ensureObject(geometryElement);
		Jsonix.Util.Ensure.ensureObject(geometryElement.name);
		Jsonix.Util.Ensure.ensureObject(geometryElement.value);
		return this.createGeometry(geometryElement.value);
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter"
});

GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter = Jsonix.Class({
	initialize : function() {
	},
	createGeometryType:function(geometry)
	{
		var target = this.doCreateGeometryType(geometry);
	    //getSrsReferenceGroupConverter().convert(geometry, target);
		return target;
	},
	doCreateGeometryType: function(geometry)
	{
		throw 'Abstract method';
	},
	createPropertyType: function(geometry)
	{
		throw 'Abstract method';
	},
	createElement: function(geometry)
	{
		throw 'Abstract method';
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter"
});

GML_V_3_1_1.GeoJSON.ForwardCoordinateConverter = Jsonix.Class({
	initialize : function() {
	},
	createCoordinateFromDirectPositionType: function(directPositionType) {
		var value = directPositionType.value;
		var count = value.length;
		if (count == 2) {
			var x0 = value[0];
			var y0 = value[1];
			return [x0, y0];
		} else if (count == 3) {
			var x1 = value[0];
			var y1 = value[1];
			var z1 = value[2];
			return [x1, y1, z1];

		} else {
			throw "Direct position type is expected to have 2 or 3 items.";
		}
	},
	createCoordinatesFromDirectPositionListType: function(directPositionListType) {
		var dimensions = Jsonix.Util.Type.isNumber(directPositionListType.srsDimension) ? directPositionListType.srsDimension : 2;

		if (dimensions < 2 || dimensions > 3) {
			throw "Only two- or three-dimensional coordinates are supported.";
		}
		var values = directPositionListType.value;
		if (values.length % dimensions !== 0) {
			throw 'Wrong number of entries [' + values.length + '] in the list.';
		}

		var coordinates = [];
		for (var index = 0; index < values.length / dimensions; index++) {
			if (dimensions == 2) {
				coordinates.push([values[index * dimensions], values[index * dimensions + 1]]);
			} else if (dimensions == 3) {
				coordinates.push([values[index * dimensions], values[index * dimensions + 1], values[index * dimensions + 2]]);
			}
		}
		return coordinates;

	},
	createCoordinateFromCoordType: function(coordType) {
		Jsonix.Util.Ensure.ensureObject(coordType);
		if (Jsonix.Util.Type.exists(coordType.x) && Jsonix.Util.Type.exists(coordType.y) && !Jsonix.Util.Type.exists(coordType.z)) {
			Jsonix.Util.Ensure.ensureNumber(coordType.x);
			Jsonix.Util.Ensure.ensureNumber(coordType.y);
			return [coordType.x, coordType.y];
		} else if (Jsonix.Util.Type.exists(coordType.x) && Jsonix.Util.Type.exists(coordType.y) && Jsonix.Util.Type.exists(coordType.z)) {
			Jsonix.Util.Ensure.ensureNumber(coordType.x);
			Jsonix.Util.Ensure.ensureNumber(coordType.y);
			Jsonix.Util.Ensure.ensureNumber(coordType.z);
			return [coordType.x, coordType.y, coordType.z];

		} else {
			throw 'Either X, Y or X, Y, Z values are required.';
		}
	},
	createCoordinatesFromCoordinatesType: function(coordinates) {
		Jsonix.Util.Ensure.ensureObject(coordinates);
		var coords = this.createCoordinates(
				coordinates.value, coordinates.decimal,
				coordinates.cs, coordinates.ts);
		return coords;
	},
	createCoordinates: function(value, ds, cs, ts) {
		Jsonix.Util.Ensure.ensureString(value);

		var tupleSeparator = Jsonix.Util.Type.isString(ts) ? ts : ' ';

		var tuples = value.split(tupleSeparator);

		var coordinates = [];
		for (var index = 0; index < tuples.length; index++) {
			coordinates.push(this.createCoordinate(tuples[index], ds, cs));
		}
		return coordinates;
	},
	createCoordinate: function(value, ds, cs) {
		Jsonix.Util.Ensure.ensureString(value);

		var coordinateSeparator = Jsonix.Util.Type.isString(cs) ? cs : ',';

		var coordinates = value.split(coordinateSeparator);
		
		var coordinateComponents = [];
		for (var index = 0; index < coordinates.length; index++) {
			coordinateComponents.push(this.createCoordinateComponent(
					coordinates[index], ds));
		}
		if (coordinateComponents.length == 2) {
			return [coordinateComponents[0],
					coordinateComponents[1]];
		} else if (coordinateComponents.length == 3) {
			return [coordinateComponents[0],
					coordinateComponents[1], coordinateComponents[2]];

		} else {
			throw 'Expected two or three coordinates in [' + value + '].';
		}
	},
	createCoordinateComponent: function(value, ds) {
		Jsonix.Util.Ensure.ensureString(value);
		var decimalSeparator = Jsonix.Util.Type.isString(ds) ? ds : '.';
		var decimalSeparatorIndex = value.indexOf(decimalSeparator);
		var text;
		if (decimalSeparatorIndex < 0)
		{
			text = value;
		}
		else
		{
			text = value.substring(0, decimalSeparatorIndex) + '.' + value.substring(decimalSeparatorIndex + decimalSeparator.length);
		}
		var n = Number(text);
		return n;
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardCoordinateConverter"
});

GML_V_3_1_1.GeoJSON.ForwardGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	coordinateConverter: null,
	pointConverter: null,
	lineStringConverter: null,
	linearRingConverter: null,
	polygonConverter: null,
	multiPointConverter: null,
	multiLineStringConverter: null,
	multiPolygonConverter: null,
	multiGeometryConverter: null,
	properties: null,
	propertyConverters: null,
	elementConverters: null,
	initialize : function(options) {
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, arguments);
		
		this.coordinateConverter = new GML_V_3_1_1.GeoJSON.ForwardCoordinateConverter();
    	this.pointConverter = new GML_V_3_1_1.GeoJSON.ForwardPointConverter({coordinateConverter:this.coordinateConverter});
    	this.lineStringConverter = new GML_V_3_1_1.GeoJSON.ForwardLineStringConverter({coordinateConverter:this.coordinateConverter, pointConverter: this.pointConverter});
    	this.linearRingConverter = new GML_V_3_1_1.GeoJSON.ForwardLinearRingConverter({coordinateConverter:this.coordinateConverter, pointConverter: this.pointConverter});
    	this.polygonConverter = new GML_V_3_1_1.GeoJSON.ForwardPolygonConverter({linearRingConverter:this.linearRingConverter});
		this.multiPointConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiPointConverter({pointConverter:this.pointConverter});
		this.multiLineStringConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiLineStringConverter({lineStringConverter:this.lineStringConverter});
		this.multiPolygonConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter({polygonConverter:this.polygonConverter});
		this.multiGeometryConverter = new GML_V_3_1_1.GeoJSON.ForwardMultiGeometryConverter({geometryConverter:this});
		this.properties = ['point', 'lineString', 'polygon', 'multiPoint', 'multiLineString', 'multiPolygon', 'geometricAggregate'];
		this.propertyConverters = 
		{
			'point' : this.pointConverter,
			'lineString' : this.lineStringConverter,
			'polygon' : this.polygonConverter,
			'multiPoint' : this.multiPointConverter,
			'multiLineString' : this.multiLineStringConverter,
			'multiPolygon' : this.multiPolygonConverter,
			'geometricAggregate': this.multiGeometryConverter
		};
		this.elementConverters = 
		{
			'{http://www.opengis.net/gml}Point' : this.pointConverter,
			'{http://www.opengis.net/gml}LineString' : this.lineStringConverter,
			'{http://www.opengis.net/gml}Polygon' : this.polygonConverter,
			'{http://www.opengis.net/gml}MultiPoint' : this.multiPointConverter,
			'{http://www.opengis.net/gml}MultiLineString' : this.multiLineStringConverter,
			'{http://www.opengis.net/gml}MultiPolygon' : this.multiPolygonConverter,
			'{http://www.opengis.net/gml}MultiGeometry' : this.multiGeometryConverter
		};
	},
	doCreateGeometry: function(geometry) {
		if (Jsonix.Util.Type.exists(geometry.pos) ||
			Jsonix.Util.Type.exists(geometry.coordinates) ||
			Jsonix.Util.Type.exists(geometry.coords)) {
			return this.pointConverter.createGeometry(geometry);
		} else if (Jsonix.Util.Type.exists(geometry.posOrPointPropertyOrPointRep) ||
			Jsonix.Util.Type.exists(geometry.posList) ||
			Jsonix.Util.Type.exists(geometry.coordinates)) {
			return this.lineStringConverter.createGeometry(geometry);
		} else if (Jsonix.Util.Type.exists(geometry.exterior) ||
			Jsonix.Util.Type.exists(geometry.interior)) {
			return this.polygonConverter.createGeometry(geometry);
		} else if (Jsonix.Util.Type.exists(geometry.pointMember) ||
			Jsonix.Util.Type.exists(geometry.pointMembers)) {
			return this.multiPointConverter.createGeometry(geometry);
		} else if (Jsonix.Util.Type.exists(geometry.lineStringMember) ||
			Jsonix.Util.Type.exists(geometry.lineStringMembers)) {
			return this.multiLineStringConverter.createGeometry(geometry);
		} else if (Jsonix.Util.Type.exists(geometry.polygonMember) ||
			Jsonix.Util.Type.exists(geometry.polygonMembers)) {
			return this.multiPolygonConverter.createGeometry(geometry);
		} else if (Jsonix.Util.Type.exists(geometry.geometryMember) ||
			Jsonix.Util.Type.exists(geometry.geometryMembers)) {
			return this.multiGeometryConverter.createGeometry(geometry);
		} else	{
			throw "Geometry [" + geometry + "] was not recognized.";
		}
	},
	createGeometryFromProperty: function(geometryProperty) {
		Jsonix.Util.Ensure.ensureObject(geometryProperty);
		if (Jsonix.Util.Type.exists(geometryProperty.geometry))
		{
			return this.createGeometryFromElement(geometryProperty.geometry);
		}
		else
		{
			for (var index1 = 0; index1 < this.properties.length; index1++) {
				var p = this.properties[index1];
				if (Jsonix.Util.Type.exists(geometryProperty[p]))
				{
					var converter0 = this.propertyConverters[p];
					return converter0.createGeometryFromProperty(geometryProperty);
				}
			}
			throw "Geometry property [" + geometryProperty + "] is not supported.";
		}
	},
	createGeometryFromElement: function(geometryElement) {
		Jsonix.Util.Ensure.ensureObject(geometryElement);
		Jsonix.Util.Ensure.ensureObject(geometryElement.name);
		Jsonix.Util.Ensure.ensureObject(geometryElement.value);
		var key = Jsonix.XML.QName.fromObject(geometryElement.name).key;
		var converter1 = this.elementConverters[key];
		if (Jsonix.Util.Type.exists(converter1)) {
			return converter1.createGeometryFromElement(geometryElement);
		}
		else {
			throw "Geometry element [" + key + "] is not supported.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardGeometryConverter"
});

GML_V_3_1_1.GeoJSON.ForwardLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	coordinateConverter: null,
	pointConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
		this.coordinateConverter = options.coordinateConverter;
		Jsonix.Util.Ensure.ensureObject(options.pointConverter);
		this.pointConverter = options.pointConverter;
	},
	doCreateGeometry: function(lineString) {
		if (Jsonix.Util.Type.exists(lineString.posOrPointPropertyOrPointRep)) {
			Jsonix.Util.Ensure.ensureArray(lineString.posOrPointPropertyOrPointRep);
			var coordinates0 = [];
			for (var index = 0; index < lineString.posOrPointPropertyOrPointRep.length; index++) {
				var item = lineString.posOrPointPropertyOrPointRep[index];
				var name = item.name;
				var value = item.value;
				if (name.namespaceURI === 'http://www.opengis.net/gml' && (name.localPart === 'pointProperty'||name.localPart === 'pointRep')) {
					coordinates0.push(this.pointConverter.createGeometryFromProperty(value).coordinates);
				} else if (name.namespaceURI === 'http://www.opengis.net/gml' && name.localPart === 'coord') {
					coordinates0.push(this.coordinateConverter.createCoordinateFromCoordType(value));
				} else if (name.namespaceURI === 'http://www.opengis.net/gml' && name.localPart === 'pos') {
					coordinates0.push(this.coordinateConverter.createCoordinateFromDirectPositionType(value));
				} else {
					throw "Expected Unexpected type.";
				}
			}
			return { type: 'LineString', coordinates : coordinates0 };
		} else if (Jsonix.Util.Type.exists(lineString.posList)) {
			var coordinates1 = this.coordinateConverter.createCoordinatesFromDirectPositionListType(lineString.posList);
			return { type: 'LineString', coordinates : coordinates1 };
		} else if (Jsonix.Util.Type.exists(lineString.coordinates)) {
			var coordinates2 = this.coordinateConverter.createCoordinatesFromCoordinatesType(lineString.coordinates);
			return { type: 'LineString', coordinates : coordinates2 };
		} else {
			throw "Either [pos], [pointProperty], [pointRep], [coord] or [coordinates] elements are expected.";
		}
	},
	createGeometryFromProperty: function(lineStringProperty) {
		if (Jsonix.Util.Type.exists(lineStringProperty.lineString)) {
			return this.createGeometry(lineStringProperty.lineString);
		} else {
			throw "Expected [LineString] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardLineStringConverter"
});

GML_V_3_1_1.GeoJSON.ForwardLinearRingConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.ForwardLineStringConverter, {
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.ForwardLineStringConverter.prototype.initialize.apply(this, [ options ]);
	},
	createGeometryFromProperty: function(linearRingProperty) {
		if (Jsonix.Util.Type.exists(linearRingProperty.linearRing)) {
			return { type: 'LineString', coordinates : this.createGeometry(linearRingProperty.linearRing).coordinates };
		} else {
			throw "Expected [LinearRing] element.";
		}
	},
	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardLinearRingConverter"
});

GML_V_3_1_1.GeoJSON.ForwardMultiGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	geometryConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.geometryConverter);
		this.geometryConverter = options.geometryConverter;
	},
	doCreateGeometry: function(multiGeometry) {
		var geometries = [];
		if (Jsonix.Util.Type.exists(multiGeometry.geometryMember)) {
			Jsonix.Util.Ensure.ensureArray(multiGeometry.geometryMember);
			for (var index0 = 0; index0 < multiGeometry.geometryMember.length; index0++)
			{
				geometries.push(this.geometryConverter.createGeometryFromProperty(multiGeometry.geometryMember[index0]));
			}
		}
		if (Jsonix.Util.Type.exists(multiGeometry.geometryMembers)) {
			Jsonix.Util.Ensure.ensureObject(multiGeometry.geometryMembers);
			Jsonix.Util.Ensure.ensureArray(multiGeometry.geometryMembers.geometry);
			for (var index1 = 0; index1 < multiGeometry.geometryMembers.geometry.length; index1++)
			{
				geometries.push(this.geometryConverter.createGeometryFromElement(multiGeometry.geometryMembers.geometry[index1]));
			}
		}
		return { type : 'GeometryCollection', geometries : geometries};
	},
	createGeometryFromProperty: function(multiGeometryProperty) {
		if (Jsonix.Util.Type.exists(multiGeometryProperty.geometricAggregate)) {
			return this.createGeometryFromElement(multiGeometryProperty.geometricAggregate);
		} else {
			throw "Expected [_GeometricAggregate] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter"
});

GML_V_3_1_1.GeoJSON.ForwardMultiLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	lineStringConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.lineStringConverter);
		this.lineStringConverter = options.lineStringConverter;
	},
	doCreateGeometry: function(multiLineString) {
		var coordinates = [];
		if (Jsonix.Util.Type.exists(multiLineString.lineStringMember)) {
			Jsonix.Util.Ensure.ensureArray(multiLineString.lineStringMember);
			for (var index0 = 0; index0 < multiLineString.lineStringMember.length; index0++)
			{
				coordinates.push(this.lineStringConverter.createGeometryFromProperty(multiLineString.lineStringMember[index0]).coordinates);
			}
		}
		return { type : 'MultiLineString', coordinates : coordinates};
	},
	createGeometryFromProperty: function(multiLineStringProperty) {
		if (Jsonix.Util.Type.exists(multiLineStringProperty.multiLineString)) {
			return this.createGeometry(multiLineStringProperty.multiLineString);
		} else {
			throw "Expected [MultiLineString] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardMultiLineStringConverter"
});

GML_V_3_1_1.GeoJSON.ForwardMultiPointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	pointConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.pointConverter);
		this.pointConverter = options.pointConverter;
	},
	doCreateGeometry: function(multiPoint) {
		var coordinates = [];
		if (Jsonix.Util.Type.exists(multiPoint.pointMember)) {
			Jsonix.Util.Ensure.ensureArray(multiPoint.pointMember);
			for (var index0 = 0; index0 < multiPoint.pointMember.length; index0++)
			{
				coordinates.push(this.pointConverter.createGeometryFromProperty(multiPoint.pointMember[index0]).coordinates);
			}
		}
		if (Jsonix.Util.Type.exists(multiPoint.pointMembers)) {
			Jsonix.Util.Ensure.ensureObject(multiPoint.pointMembers);
			Jsonix.Util.Ensure.ensureArray(multiPoint.pointMembers.point);
			for (var index1 = 0; index1 < multiPoint.pointMembers.point.length; index1++)
			{
				coordinates.push(this.pointConverter.createGeometry(multiPoint.pointMembers.point[index1]).coordinates);
			}
		}
		return { type: 'MultiPoint', coordinates: coordinates };
	},
	createGeometryFromProperty: function(multiPointProperty) {
		if (Jsonix.Util.Type.exists(multiPointProperty.multiPoint)) {
			return this.createGeometry(multiPointProperty.multiPoint);
		} else {
			throw "Expected [MultiPoint] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardMultiPointConverter"
});

GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	polygonConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.polygonConverter);
		this.polygonConverter = options.polygonConverter;
	},
	doCreateGeometry: function(multiPolygon) {
		var coordinates = [];
		if (Jsonix.Util.Type.exists(multiPolygon.polygonMember)) {
			Jsonix.Util.Ensure.ensureArray(multiPolygon.polygonMember);
			for (var index0 = 0; index0 < multiPolygon.polygonMember.length; index0++)
			{
				coordinates.push(this.polygonConverter.createGeometryFromProperty(multiPolygon.polygonMember[index0]).coordinates);
			}
		}
		return { type : 'MultiPolygon', coordinates : coordinates};
	},
	createGeometryFromProperty: function(multiPolygonProperty) {
		if (Jsonix.Util.Type.exists(multiPolygonProperty.multiPolygon)) {
			return this.createGeometry(multiPolygonProperty.multiPolygon);
		} else {
			throw "Expected [MultiPolygon] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardMultiPolygonConverter"
});

GML_V_3_1_1.GeoJSON.ForwardPointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	coordinateConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
		this.coordinateConverter = options.coordinateConverter;
	},
	doCreateGeometry: function(point) {
		if (Jsonix.Util.Type.exists(point.pos)) {
			return { type: 'Point', coordinates : this.coordinateConverter.createCoordinateFromDirectPositionType(point.pos) };
		} else if (Jsonix.Util.Type.exists(point.coordinates)) {
			var coords = this.coordinateConverter.createCoordinatesFromCoordinatesType(point.coordinates);
			if (coords.length != 1) {
				throw "Expected exactly one coordinate.";
			} else {
				return { type: 'Point', coordinates : coords[0]};
			}
		} else if (Jsonix.Util.Type.exists(point.coord)) {
			return { type: 'Point', coordinates : this.coordinateConverter.createCoordinateFromCoordType(point.coord) };
		} else {
			throw "Either [pos], [coordinates] or [coord] elements are expected.";
		}
	},
	createGeometryFromProperty: function(pointProperty) {
		if (Jsonix.Util.Type.exists(pointProperty.point)) {
			return this.createGeometry(pointProperty.point);
		} else {
			throw "Expected [Point] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardPointConverter"
});

GML_V_3_1_1.GeoJSON.ForwardPolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter, {
	linearRingConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractForwardGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.linearRingConverter);
		this.linearRingConverter = options.linearRingConverter;
	},
	doCreateGeometry: function(polygon) {
		var coordinates = [];
		if (Jsonix.Util.Type.exists(polygon.exterior)) {
			Jsonix.Util.Ensure.ensureObject(polygon.exterior);
			Jsonix.Util.Ensure.ensureObject(polygon.exterior.value);
			var shell = polygon.exterior.value;
			if (Jsonix.Util.Type.exists(shell.ring)) {
				Jsonix.Util.Ensure.ensureObject(shell.ring);
				Jsonix.Util.Ensure.ensureObject(shell.ring.value);
				coordinates.push(this.linearRingConverter
						.createGeometry(shell.ring.value).coordinates);
			}
			else
			{
				throw "The [_Ring] element is expected.";
			}
		}
		else
		{
			throw "The [exterior] element is expected.";
		}
		if (Jsonix.Util.Type.exists(polygon.interior)) {
			Jsonix.Util.Ensure.ensureArray(polygon.interior);
			var hole;
			for (var index = 0; index < polygon.interior.length; index++)
			{
				Jsonix.Util.Ensure.ensureObject(polygon.interior[index]);
				Jsonix.Util.Ensure.ensureObject(polygon.interior[index].value);
				hole = polygon.interior[index].value;
				if (Jsonix.Util.Type.exists(hole.ring)) {
					Jsonix.Util.Ensure.ensureObject(hole.ring);
					Jsonix.Util.Ensure.ensureObject(hole.ring.value);
					coordinates.push(this.linearRingConverter
							.createGeometry(hole.ring.value).coordinates);
				}
				else
				{
					throw "The [_Ring] element is expected.";
				}
			}
		}
		return {type: 'Polygon', coordinates: coordinates};
	},
	createGeometryFromProperty: function(polygonProperty) {
		if (Jsonix.Util.Type.exists(polygonProperty.polygon)) {
			return this.createGeometry(polygonProperty.polygon);
		} else {
			throw "Expected [Polygon] element.";
		}
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.ForwardPolygonConverter"
});

GML_V_3_1_1.GeoJSON.InverseCoordinateConverter = Jsonix.Class({
	initialize : function() {
	},
	convertCoordinate: function(coordinate) {
		Jsonix.Util.Ensure.ensureArray(coordinate);
		if (coordinate.length < 2 || coordinate.length > 3)
		{
			throw 'Coordinate must contain two or three components.';
		}
		Jsonix.Util.Ensure.ensureNumber(coordinate[0]);
		Jsonix.Util.Ensure.ensureNumber(coordinate[1]);
		if (coordinate.length > 2)
		{
			Jsonix.Util.Ensure.ensureNumber(coordinate[2]);
			return { value: [coordinate[0], coordinate[1], coordinate[2]]};
		}
		else
		{
			return { value: [coordinate[0], coordinate[1]]};
		}
	},
	convertCoordinates: function(coordinates) {
		Jsonix.Util.Ensure.ensureArray(coordinates);
		var directPositions = [];
		if (coordinates.length > 0)
		{
			var firstCoordinate = this.convertCoordinate(coordinates[0]);
			var dimension = firstCoordinate.value.length;
			var index, jndex;
			var coordinate;
			for (index = 0; index < coordinates.length; index++) {
				coordinate = this.convertCoordinate(coordinates[index]);
				if (coordinate.value.length !== dimension) {
					throw 'Not all of the coordinates have the same number of components [' + dimension + '].';
				} 
				for (jndex = 0; jndex < dimension; jndex++)	{
					directPositions.push(coordinate.value[jndex]);
				}
			}
			return {
				value: directPositions,
				srsDimension: dimension
			}; 
		}
		else
		{
			return {
				value: [] 
			};		
		}
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseCoordinateConverter"
});

GML_V_3_1_1.GeoJSON.InversePointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	coordinateConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
		this.coordinateConverter = options.coordinateConverter;
	},
	doCreateGeometryType: function(point) {
		Jsonix.Util.Ensure.ensureObject(point);
		Jsonix.Util.Ensure.ensureArray(point.coordinates);
		var resultPoint = {};
		var directPosition = this.coordinateConverter
					.convertCoordinate(point.coordinates);
		resultPoint.pos = directPosition;
		return resultPoint;
	},
	createPropertyType: function(point) {
		var pointPropertyType = {};
		pointPropertyType.point = this.createGeometryType(point);
		return pointPropertyType;
	},
	createElement: function(point) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "Point"),
			value : this.createGeometryType(point)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InversePointConverter"
});

GML_V_3_1_1.GeoJSON.InverseGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	coordinateConverter: null,
	pointConverter: null,
	lineStringConverter: null,
	linearRingConverter: null,
	polygonConverter: null,
	multiPointConverter: null,
	multiLineStringConverter: null,
	multiPolygonConverter: null,
	multiGeometryConverter: null,
	converters: null,
	initialize : function() {
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, arguments);
		
		this.coordinateConverter = new GML_V_3_1_1.GeoJSON.InverseCoordinateConverter();
    	this.pointConverter = new GML_V_3_1_1.GeoJSON.InversePointConverter({coordinateConverter:this.coordinateConverter});
    	this.lineStringConverter = new GML_V_3_1_1.GeoJSON.InverseLineStringConverter({coordinateConverter:this.coordinateConverter, pointConverter: this.pointConverter});
    	this.linearRingConverter = new GML_V_3_1_1.GeoJSON.InverseLinearRingConverter({coordinateConverter:this.coordinateConverter, pointConverter: this.pointConverter});
    	this.polygonConverter = new GML_V_3_1_1.GeoJSON.InversePolygonConverter({linearRingConverter:this.linearRingConverter});
		this.multiPointConverter = new GML_V_3_1_1.GeoJSON.InverseMultiPointConverter({pointConverter:this.pointConverter});
		this.multiLineStringConverter = new GML_V_3_1_1.GeoJSON.InverseMultiLineStringConverter({lineStringConverter:this.lineStringConverter});
		this.multiPolygonConverter = new GML_V_3_1_1.GeoJSON.InverseMultiPolygonConverter({polygonConverter:this.polygonConverter});
		this.multiGeometryConverter = new GML_V_3_1_1.GeoJSON.InverseMultiGeometryConverter({geometryConverter:this});
		this.converters = 
		{
			'Point' : this.pointConverter,
			'LineString' : this.lineStringConverter,
			'Polygon' : this.polygonConverter,
			'MultiPoint' : this.multiPointConverter,
			'MultiLineString' : this.multiLineStringConverter,
			'MultiPolygon' : this.multiPolygonConverter,
			'GeometryCollection' : this.multiGeometryConverter
		};
	},
	doCreateGeometryType: function(geometry) {
		Jsonix.Util.Ensure.ensureObject(geometry);
		Jsonix.Util.Ensure.ensureString(geometry.type);
		var converter0 = this.converters[geometry.type];
		if (Jsonix.Util.Type.exists(converter0)) {
			return converter0.createGeometryType(geometry);
		}
		else {
			throw "Geometry type [" + geometry.type + "] is not supported.";
		}
	},
	createPropertyType: function(geometry) {
		var geometryPropertyType = {};
		geometryPropertyType.geometry = this.createElement(geometry);
		return geometryPropertyType;
	},
	createElement: function(geometry) {
		Jsonix.Util.Ensure.ensureObject(geometry);
		Jsonix.Util.Ensure.ensureString(geometry.type);
		var converter1 = this.converters[geometry.type];
		if (Jsonix.Util.Type.exists(converter1)) {
			return converter1.createElement(geometry);
		}
		else {
			throw "Geometry type [" + geometry.type + "] is not supported.";
		}
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseGeometryConverter"
});

GML_V_3_1_1.GeoJSON.InverseLinearRingConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.InverseLineStringConverter, {
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.InverseLineStringConverter.prototype.initialize.apply(this, [ options ]);
	},
	createElement: function(linearRing) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "LinearRing"),
			value : this.createGeometryType(linearRing)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseLinearRingConverter"
});

GML_V_3_1_1.GeoJSON.InverseLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	coordinateConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.coordinateConverter);
		this.coordinateConverter = options.coordinateConverter;
	},
	doCreateGeometryType: function(lineString) {
		Jsonix.Util.Ensure.ensureObject(lineString);
		Jsonix.Util.Ensure.ensureArray(lineString.coordinates);
		var resultLineString = {
			posList: this.coordinateConverter.convertCoordinates(lineString.coordinates)
		};
		return resultLineString;
	},
	createPropertyType: function(lineString) {
		var lineStringPropertyType = {};
		lineStringPropertyType.lineString = this.createGeometryType(lineString);
		return lineStringPropertyType;
	},
	createElement: function(lineString) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "LineString"),
			value : this.createGeometryType(lineString)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseLineStringConverter"
});

GML_V_3_1_1.GeoJSON.InverseMultiGeometryConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	geometryConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.geometryConverter);
		this.geometryConverter = options.geometryConverter;
	},
	doCreateGeometryType: function(multiGeometry) {
		Jsonix.Util.Ensure.ensureObject(multiGeometry);
		Jsonix.Util.Ensure.ensureArray(multiGeometry.geometries);
		var resultMultiGeometry = {
			geometryMember : []
		};
		for (var index = 0; index < multiGeometry.geometries.length; index++) {
			resultMultiGeometry.geometryMember.push(this.geometryConverter.createPropertyType(multiGeometry.geometries[index]));
		}
		return resultMultiGeometry;
	},
	createPropertyType: function(multiGeometry) {
		var multiGeometryPropertyType = {};
		multiGeometryPropertyType.multiGeometry = this.createGeometryType(multiGeometry);
		return multiGeometryPropertyType;
	},
	createElement: function(multiGeometry) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiGeometry"),
			value : this.createGeometryType(multiGeometry)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseMultiGeometryConverter"
});

GML_V_3_1_1.GeoJSON.InverseMultiLineStringConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	lineStringConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.lineStringConverter);
		this.lineStringConverter = options.lineStringConverter;
	},
	doCreateGeometryType: function(multiLineString) {
		Jsonix.Util.Ensure.ensureObject(multiLineString);
		Jsonix.Util.Ensure.ensureArray(multiLineString.coordinates);
		var resultMultiLineString = {
			lineStringMember : []
		};
		for (var index = 0; index < multiLineString.coordinates.length; index++) {
			resultMultiLineString.lineStringMember.push(this.lineStringConverter.createPropertyType({type: 'LineString', coordinates: multiLineString.coordinates[index]}))
		}
		return resultMultiLineString;
	},
	createPropertyType: function(multiLineString) {
		var multiLineStringPropertyType = {};
		multiLineStringPropertyType.multiLineString = this.createGeometryType(multiLineString);
		return multiLineStringPropertyType;
	},
	createElement: function(multiLineString) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiLineString"),
			value : this.createGeometryType(multiLineString)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseMultiLineStringConverter"
});

GML_V_3_1_1.GeoJSON.InverseMultiPointConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	pointConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.pointConverter);
		this.pointConverter = options.pointConverter;
	},
	doCreateGeometryType: function(multiPoint) {
		Jsonix.Util.Ensure.ensureObject(multiPoint);
		Jsonix.Util.Ensure.ensureArray(multiPoint.coordinates);
		var resultMultiPoint = {
			pointMember : []
		};
		for (var index = 0; index < multiPoint.coordinates.length; index++) {
			resultMultiPoint.pointMember.push(this.pointConverter.createPropertyType({type: 'Point', coordinates: multiPoint.coordinates[index]}))
		}
		return resultMultiPoint;
	},
	createPropertyType: function(multiPoint) {
		var multiPointPropertyType = {};
		multiPointPropertyType.multiPoint = this.createGeometryType(multiPoint);
		return multiPointPropertyType;
	},
	createElement: function(multiPoint) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiPoint"),
			value : this.createGeometryType(multiPoint)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseMultiPointConverter"
});

GML_V_3_1_1.GeoJSON.InverseMultiPolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	polygonConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.polygonConverter);
		this.polygonConverter = options.polygonConverter;
	},
	doCreateGeometryType: function(multiPolygon) {
		Jsonix.Util.Ensure.ensureObject(multiPolygon);
		Jsonix.Util.Ensure.ensureArray(multiPolygon.coordinates);
		var resultMultiPolygon = {
			polygonMember : []
		};
		for (var index = 0; index < multiPolygon.coordinates.length; index++) {
			resultMultiPolygon.polygonMember.push(this.polygonConverter.createPropertyType({type: 'Polygon', coordinates: multiPolygon.coordinates[index]}))
		}
		return resultMultiPolygon;
	},
	createPropertyType: function(multiPolygon) {
		var multiPolygonPropertyType = {};
		multiPolygonPropertyType.multiPolygon = this.createGeometryType(multiPolygon);
		return multiPolygonPropertyType;
	},
	createElement: function(multiPolygon) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "MultiPolygon"),
			value : this.createGeometryType(multiPolygon)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InverseMultiPolygonConverter"
});


GML_V_3_1_1.GeoJSON.InversePolygonConverter = Jsonix.Class(GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter, {
	linearRingConverter: null,
	initialize : function(options) {
		Jsonix.Util.Ensure.ensureObject(options);
		GML_V_3_1_1.GeoJSON.AbstractInverseGeometryConverter.prototype.initialize.apply(this, [ options ]);
		Jsonix.Util.Ensure.ensureObject(options.linearRingConverter);
		this.linearRingConverter = options.linearRingConverter;
	},
	doCreateGeometryType: function(polygon) {
		Jsonix.Util.Ensure.ensureObject(polygon);
		Jsonix.Util.Ensure.ensureArray(polygon.coordinates);
		if (polygon.coordinates.length < 0)
		{
			throw "At least one element (shell) is expected in the coordinates array.";
		}
		
		var resultPolygon = {};
		Jsonix.Util.Ensure.ensureArray(polygon.coordinates[0]);
		
		resultPolygon.exterior = {};
		
		resultPolygon.exterior = {
				name : new Jsonix.XML.QName("http://www.opengis.net/gml", "exterior"),
				value: {
					ring: this.linearRingConverter.createElement({type: 'LinearRing', coordinates: polygon.coordinates[0]})
				} 
		};
		
		if (polygon.coordinates.length > 1)
		{
			resultPolygon.interior = [];
			for (var index = 1; index < polygon.coordinates.length; index++)
			{
				resultPolygon.interior.push(
				{
					name : new Jsonix.XML.QName("http://www.opengis.net/gml", "interior"),
					value: {
						ring: this.linearRingConverter.createElement({type: 'LinearRing', coordinates: polygon.coordinates[index]})
					} 
				});
			}
		}
		return resultPolygon;
	},
	createPropertyType: function(polygon) {
		var polygonPropertyType = {};
		polygonPropertyType.polygon = this.createGeometryType(polygon);
		return polygonPropertyType;
	},
	createElement: function(polygon) {
		return {
			name : new Jsonix.XML.QName("http://www.opengis.net/gml", "Polygon"),
			value : this.createGeometryType(polygon)
		};
	},
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.InversePolygonConverter"
});


GML_V_3_1_1.GeoJSON.GeometryAdapter = Jsonix.Class({
	forwardGeometryConverter: null,
	inverseGeometryConverter: null,
	initialize : function(options) {
		this.forwardGeometryConverter = new GML_V_3_1_1.GeoJSON.ForwardGeometryConverter();
		this.inverseGeometryConverter = new GML_V_3_1_1.GeoJSON.InverseGeometryConverter();
	},
	unmarshal: function(context, input, typeInfo)
	{
		var name = Jsonix.XML.QName.fromObject(input.getName());
		var value = typeInfo.unmarshal(context, input);
		var geometryElement = {
			name : name,
			value : value
		};
		var geometry = this.forwardGeometryConverter.createGeometryFromElement(geometryElement);
		return geometry;
	},
	marshal: function(context, geometry, output, typeInfo)
	{
		var geometryElement = this.inverseGeometryConverter.createElement(geometry);
		typeInfo.marshal(context, geometryElement.value, output);
	},	
	CLASS_NAME : "GML_V_3_1_1.GeoJSON.GeometryAdapter"
});
GML_V_3_1_1.GeoJSON.GeometryAdapter.INSTANCE = new GML_V_3_1_1.GeoJSON.GeometryAdapter();

