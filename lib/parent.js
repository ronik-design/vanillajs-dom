import walkTree from "./walk-tree";

const getParent = function (element, selector) {

  const nodes = walkTree(element, selector, "up", 1);
  return nodes[0];
};

export default getParent;
