import Control from 'ol/control/Control';
import { unByKey } from 'ol/Observable';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

var CSS_PREFIX = 'layer-switcher-';

export default class OpenFairLayerSwitcher extends LayerSwitcher {
	
	constructor(opt_options){
		super(opt_options);
		var options = opt_options || {};
	}

	/**
	 * Render a legend graphic for an extended OFV OL layer object
	 * @private 
	 * @param {Layer} lyr Layer for which the legend should be rendered.
	 */
	static renderLegendGraphic_(lyr, idx, li) {
		if(lyr.get('type') != 'base' && lyr.showLegendGraphic){
			var imgSrc = (lyr.legendGraphic)? lyr.legendGraphic : false;
			console.log(imgSrc);
			if(imgSrc){
				var legend = document.createElement('div');
				var legendId = lyr.get('title').replace(' ', '-') + '_' + idx + "_legend";
				legend.id = legendId;
				var img = new Image();
				img.src = imgSrc;
				var smallLegend = img.width <= 32 && img.height <= 20;
				var smallLegendCss = smallLegend? 'margin-right:10px;float:right;' : 'margin-left:40px;';
				legend.style.display = (lyr.getVisible()? (smallLegend? "block": "table") : "none");
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
	static toggleLegendGraphic_(lyr, idx) {
		var legendId = lyr.get('title').replace(' ', '-') + '_' + idx + "_legend";
		var legend = document.getElementById(legendId);
		legend.style.display = (lyr.getVisible()? "block" : "none");
	}	
	
	
	/** LayerSwitcher Overwritten methods  **/
	 
	renderPanel() {
		this.dispatchEvent({ type: 'render' });
		OpenFairLayerSwitcher.renderPanel(this.getMap(), this.panel, {
		  groupSelectStyle: this.groupSelectStyle,
		  reverse: this.reverse
		});
		this.dispatchEvent({ type: 'rendercomplete' });
	} 
	 
	 
	/**
	 * **Static** Re-draw the layer panel to represent the current state of the layers.
	 * @param {ol/Map~Map} map The OpenLayers Map instance to render layers for
	 * @param {Element} panel The DOM Element into which the layer tree will be rendered
	 * @param {Object} options Options for panel, group, and layers
	 * @param {String} options.groupSelectStyle either `'none'` - groups don't get a checkbox,
	 *   `'children'` (default) groups have a checkbox and affect child visibility or
	 *   `'group'` groups have a checkbox but do not alter child visibility (like QGIS).
	 * @param {boolean} options.reverse Reverse the layer order. Defaults to true.
	 */
	static renderPanel(map, panel, options) {
		// Create the event.
		var render_event = new Event('render');
		// Dispatch the event.
		panel.dispatchEvent(render_event);

		options = options || {};

		options.groupSelectStyle = LayerSwitcher.getGroupSelectStyle(
		  options.groupSelectStyle
		);

		LayerSwitcher.ensureTopVisibleBaseLayerShown_(map);

		while (panel.firstChild) {
		  panel.removeChild(panel.firstChild);
		}

		// Reset indeterminate state for all layers and groups before
		// applying based on groupSelectStyle
		LayerSwitcher.forEachRecursive(map, function (l, idx, a) {
		  l.set('indeterminate', false);
		});

		if (
		  options.groupSelectStyle === 'children' ||
		  options.groupSelectStyle === 'none'
		) {
		  // Set visibile and indeterminate state of groups based on
		  // their children's visibility
		  LayerSwitcher.setGroupVisibility(map);
		} else if (options.groupSelectStyle === 'group') {
		  // Set child indetermiate state based on their parent's visibility
		  LayerSwitcher.setChildVisibility(map);
		}

		var ul = document.createElement('ul');
		panel.appendChild(ul);
		// passing two map arguments instead of lyr as we're passing the map as the root of the layers tree
		OpenFairLayerSwitcher.renderLayers_(map, map, ul, options, function render(
		  changedLyr
		) {
		  // console.log('render');
		  OpenFairLayerSwitcher.renderPanel(map, panel, options);
		});

		// Create the event.
		var rendercomplete_event = new Event('rendercomplete');
		// Dispatch the event.
		panel.dispatchEvent(rendercomplete_event);
	  }

	  
	/**
	 * **Static** Render all layers that are children of a group.
	 * @private
	 * @param {ol/Map~Map} map The map instance.
	 * @param {ol/layer/Base~BaseLayer} lyr Layer to be rendered (should have a title property).
	 * @param {Number} idx Position in parent group list.
	 * @param {Object} options Options for groups and layers
	 * @param {String} options.groupSelectStyle either `'none'` - groups don't get a checkbox,
	 *   `'children'` (default) groups have a checkbox and affect child visibility or
	 *   `'group'` groups have a checkbox but do not alter child visibility (like QGIS).
	 * @param {boolean} options.reverse Reverse the layer order. Defaults to true.
	 * @param {Function} render Callback for change event on layer
	 * @returns {HTMLElement} List item containing layer control markup
	 */
	static renderLayer_(map, lyr, idx, options, render) {
		var li = document.createElement('li');

		var lyrTitle = lyr.get('title');

		var checkboxId = LayerSwitcher.uuid();
		
		var label = document.createElement('label');

		if (lyr.getLayers && !lyr.get('combine')) {
		  const isBaseGroup = LayerSwitcher.isBaseGroup(lyr);

		  li.classList.add('group');
		  if (isBaseGroup) {
			li.classList.add(CSS_PREFIX + 'base-group');
		  }

		  // Group folding
		  if (lyr.get('fold')) {
			li.classList.add(CSS_PREFIX + 'fold');
			li.classList.add(CSS_PREFIX + lyr.get('fold'));
			const btn = document.createElement('button');
			btn.onclick = function (e) {
			  e = e || window.event;
			  LayerSwitcher.toggleFold_(lyr, li);
			  e.preventDefault();
			};
			li.appendChild(btn);
		  }

		  if (!isBaseGroup && options.groupSelectStyle != 'none') {
			const input = document.createElement('input');
			input.type = 'checkbox';
			input.id = checkboxId;
			input.checked = lyr.getVisible();
			input.indeterminate = lyr.get('indeterminate');
			input.onchange = function (e) {
			  LayerSwitcher.setVisible_(
				map,
				lyr,
				e.target.checked,
				options.groupSelectStyle
			  );
			  render(lyr);
			};
			li.appendChild(input);
			label.htmlFor = checkboxId;
		  }

		  label.innerHTML = lyrTitle;
		  li.appendChild(label);
		  var ul = document.createElement('ul');
		  li.appendChild(ul);

		  OpenFairLayerSwitcher.renderLayers_(map, lyr, ul, options, render);
		} else {
		  li.className = 'layer';
		  var input = document.createElement('input');
		  if (lyr.get('type') === 'base') {
			input.type = 'radio';
			input.name = 'base';
		  } else {
			input.type = 'checkbox';
		  }
		  input.id = checkboxId;
		  input.checked = lyr.get('visible');
		  input.indeterminate = lyr.get('indeterminate');
		  input.onchange = function (e) {
			LayerSwitcher.setVisible_(
			  map,
			  lyr,
			  e.target.checked,
			  options.groupSelectStyle
			);
			OpenFairLayerSwitcher.toggleLegendGraphic_(lyr, idx);
			render(lyr);
		  };
		  li.appendChild(input);

		  label.htmlFor = checkboxId;
		  label.innerHTML = lyrTitle;

		  var rsl = map.getView().getResolution();
		  if (rsl > lyr.getMaxResolution() || rsl < lyr.getMinResolution()) {
			label.className += ' disabled';
		  }

		  li.appendChild(label);
		  
		  //handling legend graphic for overlays
		  OpenFairLayerSwitcher.renderLegendGraphic_(lyr, idx, li);
		  
		}

		return li;
	}

	/**
	 * **Static** Render all layers that are children of a group.
	 * @private
	 * @param {ol/Map~Map} map The map instance.
	 * @param {ol/layer/Group~LayerGroup} lyr Group layer whose children will be rendered.
	 * @param {Element} elm DOM element that children will be appended to.
	 * @param {Object} options Options for groups and layers
	 * @param {String} options.groupSelectStyle either `'none'` - groups don't get a checkbox,
	 *   `'children'` (default) groups have a checkbox and affect child visibility or
	 *   `'group'` groups have a checkbox but do not alter child visibility (like QGIS).
	 * @param {boolean} options.reverse Reverse the layer order. Defaults to true.
	 * @param {Function} render Callback for change event on layer
	 */
	static renderLayers_(map, lyr, elm, options, render) {
		var lyrs = lyr.getLayers().getArray().slice();
		if (options.reverse) lyrs = lyrs.reverse();
		for (var i = 0, l; i < lyrs.length; i++) {
		  l = lyrs[i];
		  if (l.get('title')) {
			elm.appendChild(OpenFairLayerSwitcher.renderLayer_(map, l, i, options, render));
		  }
		}
	}
	
}