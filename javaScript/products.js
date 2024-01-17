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

        //checkout for products in cart
        document.querySelector('.buttonCheckout').addEventListener('click',function() {
          let deleteBtns = document.querySelectorAll('.remove-image');
          deleteBtns.forEach(function(btn) {
            btn.style.display = 'none';
        });
        })

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

        //checkout for products 
        document.querySelector('.buttonCheckout').addEventListener('click',function() {
          price.style.display ='none'
        })

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

        //checkout for products in cart
        document.querySelector('.buttonCheckout').addEventListener('click',function() {
          quantity.style.display ="none";
        });
      

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

        document.querySelector('.buttonCheckout').addEventListener('click' ,function() {
          horzLine.style.display = 'none';
        })

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
  
  //checkout for products in cart
  document.querySelector('.buttonCheckout').addEventListener('click',function() {
  document.getElementById('keepShoping').style.display = "none";

  document.querySelector('.CartTitle').innerHTML = 'Your Order Details 🚛';
  document.querySelector('#checkOut').innerHTML = 'Check Your Information'

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let city = document.getElementById('city').value;

    let fullName = document.querySelector('.wrapper');
    fullName.innerHTML = '<strong> Full Name: </strong>' + name;
    fullName.style.fontSize = '20px';
    fullName.style.padding = '20px';


    let phoneNum = document.querySelector('.phoneWrapper');
    phoneNum.innerHTML = '<strong> Phone: </strong>' + phone;
    phoneNum.style.fontSize = '20px';
    phoneNum.style.padding = '20px';

    let add = document.querySelector('.addressWrapper');
    add.innerHTML = '<strong> Address: </strong>' + address;
    add.style.fontSize = '20px';
    add.style.padding = '20px';

    let Country = document.querySelector('.countryWrapper');
    Country.innerHTML = '<strong> Country: </strong>' + country;
    Country.style.fontSize = '20px';
    Country.style.padding = '20px';

    let City = document.querySelector('.cityWrapper');
    City.innerHTML = '<strong> City: </strong>' + city;
    City.style.fontSize = '20px';
    City.style.padding = '20px';

    document.querySelector('.buttonCheckout').innerHTML = 'Confirm Proceedure 👌';

   let backCartBtn = document.querySelector('#clearCartButton');
    backCartBtn.innerHTML = 'Back To Cart';
    backCartBtn.removeEventListener('click',clearCart);
    backCartBtn.addEventListener('click',function(){ 
      window.location.reload();
      console.log('backkk');
    })

  });

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

// cart notification
export function cartNotification(){
  var cart = JSON.parse(localStorage.getItem("cart")) || {};
  if(Object.keys(cart).length == 0){
  document.querySelector('.notification-ellipse').style.display ='none';
  }
  document.querySelector('.notification-ellipse').innerHTML = Object.keys(cart).length;
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
      var $popupContainer = $("#emptySearch");
            $popupContainer.fadeIn(500, function () {
            $(this).delay(1000).fadeOut(5000);
              });
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