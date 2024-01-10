import { dataParse } from "../javaScript/products.js";

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 0);
});

let arr = [];
window.onload = async function (e) {
  var dataa = await dataParse();

  for (var i = 0; i < dataa.length; i++) {
    if (dataa[i].category == "men's clothing") {
      arr.push(dataa[i]);
    }
  }
  console.log(arr);

  function displayProducts() {
    var container = document.querySelector(".category");

    arr.forEach(function (a) {
      var productDiv = document.createElement("div");
      productDiv.className = "product";

      productDiv.innerHTML = `
      <div class="image"><img src="${a.image}" alt=""></div>
        <h4> rate : ${a.rating.rate}</h4>
        <h2>${a.title}</h2>
        <p>${a.description.slice(0, 100)}</p>
        <p class="price">Price: $${a.price} </p>
      `;

      container.appendChild(productDiv);
    });
  }

  // Call the function to display products
  displayProducts();
};
