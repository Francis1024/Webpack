import "./css/index.scss";
import imgUrl from "./images/123.jpg";
/**
 * @function component 添加div组件
 */
function component() {
  var element = document.createElement("div");

  element.innerHTML = "小宇宇的Webpack模版";

  return element;
}

document.body.appendChild(component());
/**
 * @function addImg 添加图片
 */
function addImg() {
  var img = document.createElement("img");
  img.src = imgUrl;
  return img;
}

document.body.appendChild(addImg());
