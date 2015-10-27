/* eslint max-params:0 */

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

const walkTree = function (element, selector, direction, limit = -1) {

  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    acceptNode(selector),
    false
  );

  treeWalker.currentNode = element;

  const nodes = [];
  const walk = direction === "up" ? treeWalker.parentNode : treeWalker.childNode;

  while (walk() && (nodes.length < limit || limit === -1)) {
    nodes.push(treeWalker.currentNode);
  }

  return nodes;
};

export default walkTree;
