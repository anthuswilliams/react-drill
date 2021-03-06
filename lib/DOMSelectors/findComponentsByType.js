var $ = require("jquery");
var DOM = require('../DOM');

function jQueryIs(selector, node) {
  return $(node).is(selector);
}

function getPredicate(cond) {
  if (cond) {
    if (cond instanceof Function) {
      return cond;
    }
    else {
      return jQueryIs.bind(null, cond);
    }
  }
}

/**
 * @memberOf DOMSelectors
 *
 * Find all rendered components of a certain type.
 *
 * @param  {React.Component} component
 * @param  {React.Class} type
 * @param  {Function} [cond]
 *         An optional [Matchers matcher]().
 *
 * @return {React.Component[]}
 */
function findComponentsByType(component, type, cond) {
  var children = DOM.scryRenderedComponentsWithType(component, type);
  var match = getPredicate(cond);

  if (!match) {
    return children;
  }
  else {
    return children.filter(function(child) {
      return match(DOM.findDOMNode(child));
    });
  }
}

module.exports = findComponentsByType;
