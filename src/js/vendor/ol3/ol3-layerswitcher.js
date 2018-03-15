/**
 * OpenLayers 3 Layer Switcher Control.
 * See [the examples](./examples) for usage.
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object} opt_options Control options, extends olx.control.ControlOptions adding:
 *                              **`tipLabel`** `String` - the button tooltip.
 */
ol.control.LayerSwitcher = function(opt_options) {

	//options
    var options = opt_options || {};
    var tipLabel = options.tipLabel ? options.tipLabel : 'Legend';
    this.displayLegend_ = options.displayLegend ? options.displayLegend : false;
	this.togglingLegendGraphic_ = options.toggleLegendGraphic ? options.displayLegend : false;
	this.collapsableGroups_ = options.collapsableGroups ? options.collapsableGroups : false;
	this.groupInfoHandler_ = options.groupInfoHandler ? options.groupInfoHandler : false;
	this.isExternalized = (options.target)? true : false;
	this.id = (options.target)? options.target : undefined;
	this.disableRenderOnPostcompose = (options.disableRenderOnPostcompose)? options.disableRenderOnPostcompose : false;
	
	//management of collapsable groups
	this.layergroupClasses = new Object();
	
	//array for map listeners
    this.mapListeners = [];

	this.panel = document.createElement('div');
	this.panel.className = 'panel';
	
	var element = document.createElement('div');
	if(!this.isExternalized){
	
		this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
		this.shownClassName = this.hiddenClassName + ' shown';
		element.className = this.hiddenClassName;
		
		var button = document.createElement('button');
		button.setAttribute('title', tipLabel);
		element.appendChild(button);
		element.appendChild(this.panel);
		
		var this_ = this;

		button.onclick = function(e) {
			this_.showPanel();
		};
		
		element.onmouseover = function(e) {
			this_.showPanel();
		};

		element.onmouseout = function(e) {
			e = e || window.event;
			if (!element.contains(e.toElement)) {
				this_.hidePanel();
			}
		};
	}else{
		var element = document.createElement('div');
		element.appendChild(this.panel);
	}
		
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

};

ol.inherits(ol.control.LayerSwitcher, ol.control.Control);

/**
 * Show the layer panel.
 */
ol.control.LayerSwitcher.prototype.showPanel = function() {
    if (this.element.className != this.shownClassName) {
        this.element.className = this.shownClassName;
        this.renderPanel();
    }
};

/**
 * Hide the layer panel.
 */
ol.control.LayerSwitcher.prototype.hidePanel = function() {
    if (this.element.className != this.hiddenClassName) {
        this.element.className = this.hiddenClassName;
    }
};

/**
 * Re-draw the layer panel to represent the current state of the layers.
 */
