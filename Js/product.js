//ÜRÜNLERİ APİ DAN ALAN FONKSİYON
export const fetchProducts = async () => {
  try {
    const response = await fetch("db.json");
    console.log(response);
    //eğer hata yoksa veriyi dönüştür
    if (!response.ok) {
      throw new Error("Yanlış URL");
    }

    return await response.json();
  } catch (error) {
    console.log(`Hata: ${error}`);
    return [];
  }
};

//ÜRÜNLERİ RENDER EDEN FONKSİYON

export const renderProducts = (products, addToCartCallBack) => {
  //Ürünlerin render edileceği kapsamı html den çekme
  const productList = document.querySelector("#product-list");
  //Html içeriğini oluştur
  productList.innerHTML = products
    .map(
      (product) =>
        ` 
    <div class="product">
            <img src="${product.image}" alt="product-img" class="product-img">
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">$${product.price}</p>
                <a class="add-to-cart"data-id='${product.id}' >Add to cart</a>
            </div>
        </div>
  `
    )
    .join("");
  // products bir dizi.Dizi elemanları virgül ile ayrılır.Biz burada elemanları boşluk ile ayırmasını söyledik.

  // Add to cart butonlarını seç
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  // her bir butonu seç
  for (let i = 0; i < addToCartButtons.length; i++) {
    // button collection içerisinden her buton a eriş
    const addToCartButton = addToCartButtons[i];

    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
