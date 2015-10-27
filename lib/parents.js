import walkTree from "./walk-tree";

const getParents = function (element, selector) {

  return walkTree(element, selector, "up");
};

export default getParents;
