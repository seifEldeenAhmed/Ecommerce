import { dataParse } from "../javaScript/products.js";

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 0);
});

var images = document.querySelectorAll(".image");
console.log(dataParse());

dataParse().then((jsonresp) => {
  for (let i = 0; i < images.length; i++) {
    images[i].src = jsonresp[i].image;
  }
});
// ********************************************************************* top products *********************************************************************
var topProductsList = [];
window.onload = async function (e) {
  var data = await dataParse();
  // console.log(data[0].rating.rate);
  for (var i = 0; i < data.length; i++) {
    if (data[i].rating.rate >= 4.7) {
      // console.log(data[i]);
      topProductsList.push(data[i]);
    }
  }
  for (var i = 0; i < topProductsList.length; i++) {
    document.querySelectorAll(".rateing")[
      i
    ].innerHTML = `<p> rate ${topProductsList[i].rating.rate}</p>`;
  }
  for (var i = 0; i < topProductsList.length; i++) {
    document.querySelectorAll(".title")[i].innerHTML = topProductsList[
      i
    ].title.slice(0, 20);
  }
  for (var i = 0; i < topProductsList.length; i++) {
    document.querySelectorAll(".price")[i].innerHTML =
      topProductsList[i].price + "$";
  }
  for (var i = 0; i < topProductsList.length; i++) {
    document.querySelectorAll(".top")[
      i
    ].innerHTML = `<img class="image" src="${topProductsList[i].image}" alt="pic" />`;
  }

  // ********************************************************************* catergory *********************************************************************

  var categories = [];
  var dataa = await dataParse();
  for (var i = 0; i < dataa.length; i++) {
    if (dataa[i].category) {
      if (!categories.includes(dataa[i].category)) {
        categories.push(dataa[i].category);
        // console.log(dataa[i]);
      }
    }
  }
  console.log(categories);
  for (var i = 0; i < categories.length; i++) {
    document.querySelector(
      ".category"
    ).innerHTML += `<a href="${categories[i]}.html"><p>${categories[i]}</p></a>`;
  }
  console.log(categories);
};
// ********************************************************************* unique desc *********************************************************************

var description = document.querySelectorAll(".desc");
console.log(dataParse());

let desc = [];
var data = await dataParse();
for (var i = 0; i < data.length; i++) {
  if (data[i].description) {
    desc.push(data[i].description);
  }
}
console.log(description);
for (var i = 0; i < desc.length; i++) {
  document.querySelector(".desc").textContent = desc[i];
}

// edit bag pic   ✅
// edit desc & title ✅
// edit price ✅
// remove code title ✅
//remove add btn ✅
// rate 4.7 ✅
