
let data = [];
const blogsElement = document.getElementById('products');
const productContainer = document.getElementById('product_container');
const productDetailsContainer = document.getElementById('product_details_container');

const renderResetProduct = () =>{
    data = [];
    blogsElement.innerHTML = "";
}

const showProductDetails = (encodedProductData) =>{
    const product = JSON.parse(decodeURIComponent(encodedProductData));
    productDetailsContainer.innerHTML = `
    <div class="app-container">
        <div>
            <div class="text-center">
                <img
                class="product_details_img"
                src="${product.img}"
                />
            </div>
            <div class="product_details_body">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>
                <b>Ingredients:</b>
                <span>${product.ingredients}</span>
                </p>
                <h4>Quantity: ${product.quantity}</h4>
                <h3>Price: ${product.price}TK</h3>
            </div>
        </div>
    </div>
    `
    productContainer.style.display = "none";
    productDetailsContainer.style.display = "block";
}

const getProductsData = async () => {
    renderResetProduct();
    const response = await fetch('src/data/fakeData.json');
    data = await response.json();
    await renderProductData();
}

const renderProductData = async () => {
    data.map(product=>{
        const blogsColumn = document.createElement('div');
        blogsColumn.className = 'col-sm-12 col-md-6 col-lg-4 py-2';
        const productString = JSON.stringify(product);
        const encodedProductData = encodeURIComponent(productString); // URL encode the string
        const blogsHTML = `
        <div class="card">
            <img
                class="card-img-top"
                src="${product.img}"
                alt="Card image cap"
            />
            <div class="card-body">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <button onclick="showProductDetails('${encodedProductData}')" class="btn w-100 btn-primary">View</button>
            </div>
        </div>
        `
        blogsColumn.innerHTML = blogsHTML;
        blogsElement.appendChild(blogsColumn);
    })

    productContainer.style.display = "block";
    productDetailsContainer.style.display = "none";
}

getProductsData();