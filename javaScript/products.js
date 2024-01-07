var cart={};
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
    export function displayParsedData(x=dataParse){
        
        let tableElement=document.getElementById('object-table')
        x().then((jsonresp)=>{
            for (let i=0;i<jsonresp.length;i++){
                //creating row
                let row=document.createElement('tr');
                //creating every column in the row
                let id=document.createElement('td');
                id.id='id'
                let price=document.createElement('td');
                price.id='price'
                let desc=document.createElement('td');
                desc.id='desc'
                let image=document.createElement('img');
                image.id='image'
                let title=document.createElement('td');
                title.id='title';
                let rating=document.createElement('td');
                rating.id='rating'
                let category=document.createElement('td');
                category.id='category'
                let addToCart=document.createElement('td');
                let addToCartButton=document.createElement('button');
                //setting data to each col
                id.textContent=jsonresp[i].id;
                row.appendChild(id)
                title.textContent=jsonresp[i].title;
                row.appendChild(title)
                price.textContent=jsonresp[i].price;
                row.appendChild(price)
                desc.textContent=jsonresp[i].description;
                row.appendChild(desc)
                image.src=jsonresp[i].image;
                row.appendChild(image)
                rating.textContent=jsonresp[i].rating.rate
                row.appendChild(rating)
                category.textContent=jsonresp[i].category
                row.appendChild(category)
                addToCartButton.innerHTML='Add to Cart';
                addToCartButton.className='cart'
                addToCart.appendChild(addToCartButton);
                row.appendChild(addToCart)
    
                tableElement.appendChild(row)
            }
        })
        .then(()=>{
            attachLogicToAddToCart()
        })
        
    }
        export function attachLogicToAddToCart(){
            let buttons=document.querySelectorAll('.cart');
            for(let i=0; i<buttons.length;i++){
                buttons[i].onclick=function(){
                    
                    var title=buttons[i].parentNode.parentNode.querySelector('#title').textContent
                    var price=buttons[i].parentNode.parentNode.querySelector('#price').textContent
                    var image=buttons[i].parentNode.parentNode.querySelector('#image').src
                    var obj=new CartObj(image, price, title)
                    cart[`${obj.title}`]=obj
                }
            }
        }
        
        export class CartObj{
            constructor(image, price, title, quantity){
                this.image=image;
                this.price=price;
                this.title=title;
                this.quantity=1;
            }

        }
