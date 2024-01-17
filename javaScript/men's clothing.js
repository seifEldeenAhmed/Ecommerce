import { dataParse } from "../javaScript/products.js";

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 0);
});
let menu = document.querySelector("#menu-icon");
let navMenu = document.querySelector(".navMenu");
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navMenu.classList.toggle("open");
};

let arr = [];
window.onload = async function (e) {
  var dataa = await dataParse();

  for (var i = 0; i < dataa.length; i++) {
    if (dataa[i].category == "men's clothing") {
      arr.push(dataa[i]);
    }
  }
  // console.log(arr);

  function displayProducts() {
    var container = document.querySelector(".category");

    arr.forEach(function (a) {
      var productDiv = document.createElement("div");
      productDiv.className = "product";

      var productLink = document.createElement('a');

      productLink.href = `/html/detail.html?id=${a.id}`;

      var productImage = document.createElement('img');
      productImage.src = a.image;
      productImage.alt = '';

      productLink.appendChild(productImage);

      productLink.innerHTML += `
    <h4> rate : ${a.rating.rate}</h4>
    <h2>${a.title}</h2>
    <p>${a.description.slice(0, 100)}</p>
    <p class="price">Price: EGP ${a.price} </p>
`;
      productDiv.appendChild(productLink);
      container.appendChild(productDiv);

      // productDiv.innerHTML = `
      // <div class="image"><img src="${a.image}" alt=""></div>
      //   <h4> rate : ${a.rating.rate}</h4>
      //   <h2>${a.title}</h2>
      //   <p>${a.description.slice(0, 100)}</p>
      //   <p class="price">Price: EGP ${a.price} </p>
      // `;

    });
  }

  // Call the function to display products
  displayProducts();
  attachLogicToSearchBtn();
};
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export async function attachLogicToSearchBtn() {
  let searchBtn = document.querySelector('.btn-search');
  let data = await dataParse()
  searchBtn.onclick = function () {
    // console.log(data);
    let searchVal = document.querySelector('.input-search').value;
    if (searchVal == '') {
      alert('rkz m3aya shwya');
    }
    else {
      let searchResultArr = [];
      let regex = new RegExp(escapeRegExp(searchVal), 'i')
      data.forEach(product => {
        const match = product.title.match(regex)
        if (match) {
          searchResultArr.push(product)
        }
      });
      function displaySearchedProducts(mada = searchResultArr) {
        var container = document.querySelector(".category");
        container.innerHTML = ''
        mada.forEach(function (a) {
          var productDiv = document.createElement("div");
          productDiv.className = "product";
          productDiv.innerHTML = `
          <div class="image"><img src="${a.image}" alt=""></div>
            <h4> rate : ${a.rating.rate}</h4>
            <h2>${a.title}</h2>
            <p>${a.description.slice(0, 100)}</p>
            <p class="price">Price: EGP ${a.price} </p>
          `;

          container.appendChild(productDiv);
        });
      }
      displaySearchedProducts()
    }

  }
}
