//Sepete elkleme yapacak Fonksiyon

import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();

export const addToCart = (event, products) => {
  // Tıklanan ürünün id sine erişmemiz lazım
  const productId = parseInt(event.target.dataset.id);

  // bu id ye sahip başka bir eleman var mı
  const product = products.find((product) => product.id == productId);
  if (product) {
    //Eğer ürün varsa bunu bul
    const exitingItem = cart.find((item) => item.id === productId);

    // Ürün sepette varsa bunu ekleme miktarını bir arttır.
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // Sepete eklenecek objeyi oluştur
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // oluşturulan cartları sepete ekle
      cart.push(cartItem);
      // ekleme yapılan cartın içeriğini güncelle
      event.target.textContent = "Added";
      // localStoragei güncelle
      saveToLocalStorage(cart);
      // Sepet iconunu güncelle
      updateCartIcon(cart);
    }
  }
};

// Sepetten Eleman Silen Fonksiyon
const removeFromCart = () => {
  // silinecek elemanı belirlemek için benzersiz bir değer yakala(id)
  const productId = parseInt(event.target.dataset.id);
  // tıklanan elemanı sepetten kaldır
  cart = cart.filter((item) => item.id !== productId);
  //Local i güncelle
  saveToLocalStorage(cart);
  // sayfayı güncelle
  renderCartItems();
  // toplam miktarı güncelle
  displayCartTotal();
  // Sepet iconunu güncelle
  updateCartIcon(cart);
};

// ekrana cart elemanlarını render eden fonksiyon
export const renderCartItems = () => {
  // Html de cart itemlerin render edileceği alan eriş
  const cartItemElement = document.querySelector("#cartItems");

  // bu elemanın içeriğini güncelle

  cartItemElement.innerHTML = cart
    .map(
      (item) =>
        `
   <div class="cart-item">
              <!-- Image -->
              <img
               
                src="${item.image}"
                alt=""
              />
              <!--Info  -->
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value=${item.quantity}
                  class="cart-item-quantity"
                  data-id='${item.id}'
                />
              </div>
              <h2 class="cart-item-price">$${item.price}</h2>
              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>
  `
    )
    .join("");
  // Remove from cart butonlaraına eriş
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  // quantity inputlarına eriş
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

// Inputlarda değişim olması durumunda çalışacak fonksiyon
const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;

  const productId = +event.target.dataset.id;

  // yeni miktar 0 dan büyükse
  if (newQuantity > 0) {
    // id si bilinen elemanı bul
    const cartItem = cart.find((item) => item.id === productId);
    // eğer ürün sepette yoksa
    if (!cartItem) return;
    //bulunan ürünün miktarını güncelle
    cartItem.quantity = newQuantity;

    //local i güncelle
    saveToLocalStorage(cart);
    // toplam fiyatı güncelle
    displayCartTotal();
    // sepet iconunu güncelle
    updateCartIcon(cart);
  }
};

// sepetteki total ürün fiyatını render eden fonksiyon
export const displayCartTotal = () => {
  // toplam fiyat alanına eriş
  const cartTotalElement = document.querySelector("#cartTotal");
  // sepetteki toplam ürün fiyatını hesaplar
  const total = calculateCartTotal(cart);
  // toplam fiyat kısmını güncelle
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
