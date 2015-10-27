const outerHeight = function (el) {

  const style = getComputedStyle(el);

  let height = el.offsetHeight;
  height += parseInt(style.marginTop) + parseInt(style.marginBottom);

  return height;
};

export default outerHeight;
