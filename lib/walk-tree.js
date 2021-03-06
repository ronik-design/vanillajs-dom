/* eslint max-params:0 */

const DEFAULT_LIMIT = -1;

const acceptNode = function (selector) {

  const firstChar = selector ? selector.charAt(0) : "";

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

const walkTree = function (element, selector, direction, limit = DEFAULT_LIMIT) {

  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    acceptNode(selector),
    false
  );

  treeWalker.currentNode = element;

  const nodes = [];

  if (direction === "up") {
    while (treeWalker.parentNode() && (nodes.length < limit || limit === DEFAULT_LIMIT)) {
      nodes.push(treeWalker.currentNode);
    }
  } else {
    while (treeWalker.childNode() && (nodes.length < limit || limit === DEFAULT_LIMIT)) {
      nodes.push(treeWalker.currentNode);
    }
  }

  return nodes;
};

export default walkTree;
