/*////////// Nav Bar //////////*/

const burgerMenu = document.getElementById('burger-icon');
const mobileNav = document.getElementById('mobile-navbar');

const storeCart = document.getElementById('store-cart');
const storeCartMenu = document.querySelector('.cart');

const exitCart = document.getElementById('exit-cart-btn');


burgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
});

[storeCart, exitCart].forEach((cartEl) => {
    cartEl.addEventListener('click', () => {
    storeCartMenu.classList.toggle('show');
})});


/*////////// Store - Items //////////*/

const storeItems = document.getElementById('store-items');

const storeItemsData = [
    {
        id: 'item-1',
        name: 'Positive Energy Tee',
        price: 19.99,
        img: 'images/product-image-1.jpg'
    },
    {
        id: 'item-2',
        name: 'Yellow culture tee',
        price: 19.99,
        img: 'images/product-image-2.jpg'
    },
    {
        id: 'item-3',
        name: 'Wine Graphic Tee',
        price: 21.99,
        img: 'images/product-image-3.jpg'
    },
    {
        id: 'item-4',
        name: 'Billionaire Beliefs Tee',
        price: 24.99,
        img: 'images/product-image-4.jpg'
    },
    {   
        id: 'item-5',
        name: 'Out Cast Red Box Tee',
        price: 19.99,
        img: 'images/product-image-5.jpg'
    },
    {
        id: 'item-6',
        name: 'Mouth Graphic Tee',
        price: 19.99,
        img: 'images/product-image-6.jpg'
    },
    { 
        id: 'item-7',
        name: 'Snake Tread Tee',
        price: 16.99,
        img: 'images/product-image-7.jpg'
    },
    {   
        id: 'item-8',
        name: 'Midnight Mares Tee',
        price: 21.99,
        img: 'images/product-image-8.jpg'
    },
    {   
        id: 'item-9',
        name: 'DBZ Graphic Tee',
        price: 24.99,
        img: 'images/product-image-9.jpg'
    },
];


function generateStoreItems() {
    storeItemsData.forEach((storeItem) => {
        storeItems.innerHTML += `
        <div class="slide">
              <div class="store-item-card">
                <img src="${storeItem.img}" width="100%">
                <button class="mobile-arrow"><img src="images/mobile_arrow_icon.png"></button>
                <div class="store-item-info-container">
                  <h1 id="product-title">${storeItem.name}</h1>
                  <h2>made with 100% cotton</h2>
                  <h3 id="store-item-price">$${storeItem.price}</h3>
                  <button onclick="addToCart('${storeItem.id}')" id="" class="addToCartBtn">add to cart</button>
                </div>
              </div>
              <h3 id="store-item-price-mobile">$${storeItem.price}</h3>
              <button onclick="addToCart('${storeItem.id}')" id="" class="addToCartBtn-mobile">add to cart</button>
            </div>
        `;
    });
}
generateStoreItems();

/*////////// Store - Carousel //////////*/

const scrollContainer = document.getElementById('carousel-store-item-slider');

const slidesContainer = document.querySelector('.store-carousel-container');

const slides = document.querySelectorAll('.slide');

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let prevClickCounter = 0;
const tabletScreen = window.matchMedia('(max-width: 820px)');


function prevSlide() {

    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft -= 920;

    if (prevClickCounter >= 2) {
        prevButton.style.display = "none";
        prevClickCounter = 0;
    }
    
    if (tabletScreen.matches) {
        prevClickCounter = -1;
        scrollContainer.scrollLeft -= 620;
    }

};

prevButton.addEventListener('click', (event) => {
    prevSlide();
    prevClickCounter++;
});

function nextSlide() {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft += 920;

    prevButton.style.display = "flex";

    if (tabletScreen.matches) {
        scrollContainer.scrollLeft += 620;
    }
};

nextButton.addEventListener('click', (event) => {
    nextSlide();
});


// Mobile Version Carousel
const storePrevMobile = document.getElementById('store-prev-mobile');
const storeNextMobile = document.getElementById('store-next-mobile');

function prevStoreSlideMobile() {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft -= 225;
};

function nextStoreSlideMobile() {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft += 225;
};

storePrevMobile.addEventListener('click', (event) => {
    prevStoreSlideMobile();
});

storeNextMobile.addEventListener('click', (event) => {
    nextStoreSlideMobile();
})


/*////////// Store - Item buttons //////////*/

const cartBtns = document.querySelectorAll('.addToCartBtn');    // Desktop
const cartBtnsMobile = document.querySelectorAll('.addToCartBtn-mobile');   // Mobile

function changeBtnInfo(event) {
    event.target.innerHTML = 'item added';
    event.target.style.backgroundColor = '#000000';
    event.target.style.color = '#f5f5f5';
};


// Desktop
cartBtns.forEach(btn => {
    btn.addEventListener('click', changeBtnInfo);
});

// Mobile
cartBtnsMobile.forEach(btn => {
    btn.addEventListener('click', changeBtnInfo);
});


const upInfoBtns = document.querySelectorAll('.mobile-arrow');
const storeItemInfo = document.querySelectorAll('.store-item-info-container');

upInfoBtns.forEach((upInfoBtn, index) => {
    upInfoBtn.addEventListener('click', () => {
        storeItemInfo[index].classList.toggle('visibility');
        upInfoBtn.classList.toggle('moveArrow');
    });
});


/*////////// Store - Cart/Basket //////////*/

