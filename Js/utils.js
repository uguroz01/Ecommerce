//Localstorage a ekleme yapacak fonksiyon

export const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Localstorega dan verileri alan fonksiyon

export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  //Eğer data varsa bunu json.parse ile dönüştür ve return et data yoksa bunun yerine boş dizi return et
  return data ? JSON.parse(data) : [];
};

// Sepet toplamını bulan fonksiyon

export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // sum biriken miktar item ise aktif eleman
};

// ! reduce metodu bir dizideki tüm elemanların üzerinden bir işlem gerçekleştirerek bir değer döndürür.ilk parametre olarak bir callback funcktion ister.ikinci değer olarak bir başlangıç değeri ister.

// Sepet iconunu güncelleyen fonksiyon

export const updateCartIcon = (cart) => {
  //Sepet iconuna ve quantity değerine eriş
  const cartIcon = document.querySelector("#cart-icon");
  const i = document.querySelector(".bxs-shopping-bag");

  // sepetteki toplam ürün sayısına eriş
  let totalQuantity = cart.reduce((sum, item) => {
   return sum + item.quantity;
  }, 0);

  // Sepet iconunun yanındaki quantity değerini güncelle
  i.setAttribute("data-quantity", totalQuantity);

};
