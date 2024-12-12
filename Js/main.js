import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

//ürünleri anasayfadayken api dan almalıyız.bunun için window.location ile tarayıcı ile tarayıcı path ini izleyip karar veririz.
document.addEventListener("DOMContentLoaded", async () => {

// >Sepet verisine eriş
let cart = getFromLocalStorage()



  // tarayıcıda hangi sayfadayız kontrol et.eğer
  if (window.location.pathname.includes("cart.html")) {
    //Cart sayfası
    console.log("Cart Sayfası");

    renderCartItems();
    displayCartTotal();
  } else {
    // Ana sayfa
    console.log("Ana Sayfa");
    const product = await fetchProducts();

    renderProducts(product, (event) => {
      addToCart(event, product);
    });
  }

  // Sepet Iconunu güncelle
  updateCartIcon(cart);
});

//Eğer anasayfadaysak bize ürünleri getirsin
