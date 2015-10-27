(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("vanillajsDom", ["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.vanillajsDom = mod.exports;
  }
})(this, function (exports, module) {
  /* eslint max-params:0 */

  "use strict";

  var acceptNode = function acceptNode(selector) {

    var firstChar = selector ? selector.charAt(0) : "";

    return function (node) {
      if (selector) {

        // If selector is a class
        if (firstChar === ".") {
          if (node.classList.contains(selector.substr(1))) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }

        // If selector is an ID
        if (firstChar === "#") {
          if (node.id === selector.substr(1)) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }

        // If selector is a data attribute
        if (firstChar === "[") {
          if (node.hasAttribute(selector.substr(1, selector.length - 2))) {
            return NodeFilter.FILTER_ACCEPT;
          }

          // If selector is a tag
          if (node.tagName.toLowerCase() === selector) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      } else {

        return NodeFilter.FILTER_ACCEPT;
      }
    };
  };

  var walkTree = function walkTree(element, selector, direction) {
    var limit = arguments.length <= 3 || arguments[3] === undefined ? -1 : arguments[3];

    var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, acceptNode(selector), false);

    treeWalker.currentNode = element;

    var nodes = [];
    var walk = direction === "up" ? treeWalker.parentNode : treeWalker.childNode;

    while (walk() && (nodes.length < limit || limit === -1)) {
      nodes.push(treeWalker.currentNode);
    }

    return nodes;
  };

  var getParents = function getParents(element, selector) {

    return walkTree(element, selector, "up");
  };

  var getParent = function getParent(element, selector) {

    var nodes = walkTree(element, selector, "up", 1);
    return nodes[0];
  };

  var scrollTop = function scrollTop() {
    return window.scrollY || window.pageYOffset;
  };

  var outerHeight = function outerHeight(el) {

    var style = getComputedStyle(el);

    var height = el.offsetHeight;
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);

    return height;
  };

  var index = {
    outerHeight: outerHeight,
    scrollTop: scrollTop,
    parent: getParent,
    parents: getParents
  };

  module.exports = index;
});
