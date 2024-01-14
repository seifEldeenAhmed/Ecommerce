// var cart = {};
export async function dataParse() {
    try {
        let resp = await fetch('https://fakestoreapi.com/products');
        let data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

var cartList = document.getElementById("cartList");
let totalQuantity = 0;
let checkOutPrice = 0;
var cart = {}
export function viewCart() {
    try {
        var cartFromStorage = localStorage.getItem('cart');

        if (cartFromStorage) {
             cart = JSON.parse(cartFromStorage);
            if(Object.keys(cart).length === 0){
            let CartTitle = document.querySelector('.CartTitle');
            CartTitle.innerHTML = 'Cart is Empty => Go shop now :)';
            
            }
                for (let value of Object.values(cart)) {
                let container = document.createElement('div');
                container.classList.add('item');

                let image = document.createElement('img');
                image.src = `${value.image}`;

                let info = document.createElement('div');
                info.classList.add('info');
                
                let title = document.createElement('div');
                title.className = 'title';
                title.classList.add('name');
                title.textContent = `${value.title}`;
                
                let price = document.createElement('div');
                price.className = 'price';
                price.textContent =`${value.price}`;

                info.appendChild(title);
                info.appendChild(price);

                let quantity = document.createElement('div');
                quantity.classList.add('quantity');

                let decQuantityButton = document.createElement('button');
                decQuantityButton.textContent ='-';
                let quantityValue = document.createElement('span');
                quantityValue.classList.add('value');
                quantityValue.textContent = `${value.quantity}`;
                let incQuantityButton = document.createElement('button');
                incQuantityButton.textContent ='+';

                quantity.appendChild(decQuantityButton);
                quantity.appendChild(quantityValue);
                quantity.appendChild(incQuantityButton);

                let totalPrice = document.createElement('div');
                totalPrice.classList.add('returnPrice');

                let priceValue = value.price.replace('EGP' ,"");
                let total = priceValue * value.quantity;
                totalPrice.textContent ='EGP '+ total;

                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'delete';
                deleteBtn.className = 'deleteBtn';
                
                let horzLine = document.createElement('hr');
                horzLine.className = 'hr';
       
                container.appendChild(image);
                container.appendChild(info);
                container.appendChild(quantity);
                container.appendChild(totalPrice);
                container.appendChild(deleteBtn);
                
                incQuantityButton.addEventListener('click', function () {
                    value.quantity += 1;
                    quantityValue.textContent = value.quantity;
                    total = priceValue * value.quantity;
                    //to remove unnecessary decimal points
                    total = parseFloat(total.toFixed(2));
                    totalPrice.textContent ='EGP '+ total;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    // Update totalQuantity
                        totalQuantity += 1;
                        totalQuan.innerHTML = totalQuantity;
                    // Update totalPrice
                        checkOutPrice += Number(priceValue);
                        checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
                        allProductsPrice.innerHTML = checkOutPrice;
                    });
                             
                decQuantityButton.addEventListener('click', function () {
                    if (value.quantity != 1) {
                        value.quantity -= 1;
                        quantityValue.textContent = value.quantity;
                        total = priceValue * value.quantity;
                        //to remove unnecessary decimal points
                        total = parseFloat(total.toFixed(2));
                        totalPrice.textContent = 'EGP '+ total;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        // Update totalQuantity
                        totalQuantity -= 1;
                        totalQuan.innerHTML = totalQuantity;
                        // Update totalPrice
                        checkOutPrice -= Number(priceValue);
                        checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
                        allProductsPrice.innerHTML = checkOutPrice;
                    }
                });
                container.appendChild(horzLine);
                cartList.appendChild(container);

                //handle total quantity and total price in checkout
                totalQuantity += Number(`${value.quantity}`);
                checkOutPrice += total;
                //0+109+114 => 223
                //0+218+114 =>332
            }
            // detete product 
            let deleteButtons = document.querySelectorAll('.deleteBtn');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', function () {
                    
                    let price = this.parentNode.querySelector('.returnPrice').innerHTML.replace('EGP', "");  
                    let quantity = this.parentNode.querySelector('.value').innerHTML;
                    delete cart[`${this.parentNode.querySelector('.title').textContent}`];
                    button.parentNode.remove();
                    totalQuantity -= quantity;
                    totalQuan.innerHTML = totalQuantity;
                    checkOutPrice -= price;
                    checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
                    allProductsPrice.innerHTML = checkOutPrice;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    let CartTitle = document.querySelector('.CartTitle');
                    //delete last element in cart
                    if(Object.keys(cart).length === 0 ){
                    CartTitle.innerHTML = 'Cart is Empty => Go shop now :)';
                    document.getElementById("clearCartButton").style.display = 'none';
                    }
                    
                });
            });
            var totalQuan = document.querySelector('.totalQuantity');
            totalQuan.innerHTML = totalQuantity;

            var allProductsPrice = document.querySelector('.totalPrice');
            checkOutPrice = parseFloat(checkOutPrice.toFixed(2));
            allProductsPrice.innerHTML = 'EGP '+ checkOutPrice;
           
        } else {
            let CartTitle = document.querySelector('.CartTitle');
            CartTitle.innerHTML = 'Cart is Empty => Go shop now :)';
            document.getElementById("clearCartButton").style.display = 'none';
            //to hide checkout when cart is empty
            let checkout = document.querySelector('.right');
            checkout.style.display = 'none';

            
        }
    } catch (error) {
        console.error('Error viewing cart:', error);
        throw error;
    }
}

export function clearCart() {
    let cartTilte = document.querySelector('.CartTitle');
    cartTilte.innerHTML = 'Cart is Empty => Go shop now :)';
    document.getElementById("clearCartButton").style.display = 'none';
    cart = {};
    cartList.remove();
    localStorage.removeItem("cart");

    //to hide checkout when cart is empty
    let checkout = document.querySelector('.right');
    checkout.style.display = 'none';



    
    
}
 






