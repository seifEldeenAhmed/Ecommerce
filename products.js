function dataParse(){
    fetch('https://fakestoreapi.com/products').then(res=>res.json())
    .then((jsonresp)=>{
        console.log(jsonresp[0].image);
        let tableElement=document.getElementById('object-table')
        for (let i=0;i<jsonresp.length;i++){
            //creating row
            let row=document.createElement('tr');
            //creating every column in the row
            let id=document.createElement('td');
            let price=document.createElement('td');
            let desc=document.createElement('td');
            let image=document.createElement('img');
            let title=document.createElement('td');
            let rating=document.createElement('td');
            let category=document.createElement('td');
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

            tableElement.appendChild(row)
            

        }
    })
}

