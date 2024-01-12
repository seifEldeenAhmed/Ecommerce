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
export function viewCart() {
    try {
        var cartFromStorage = localStorage.getItem('cart');

        if (cartFromStorage) {
            var cart = JSON.parse(cartFromStorage);

            for (let value of Object.values(cart)) {
                let container = document.createElement('div');
                container.classList.add('cart-item');

                let title = document.createElement('div');
                title.className = 'title';
                let price = document.createElement('div');
                let image = document.createElement('img');
                let quantity = document.createElement('div');
                let incQuantity = document.createElement('div');
                let incQuantityButton = document.createElement('button');
                let decQuantity = document.createElement('div');
                let decQuantityButton = document.createElement('button');
                let deleteBtn = document.createElement('button');
                title.textContent = `${value.title}`;
                quantity.textContent = `${value.quantity}`;
                image.src = `${value.image}`;

                let totalPrice = value.price * value.quantity;
                price.textContent = totalPrice;

                deleteBtn.innerHTML = 'delete';
                deleteBtn.className = 'deleteBtn';

                container.appendChild(title);
                container.appendChild(price);
                container.appendChild(image);
                container.appendChild(incQuantity);
                container.appendChild(decQuantity);
                container.appendChild(quantity);
                container.appendChild(deleteBtn)

                incQuantityButton.innerHTML = '+';
                incQuantityButton.addEventListener('click', function () {
                    value.quantity += 1;
                    quantity.textContent = value.quantity;
                    totalPrice = value.price * value.quantity;
                    price.textContent = totalPrice;
                    localStorage.setItem("cart", JSON.stringify(cart));
                });

                decQuantityButton.innerHTML = '-';
                decQuantityButton.addEventListener('click', function () {
                    if (value.quantity != 1) {
                        value.quantity -= 1;
                        quantity.textContent = value.quantity;
                        totalPrice = value.price * value.quantity;
                        price.textContent = totalPrice;
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                });

                incQuantity.appendChild(incQuantityButton);
                decQuantity.appendChild(decQuantityButton);
                container.appendChild(incQuantity);
                container.appendChild(decQuantity);

                cartList.appendChild(container);

            }
            // detete product 
            let deleteButtons = document.querySelectorAll('.deleteBtn');

            deleteButtons.forEach((button) => {
                button.addEventListener('click', function () {
                    console.log(cart);
                    // console.log();
                    delete cart[`${this.parentNode.querySelector('.title').textContent}`];
                    button.parentNode.remove();
                    localStorage.setItem("cart", JSON.stringify(cart));
                    

                });
            });

        } else {
            console.log("Cart is empty");
            cartList.innerHTML = "no items in the cart";
            document.getElementById("clearCartButton").style.display = 'none';
        }
    } catch (error) {
        console.error('Error viewing cart:', error);
        throw error;
    }

}

export function clearCart() {
    localStorage.removeItem("cart");
    cartList.innerHTML = "no items in the cart";
    document.getElementById("clearCartButton").style.display = 'none';
    cart = {};
    // viewCart();
}






