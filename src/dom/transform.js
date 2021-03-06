/**
 * @fileoverview transform properties parser/implementation
 * 
 * @author Tony Parisi
 */

goog.provide('glam.DOMTransform');

glam.DOMTransform.parse = function(docelt, style, obj) {
	
	var t = {
	};
	
	t.x = parseFloat(docelt.getAttribute('x')) || 0;
	t.y = parseFloat(docelt.getAttribute('y')) || 0;
	t.z = parseFloat(docelt.getAttribute('z')) || 0;
	t.rx = glam.DOMTransform.parseRotation(docelt.getAttribute('rx')) || 0;
	t.ry = glam.DOMTransform.parseRotation(docelt.getAttribute('ry')) || 0;
	t.rz = glam.DOMTransform.parseRotation(docelt.getAttribute('rz')) || 0;
	t.sx = parseFloat(docelt.getAttribute('sx')) || 1;
	t.sy = parseFloat(docelt.getAttribute('sy')) || 1;
	t.sz = parseFloat(docelt.getAttribute('sz')) || 1;
	var transform = docelt.getAttribute('transform') ||
		docelt.getAttribute('-webkit-transform') ||
		docelt.getAttribute('-moz-transform') ||
		docelt.getAttribute('-ms-transform') ||
		docelt.getAttribute('-opera-transform');
	if (transform) {
		glam.DOMTransform.parseTransform(transform, t);
	}

	if (style) {
		glam.DOMTransform.parseStyle(style, t);
	}
	
	obj.transform.position.set(t.x, t.y, t.z);
	obj.transform.rotation.set(t.rx, t.ry, t.rz);
	obj.transform.scale.set(t.sx, t.sy, t.sz);
	
	docelt.glam.setAttributeHandlers.push(function(attr, val) {
		glam.DOMTransform.onSetAttribute(obj, docelt, attr, val);
	});

	style.setPropertyHandlers.push(function(attr, val) {
		glam.DOMTransform.onSetAttribute(obj, docelt, attr, val);
	});
}

glam.DOMTransform.parseStyle = function(style, t) {
	
	if (style) {
		if (style.x) {
			t.x = parseFloat(style.x);
		}
		if (style.y) {
			t.y = parseFloat(style.y);
		}
		if (style.z) {
			t.z = parseFloat(style.z);
		}
		if (style.rx) {
			t.rx = glam.DOMTransform.parseRotation(style.rx);
		}
		if (style.ry) {
			t.ry = glam.DOMTransform.parseRotation(style.ry);
		}
		if (style.rz) {
			t.rz = glam.DOMTransform.parseRotation(style.rz);
		}
		if (style.sx) {
			t.sx = parseFloat(style.sx);
		}
		if (style.sy) {
			t.sy = parseFloat(style.sy);
		}
		if (style.sz) {
			t.sz = parseFloat(style.sz);
		}
		var transform = style['transform'] ||
			style['-webkit-transform'] ||
			style['-moz-transform'] ||
			style['-ms-transform'] ||
			style['-opera-transform'];

		if (transform) {			
			glam.DOMTransform.parseTransform(transform, t);
		}
	}
}

glam.DOMTransform.parseRotation = function(r) {
	if (!r)
		return null;
	
	r = r.toLowerCase();
	var i = r.indexOf("deg");
	if (i != -1) {
		var degrees = r.split("deg");
		if (degrees.length) {
			var deg = parseFloat(degrees[0]);
			return THREE.Math.degToRad(deg);
		}
	}
	
	var i = r.indexOf("rad");
	if (i != -1) {
		var radians = r.split("rad");
		if (radians.length) {
			var rad = parseFloat(radians[0]);
			return rad;
		}
	}
	
	return parseFloat(r);
}

glam.DOMTransform.parseTransform = function(str, t) {

	var transforms = str.split(" ");
	var i, len = transforms.length;
	for (i = 0; i < len; i++) {
		var transform = transforms[i];
		var op = transform.split("(")[0];
		var regExp = /\(([^)]+)\)/;
		var matches = regExp.exec(transform);
		var value = matches[1];
		
		
		switch(op) {
			case "translateX" :
				t.x = parseFloat(value);
				break;
			case "translateY" :
				t.y = parseFloat(value);
				break;
			case "translateZ" :
				t.z = parseFloat(value);
				break;
			case "rotateX" :
				t.rx = glam.DOMTransform.parseRotation(value);
				break;
			case "rotateY" :
				t.ry = glam.DOMTransform.parseRotation(value);
				break;
			case "rotateZ" :
				t.rz = glam.DOMTransform.parseRotation(value);
				break;
			case "scaleX" :
				t.sx = parseFloat(value);
				break;
			case "scaleY" :
				t.sy = parseFloat(value);
				break;
			case "scaleZ" :
				t.sz = parseFloat(value);
				break;
		}		
	}
}

glam.DOMTransform.onSetAttribute = function(obj, docelt, attr, val) {
	var v = parseFloat(val);
	switch(attr) {
		case 'x' :
			obj.transform.position.x = v;
			break;
		case 'y' :
			obj.transform.position.y = v;
			break;
		case 'z' :
			obj.transform.position.z = v;
			break;
		case 'rx' :
			obj.transform.rotation.x = v;
			break;
		case 'ry' :
			obj.transform.rotation.y = v;
			break;
		case 'rz' :
			obj.transform.rotation.z = v;
			break;
		case 'sx' :
			obj.transform.scale.x = v;
			break;
		case 'sy' :
			obj.transform.scale.y = v;
			break;
		case 'sz' :
			obj.transform.scale.z = v;
			break;
		
	}
}
