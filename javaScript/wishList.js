function attachLogicToWishList() {
    let icons = document.querySelectorAll(".heart");
    for (let i = 0; i < icons.length; i++) {
      icons[i].onclick = function () {
       
          var title = document.querySelectorAll(".title")[i].textContent;
          var price = document.querySelectorAll(".price")[i].textContent;
          var image =
            document.querySelectorAll(".top")[i].childNodes[0].src;
          var obj = new WishListObj(image, price, title);
          var wishList = JSON.parse(localStorage.getItem("wishList")) || {};
          wishList[`${obj.title}`] = obj;
          localStorage.setItem('wishList',JSON.stringify(wishList));
        //   var $tickIcon = $("#tickIcon");
        //   var $popupContainer = $("#popupContainer");
        //   $popupContainer.fadeIn(500, function () {
        //     $(this).delay(1000).fadeOut(500);
        //   });
        }
    }}

    class WishListObj {
        constructor(image, price, title) {
          this.image = image;
          this.price = price;
          this.title = title;
          
        }
    }
attachLogicToWishList();

var cartList = document.getElementById("cartList");
export function viewWishList() {
    try {
      var WishFromStorage = localStorage.getItem("wishList");
      if (WishFromStorage) {
        let wishList = JSON.parse(WishFromStorage);
       
  
        // if (Object.keys(wishList).length === 0) {
        //   let CartTitle = document.querySelector(".CartTitle");
        //   CartTitle.innerHTML = "Cart is Empty => Go shop now :)";
        //     //to hide checkout when cart is empty
        //     let checkout = document.querySelector(".right");
        //     checkout.style.display = "none";
        //     //Hide clear cart when reload empty cart
        //     document.getElementById("clearCartButton").style.display = "none";
  
        // }
  
        for (let value of Object.values(wishList)) {
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
  
        let horzLine = document.createElement("hr");
        horzLine.className = "hr";
  
          container.appendChild(imageArea);
          container.appendChild(info);
         
         
        // // detete product
        // let deleteButtons = document.querySelectorAll(".remove-image");
        // deleteButtons.forEach((button) => {
        //   button.addEventListener("click", function () {
        //     let price = this.parentNode.parentNode.querySelector(".returnPrice").innerHTML.replace("EGP", "");
        //     delete cart[`${this.parentNode.parentNode.querySelector(".name").textContent}`];
        //     button.parentNode.parentNode.remove();
        //     localStorage.setItem("wishList", JSON.stringify(cart));
        //     let CartTitle = document.querySelector(".CartTitle");
        //     //delete last element in cart
        //     if (Object.keys(cart).length === 0) {
        //       CartTitle.innerHTML = "Cart is Empty => Go shop now :)";
        //       document.getElementById("clearCartButton").style.display = "none";
        //       //to hide checkout when cart is empty
        //       let checkout = document.querySelector(".right");
        //       checkout.style.display = "none";
        //     }
        //   });
        // });

        container.appendChild(horzLine);
        cartList.appendChild(container);


      } 
    }else {
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


