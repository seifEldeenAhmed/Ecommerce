function attachLogicToWishList() {
    let icons = document.querySelectorAll(".heart");
    for (let i = 0; i < icons.length; i++) {
      icons[i].onclick = function () {
        console.log(icons);
          var title = document.querySelectorAll(".title")[i].textContent;
          var price = document.querySelectorAll(".price")[i].textContent;
          var image =
          document.querySelectorAll(".top")[i].childNodes[0].childNodes[0].src;
          var obj = new WishListObj(image, price, title);
          var wishList = JSON.parse(localStorage.getItem("wishList")) || {};
          wishList[`${obj.title}`] = obj;
          localStorage.setItem('wishList',JSON.stringify(wishList));
               
          var $Wishpopup = $("#Wishpopup");
          $Wishpopup.fadeIn(500, function () {
            $(this).delay(1000).fadeOut(500);
          });
        }
    }
  }
   

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
      let wishList = JSON.parse(WishFromStorage);
      
      if (Object.keys(wishList).length !== 0) {
       console.log("henaa");
       
        for (let value of Object.values(wishList)) {
          let container = document.createElement("div");
          container.classList.add("item");
  
          let imageArea = document.createElement("div");
          imageArea.classList.add("image-area");
  
          let image = document.createElement("img");
          image.src = `${value.image}`;
  
          imageArea.appendChild(image);
        
  
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

          let deleteBtn = document.createElement("a");
          deleteBtn.classList.add('deleteBtn');
          deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
          let addcartBtn = document.createElement("a");
          addcartBtn.classList.add('addcartBtn');
          addcartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i>';

          container.appendChild(imageArea);
          container.appendChild(info);
          container.appendChild(deleteBtn);
          container.appendChild(addcartBtn);
          cartList.appendChild(container);
      } 
      //  detete product
      let deleteButtons = document.querySelectorAll(".deleteBtn");
      for(let i=0 ; i< deleteButtons.length;i++){
        deleteButtons[i].onclick = function () {
          delete wishList[`${this.parentNode.querySelector(".name").textContent}`];
          this.parentNode.remove();
          localStorage.setItem("wishList", JSON.stringify(wishList));
          let CartTitle = document.querySelector(".CartTitle");
          //delete last element in cart
          console.log(Object.keys(wishList).length);
          if (Object.keys(wishList).length === 0) {
            CartTitle.innerHTML = "No wishes yet?😮 Explore our collection to discover dream items for your wish list with just a click!";
            CartTitle.style.width='600px';
            CartTitle.style.paddingTop ="130px";
            CartTitle.style.lineHeight ="1.5";
          }
          
      };
      }
    }else {
      console.log("hena else");
        let CartTitle = document.querySelector(".CartTitle");
          CartTitle.innerHTML = "No wishes yet?😮 Explore our collection to discover dream items for your wish list with just a click!";
         CartTitle.style.width='600px';
         CartTitle.style.paddingTop ="130px";
         CartTitle.style.lineHeight ="1.5";
      }
    } catch (error) {
      console.error("Error viewing Wish list:", error);
      throw error;
    }
}