const cartIcon = document.getElementById('cart-item-count');
const label = document.getElementById('label');
const shoppingCart = document.getElementById('shopping-cart');
const cartFullTotal = document.getElementById("cart-section");

// cart array
let cart = JSON.parse(localStorage.getItem('cart-data')) || [];
updateCart();

// add to cart
function addToCart(id) {
    // check if product already exists in cart
    if (cart.some((item) => item.id === id)) {
        
    } else {
        const item = storeItemsData.find((storeItem) => storeItem.id === id)

        cart.push({
            ...item,
            quantity: 1,
        });
    }

    updateCart();
};

// update cart
function updateCart() {
    generateCartItems();
    generateSubtotal();

    // save cart to local storage
    localStorage.setItem('cart-data', JSON.stringify(cart));
}

// generate and calculate subtotal and discounts
function generateSubtotal() {
    let totalPrice = 0, totalItems = 0, discountPrice = 0, grandTotal = 0;
    let shippingPrice = 5.99;
    
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
        discountPrice = (30 / 100) * totalPrice;
        grandTotal = totalPrice - discountPrice + shippingPrice; 
    });


    cartFullTotal.innerHTML = `
    <div class="cartFullTotal">
                <ul class="cart-total">
                  <div class="subtotal">
                    <div id="subtotal-title">Subtotal:</div>
                    <div id="subtotal-price">$${totalPrice.toFixed(2)}</div>
                  </div>

                  <div class="discount">
                    <div id="discount-title">30% Discount:</div>
                    <div id="discount-amount">-$${discountPrice.toFixed(2)}</div>
                  </div>

                  <div class="shipping">
                    <div id="shipping-title">Shipping:</div>
                    <div id="shipping-price">$5.99</div>
                  </div>

                  <div class="grand-total">
                    <div id="grand-total-title">Grand total:</div>
                    <div id="grand-total-price">$${grandTotal.toFixed(2)}</div>
                  </div> 
                </ul>
              </div>
              <button class="checkout-btn">CHECKOUT</button>
    `;

    cartIcon.innerHTML = totalItems;
    if (cartIcon.innerHTML > 0) {
        cartIcon.style.display = 'flex';
        label.style.display = 'none';
    } else {
        cartIcon.style.display = 'none';
        label.style.display = 'flex'
    }
}

// generate cart items
function generateCartItems() {

        shoppingCart.innerHTML = ``; // clear shopping cart (ensures items do not duplicate)
        cart.forEach((item) => {
            shoppingCart.innerHTML += `
            
            <div class="cart-content">
                    <div class="cart-image-container"><img src=${item.img} id="cart-item-image"></div> 
                    <div class="cart-detail">
                        <div id="cart-item-name"><p>${item.name}</p></div>
                        <div id="cart-item-price"><p>$${item.price}</p></div>
                        <div id="cart-item-quantity"><p>Qty</p></div>
                        <div class="cart-quantity">
                            <button onclick="adjustQuantity('decrement', '${item.id}')" class="decrement"><p>-</p></button>
                            <div class="quantity-number"><p>${item.quantity}</p></div>
                            <button onclick="adjustQuantity('increment', '${item.id}')" class="increment"><p>+</p></button>
                        </div>
                        <button onclick="removeItemFromCart('${item.id}')" id="cart-item-remove"><p>Remove</p></button>
                    </div>
                </div>
            `;
        })
}


// remove item from cart
const clearCart = document.getElementById('clear-cart-btn');

clearCart.addEventListener('click', () => {
    cart = [];

    updateCart();
});

function removeItemFromCart(id) {
   cart = cart.filter((item) => item.id !== id);

   updateCart();
}


// adjust quantity for store item
function adjustQuantity(action, id) {
    cart = cart.map((item) => {
        
        let quantity = item.quantity;

        if (item.id === id) {
            if (action === 'decrement' && quantity > 1){
                quantity--;
            } else if (action === 'increment') {
                quantity++;
            }
        }

        return {
            ...item,
            quantity,
        };
    });

    updateCart();
}


/*////////// Reviews //////////*/

const reviewScrollContainer = document.getElementById('carousel-review-item-slider');

const reviewSlidesContainer = document.querySelector('.review-carousel-container');

const reviewPrevButton = document.querySelector('.reviews-prev');
const reviewNextButton = document.querySelector('.reviews-next');


function scrollBehavior() {
    reviewScrollContainer.style.scrollBehavior = 'smooth';
};

reviewPrevButton.addEventListener('click', function (event)  {
    scrollBehavior();
    reviewScrollContainer.scrollLeft -= 1500;

    if (tabletScreen.matches) {
        reviewScrollContainer.scrollLeft -= 711;
    }
});

reviewNextButton.addEventListener('click', function (event)  {
    scrollBehavior();
    reviewScrollContainer.scrollLeft += 1500;

    if (tabletScreen.matches) {
        reviewScrollContainer.scrollLeft += 711;
    }
});

// Mobile Version

const reviewPrevButtonMobile = document.querySelector('.reviews-prev-mobile');
const reviewNextButtonMobile = document.querySelector('.reviews-next-mobile');

reviewPrevButtonMobile.addEventListener('click', function (event)  {
    scrollBehavior();
    reviewScrollContainer.scrollLeft -= 327.5;
});

reviewNextButtonMobile.addEventListener('click', function (event)  {
    scrollBehavior();
    reviewScrollContainer.scrollLeft += 327.5;
});