ol.control.LayerSwitcher.prototype.renderPanel = function() {

    this.ensureTopVisibleBaseLayerShown_();
	this.setGroupVisibilityStatus_(); 

	if(this.isExternalized){
		var targetElement = document.getElementById(this.id);
		while(targetElement.firstChild){
		 targetElement.removeChild(targetElement.firstChild);
		}
		while(this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
		this.panel = document.createElement('div');
		this.panel.className = 'panel';
		
		 var ul = document.createElement('ul');
		this.panel.appendChild(ul);
		this.renderLayers_(this.getMap(), ul);
		
		this.element.appendChild(this.panel);
		targetElement.appendChild(this.element);
		
	}else{
		while(this.panel.firstChild) {
			this.panel.removeChild(this.panel.firstChild);
		}
		var ul = document.createElement('ul');
		this.panel.appendChild(ul);
		this.renderLayers_(this.getMap(), ul);
	}
  
};

/**
 * Set the map instance the control is associated with.
 * @param {ol.Map} map The map instance.
 */
ol.control.LayerSwitcher.prototype.setMap = function(map) {

	// Clean up listeners associated with the previous map
    for (var i = 0, key; i < this.mapListeners.length; i++) {
        this.getMap().unByKey(this.mapListeners[i]);
    }
    this.mapListeners.length = 0;
  
    if (map) {
		 // Wire up listeners etc. and store reference to new map
		ol.control.Control.prototype.setMap.call(this, map);
		
		if(this.isExternalized){
			//configure map listeners
			this.mapListeners.push(map.once("postrender", function(){
				this.renderPanel();
			}, this));
			this.mapListeners.push(map.getView().on('propertychange', function(e) {
				this.renderPanel();
			}, this));
		}else{
			this.mapListeners.push(map.on('pointerdown', function() {
				this.hidePanel();
			}, this));
			this.renderPanel();
		}
		
		if(!this.disableRenderOnPostcompose) {
			this.mapListeners.push(map.on('postcompose', function(e) {
				this.renderPanel();
			}, this))
		}
    }
};

/**
 * Ensure only the top-most base layer is visible if more than one is visible.
 * @private
 */
ol.control.LayerSwitcher.prototype.ensureTopVisibleBaseLayerShown_ = function() {
    var lastVisibleBaseLyr;
    ol.control.LayerSwitcher.forEachRecursive(this.getMap(), function(l, idx, a) {
        if (l.get('type') === 'base' && l.getVisible()) {
            lastVisibleBaseLyr = l;
        }
    });
    if (lastVisibleBaseLyr) this.setVisible_(lastVisibleBaseLyr, true);
};

/**
 * Set the group visibility status (in order to keep collapsed / expanded layergroups
 * in their previous states).
 * @private
 */
ol.control.LayerSwitcher.prototype.setGroupVisibilityStatus_ = function(){
	this.layergroupClasses = new Object();
	var layerGroups = document.getElementsByClassName("layer-switcher-layergroup");
	for(var i=0;i<layerGroups.length;i++){
		var layerGroup = layerGroups[i];
		this.layergroupClasses[layerGroup.id] = layerGroup.className;
	}
}


/**
 * Toggle the visible state of a layer.
 * Takes care of hiding other layers in the same exclusive group if the layer
 * is toggle to visible.
 * @private
 * @param {ol.layer.Base} The layer whos visibility will be toggled.
 */
ol.control.LayerSwitcher.prototype.setVisible_ = function(lyr, visible) {
    var map = this.getMap();
    lyr.setVisible(visible);
    if (visible && lyr.get('type') === 'base') {
        // Hide all other base layers regardless of grouping
        ol.control.LayerSwitcher.forEachRecursive(map, function(l, idx, a) {
            if (l != lyr && l.get('type') === 'base') {
                l.setVisible(false);
            }
        });
    }
};

/**
 * Render all layers that are children of a group.
 * @private
 * @param {ol.layer.Base} lyr Layer to be rendered (should have a title property).
 * @param {Number} idx Position in parent group list.
 */
ol.control.LayerSwitcher.prototype.renderLayer_ = function(lyr, idx) {

    var this_ = this;

    var li = document.createElement('li');
	
    var lyrTitle = lyr.get('title');
    var lyrId = lyr.get('title').replace(' ', '-') + '_' + idx;

    var label = document.createElement('label');

    if (lyr.getLayers) {
		var groupClassName = 'layer-switcher-layergroup shown';
		var groupHiddenClassName = 'layer-switcher-layergroup';
	
		li.id = "layergroup_" + lyrId;
		var previousClass = this.layergroupClasses[li.id]
        li.className = previousClass? previousClass : groupClassName;
        label.innerHTML = lyrTitle;
		
		if(this.collapsableGroups_ ){
			if(lyr.getLayers().getArray().length > 0){
				if(lyr.getLayers().getArray()[0].get('type') != 'base')
					label.style.textDecoration = "underline";
					label.onclick = function(e) {
						li.className = (li.className == groupClassName)? groupHiddenClassName : groupClassName;
					};
			}
		}
        li.appendChild(label);

		//handler layergroup info
		if(this.groupInfoHandler_ && lyr.infoUrl){
			var img = document.createElement('img');
			img.className = "layer-switcher-layerinfo";
			img.title = "Source of Information";
			img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKcSURBVDjLpZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQAAAABJRU5ErkJggg==";
			li.appendChild(img);

			var this_ = this;
			img.onclick = function(e) {
				this_.groupInfoHandler_(lyr);
			};

		}

        var ul = document.createElement('ul');
        li.appendChild(ul);

        this.renderLayers_(lyr, ul);

    } else {

	li.className = "layer-switcher-layer";
	
	//create html
        var input = document.createElement('input');
        if (lyr.get('type') === 'base') {
            input.type = 'radio';
            input.name = 'base';
        } else {
            input.type = 'checkbox';
        }
        input.id = lyrId;
        input.checked = lyr.get('visible');
        input.onchange = function(e) {
            this_.setVisible_(lyr, e.target.checked);
			if(this_.togglingLegendGraphic_) this_.toggleLegendGraphic_(lyr, idx);
        };
        li.appendChild(input);

        label.htmlFor = lyrId;
        label.innerHTML = lyrTitle;
        li.appendChild(label);
		
		//handling legend graphic for overlays
		this.renderLegendGraphic_(lyr, idx, li);
    }

    return li;

};

/**
 * Render a layer legend graphic
 * @private
 * @param {ol.layer.Base} lyr Layer for which the legend should be rendered
 */
ol.control.LayerSwitcher.prototype.renderLegendGraphic_ = function(lyr, idx, li) {
	if( this.displayLegend_ && lyr.get('type') != 'base' && lyr.showLegendGraphic){
   	
		var imgSrc = (lyr.legendGraphic)? lyr.legendGraphic : false;
		if(imgSrc){
			var legend = document.createElement('div');
			var legendId = lyr.get('title').replace(' ', '-') + '_' + idx + "_legend";
			legend.id = legendId;
			var img = new Image();
			img.src = imgSrc;
			var smallLegend = img.width <= 32 && img.height <= 20;
			var smallLegendCss = smallLegend? 'margin-top:-20px;' : '';
			legend.style.display = (lyr.getVisible()? (smallLegend? "block": "inline") : "none");
			var img = '<img src="'+imgSrc+'" style="'+smallLegendCss+'"/>';
			legend.innerHTML = img;
			li.appendChild(legend);
		}
    }
}

/**
 * Toggles a layer legend (hide/show legend image)
 * @private
 * @param {ol.layer.Base} lyr Layer for which the legend should be rendered
 */
ol.control.LayerSwitcher.prototype.toggleLegendGraphic_ = function(lyr, idx) {
	var legendId = lyr.get('title').replace(' ', '-') + '_' + idx + "_legend";
	var legend = document.getElementById(legendId);
	legend.style.display = (lyr.getVisible()? "block" : "none");
}

/**
 * Render all layers that are children of a group.
 * @private
 * @param {ol.layer.Group} lyr Group layer whos children will be rendered.
 * @param {Element} elm DOM element that children will be appended to.
 */
ol.control.LayerSwitcher.prototype.renderLayers_ = function(lyr, elm) {
    var lyrs = lyr.getLayers().getArray().slice().reverse();
    for (var i = 0, l; i < lyrs.length; i++) {
        l = lyrs[i];
        if (l.get('title')) {
            elm.appendChild(this.renderLayer_(l, i));
        }
    }
};

/**
 * **Static** Call the supplied function for each layer in the passed layer group
 * recursing nested groups.
 * @param {ol.layer.Group} lyr The layer group to start iterating from.
 * @param {Function} fn Callback which will be called for each `ol.layer.Base`
 * found under `lyr`. The signature for `fn` is the same as `ol.Collection#forEach`
 */
ol.control.LayerSwitcher.forEachRecursive = function(lyr, fn) {
    lyr.getLayers().forEach(function(lyr, idx, a) {
        fn(lyr, idx, a);
        if (lyr.getLayers) {
            ol.control.LayerSwitcher.forEachRecursive(lyr, fn);
        }
    });
};
