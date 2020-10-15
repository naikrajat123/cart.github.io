let carts = document.querySelectorAll('.add-cart');
// let removeClicked = document.querySelectorAll('.add-cart');

document.getElementById("cart-clear").addEventListener("click", clearCart);
// //document.getElementById("remove").addEventListener("click", isRemoveClicked);


fetch("https://api.jsonbin.io/b/5f6b6cd665b18913fc51f71f")
.then(res => res.json())
.then(data => console.log(data))


let products = [
    {
        name: "Orange Tshirt",
        tag: "orangehoddie",
        price: 100,
        inCart: 0
    },
    {
        name: "white Tshirt",
        tag: "whitehoddie",
        price: 200,
        inCart: 0
    },
    {
        name: "Grey Tshirt",
        tag: "greyhoddie",
        price: 220,
        inCart: 0
    },
    {
        name: "Blue Tshirt",
        tag: "bluehoddie",
        price: 50,
        inCart: 0
    },
    {
        name: "Red Tshirt",
        tag: "redhoddie",
        price: 70,
        inCart: 0
    },
    {
        name: "Black Tshirt",
        tag: "blackhoddie",
        price: 10,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        displayCart();
    })
};

function clearCart() {
    localStorage.clear();
    location.reload();
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    console.log("the product price is", product.price);
    if(cartCost){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost  + product.price );
    }else{
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost = localStorage.getItem('totalCost');

    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    if(cartItems && productContainer){
        productContainer.innerHTML= '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <span class="spanQty">${item.name}<i class="fa fa-close"></i>
            </span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <i class="fa fa-minus" id="remove"></i>
            <span class="spanQty">${item.inCart}</span>
            <i class="fa fa-plus"></i>

            </div>
            <div class="total">
            $${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML +=
        `<div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total
        </h4>
        <h4 class="basketTotal">
        $${cartCost},00
        </h4>
        </div>`
    }

}


onLoadCartNumbers();
displayCart();
