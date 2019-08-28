import "./css/index.scss";
function component() {
  var element = document.createElement("div");

  element.innerHTML = "小宇宇的Webpack模版";

  return element;
}

document.body.appendChild(component());
