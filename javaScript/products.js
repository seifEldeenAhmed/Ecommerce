export async function dataParse() {
  try {
    let resp = await fetch("https://fakestoreapi.com/products");
    let data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

var cartList = document.getElementById("cartList");
let totalQuantity = 0;
let checkOutPrice = 0;
var cart = {};

export function viewCart() {
  try {
    var cartFromStorage = localStorage.getItem("cart");

    if (cartFromStorage) {
      cart = JSON.parse(cartFromStorage);

      if (Object.keys(cart).length === 0) {
        let CartTitle = document.querySelector(".CartTitle");
        CartTitle.innerHTML = "Cart is Empty => Go shop now :)";
          //to hide checkout when cart is empty
          let checkout = document.querySelector(".right");
          checkout.style.display = "none";
          //Hide clear cart when reload empty cart
          document.getElementById("clearCartButton").style.display = "none";

      }

      for (let value of Object.values(cart)) {
        let container = document.createElement("div");
        container.classList.add("item");

        let imageArea = document.createElement("div");
        imageArea.classList.add("image-area");

        let image = document.createElement("img");
        image.src = `${value.image}`;

        let deleteBtn = document.createElement("a");
        deleteBtn.classList.add("remove-image");
        deleteBtn.innerHTML = '&#215;'
        deleteBtn.href='#'

        imageArea.appendChild(image);
        imageArea.appendChild(deleteBtn);

        let info = document.createElement("div");
        info.classList.add("info");

        let title = document.createElement("div");
        title.classList.add("name");
        title.textContent = `${value.title}`;

        let price = document.createElement("div");
        price.className = "price";
        price.textContent = `${value.price}`;

        info.appendChild(title);
        info.appendChild(price);

        let quantity = document.createElement("div");
        quantity.classList.add("quantity");

        let decQuantityButton = document.createElement("button");
        decQuantityButton.textContent = "-";
        let quantityValue = document.createElement("span");
        quantityValue.classList.add("value");
        quantityValue.textContent = `${value.quantity}`;
        let incQuantityButton = document.createElement("button");
        incQuantityButton.textContent = "+";

        quantity.appendChild(decQuantityButton);
        quantity.appendChild(quantityValue);
        quantity.appendChild(incQuantityButton);

        let totalPrice = document.createElement("div");
        totalPrice.classList.add("returnPrice");
        let total=0;
        let priceValue=0;
        if (isNaN(value.price)) {
             priceValue = value.price.replace("EGP", "");
             total = priceValue * value.quantity;
            totalPrice.textContent = "EGP " + total; 
        }
        else{ 
        total = value.price * value.quantity;
        totalPrice.textContent = "EGP " + total;
        }

        let horzLine = document.createElement("hr");
        horzLine.className = "hr";

        container.appendChild(imageArea);
        container.appendChild(info);
        container.appendChild(quantity);
        container.appendChild(totalPrice);
      
        incQuantityButton.addEventListener("click", function () {
          value.quantity += 1;
          quantityValue.textContent = value.quantity;
          total = priceValue * value.quantity;
          //to remove unnecessary decimal points
          total = parseFloat(total.toFixed(2));
          totalPrice.textContent = "EGP " + total;
          localStorage.setItem("cart", JSON.stringify(cart));
          // Update totalQuantity
          totalQuantity += 1;
          totalQuan.innerHTML = totalQuantity;
          // Update totalPrice
          checkOutPrice += Number(priceValue);
          checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
          allProductsPrice.innerHTML = 'EGP '+checkOutPrice;
        });

        decQuantityButton.addEventListener("click", function () {
          if (value.quantity != 1) {
            value.quantity -= 1;
            quantityValue.textContent = value.quantity;
            total = priceValue * value.quantity;
            //to remove unnecessary decimal points
            total = parseFloat(total.toFixed(2));
            totalPrice.textContent = "EGP " + total;
            localStorage.setItem("cart", JSON.stringify(cart));
            // Update totalQuantity
            totalQuantity -= 1;
            totalQuan.innerHTML = totalQuantity;
            // Update totalPrice
            checkOutPrice -= Number(priceValue);
            checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
            allProductsPrice.innerHTML = 'EGP '+checkOutPrice;
          }
        });
        container.appendChild(horzLine);
        cartList.appendChild(container);

        //handle total quantity and total price in checkout
        totalQuantity += Number(`${value.quantity}`);
        checkOutPrice += total;
      }
      // detete product
      let deleteButtons = document.querySelectorAll(".remove-image");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          let price = this.parentNode.parentNode.querySelector(".returnPrice").innerHTML.replace("EGP", "");
          let quantity = this.parentNode.parentNode.querySelector(".value").innerHTML;
          delete cart[`${this.parentNode.parentNode.querySelector(".name").textContent}`];
          button.parentNode.parentNode.remove();
          totalQuantity -= quantity;
          totalQuan.innerHTML = totalQuantity;
          checkOutPrice -= price;
          checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
          allProductsPrice.innerHTML = checkOutPrice;
          localStorage.setItem("cart", JSON.stringify(cart));
          let CartTitle = document.querySelector(".CartTitle");
          //delete last element in cart
          if (Object.keys(cart).length === 0) {
            CartTitle.innerHTML = "Cart is Empty => Go shop now :)";
            document.getElementById("clearCartButton").style.display = "none";
            //to hide checkout when cart is empty
            let checkout = document.querySelector(".right");
            checkout.style.display = "none";
          }
        });
      });
      var totalQuan = document.querySelector(".totalQuantity");
      totalQuan.innerHTML = totalQuantity;

      var allProductsPrice = document.querySelector(".totalPrice");
      checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
      allProductsPrice.innerHTML = "EGP " + checkOutPrice;
    } else {
      let CartTitle = document.querySelector(".CartTitle");
      CartTitle.innerHTML = "Cart is Empty => Go shop now :)";
      document.getElementById("clearCartButton").style.display = "none";
      //to hide checkout when cart is empty
      let checkout = document.querySelector(".right");
      checkout.style.display = "none";
    }
  } catch (error) {
    console.error("Error viewing cart:", error);
    throw error;
  }
}

export function clearCart() {
  let cartTilte = document.querySelector(".CartTitle");
  cartTilte.innerHTML = "Cart is Empty => Go shop now :)";
  document.getElementById("clearCartButton").style.display = "none";
  cart = {};
  cartList.remove();
  localStorage.removeItem("cart");

  //to hide checkout when cart is empty
  let checkout = document.querySelector(".right");
  checkout.style.display = "none";
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export async function attachLogicToSearchBtn (){
  let searchBtn=document.querySelector('.btn-search');
  let data=await dataParse()
  searchBtn.onclick=function(){
    // console.log(data);
    let searchVal=document.querySelector('.input-search').value;
    if(searchVal==''){
      alert('rkz m3aya shwya');
    }
    else{
      let searchResultArr = [];
      let regex=new RegExp(escapeRegExp(searchVal), 'i')
      data.forEach(product => {
        const match=product.title.match(regex)
        if (match) {
          searchResultArr.push(product)
        }
      });
      function displaySearchedProducts(mada=searchResultArr) {
        var container = document.querySelector(".category");
        container.innerHTML=''
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