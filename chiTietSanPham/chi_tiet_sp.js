// Nhận dữ liệu từ trang trước đó
// Lấy query từ URL
const params = new URLSearchParams(window.location.search);
const type = params.get('type');
const id = params.get('id');
console.log(type, id); // "shirt", "123"

// Lấy object sản phẩm theo type và id
function getDataByIdAndType() {
  if (type === 'shirts') {
    return shirts.find((shirt) => shirt.id == id);
  }
  if (type === 'pants') {
    return pants.find((pants) => pants.id == id);
  }
  if (type === 'shoes') {
    return shoes.find((shoes) => shoes.id == id);
  }
}
const productObject = getDataByIdAndType();
console.log(productObject);

// Thêm ảnh sản phẩm
const mainImage = document.getElementById('mainImage'); // Ảnh lớn
const subImageStock = document.getElementById('subImageStock'); //Kho ảnh nhỏ dưới ảnh lớn
function renderImages() {
  mainImage.setAttribute('src', productObject.images[0]);
  mainImage.setAttribute('alt', productObject.name);

  for (let i = 1; i < productObject.images.length; i++) {
    let subImageHtml = '';
    subImageHtml = `<img src="${productObject.images[i]}" alt="" />`;
    subImageStock.insertAdjacentHTML('beforeend', subImageHtml);
  }
}
renderImages();
// Tạo hàm thêm phần thông tin và chức năng sản phẩm
const productInformation = document.getElementById('productInformation');
function renderProductInfor() {
  productInformation.innerHTML = `<div class="product__info-title">
            <h2 id="productName">${productObject.name}</h2>
          </div>
          <p>
            <b>Giá :</b>
            <span id="productPrice" class="info-price">${
              productObject.price
            }</span>
          </p>
          <p><b>Tình trạng :</b> <span class="info-status">${
            productObject.stock > 0 ? 'Còn hàng' : 'Hết hàng'
          }</span></p>
          <p><b>Mã :</b> <span class="info-code">${
            productObject.type.toString().toUpperCase() +
            '-' +
            productObject.id.toString().toUpperCase()
          }</span></p>
          <div class="info-promotion">
            <h3>🎁 KHUYẾN MÃI - ƯU ĐÃI</h3>
            <ul>
              <li>Đổi trả nếu sản phẩm lỗi bất kì</li>
              <li>Đồng giá ship toàn quốc 30k</li>
              <li>Khuyến mãi trực tiếp trên giá sản phẩm</li>
              <li>Hỗ trợ trả lời thắc mắc qua Fanpage chính thức</li>
            </ul>
          </div>
          <div class="product__info-color">
            <b>Màu</b>
            <div class="color-box">
              <img 
                src="${productObject.images[0]}"
                class="colorProduct"
              ></img>
              <img
                src="${productObject.images[1]}"
                class="colorProduct"
              ></img>
              <img
                src="${productObject.images[2]}"
                class="colorProduct"
              ></img>
            </div>
          </div>
          <div class="product__info-size">
            <b>Size</b>
            <div class="size-button">
              <button>${productObject.sizes[0]}</button>
              <button>${productObject.sizes[1]}</button>
              <button>${productObject.sizes[2]}</button>
              <button>${productObject.sizes[3]}</button>
            </div>
          </div>
          <div class="product__info-add">
            <div class="add-quantity">
              <button id="descQuantity">-</button>
              <p id="productQuantity">1</p>
              <button id="incrQuantity">+</button>
            </div>
            <button class="add-shoppingCart" id="addShopCart">Thêm vào giỏ hàng</button>
          </div>
          <button class="info-buyNow" id="buyNow"
            ><b>MUA NGAY</b>
            <span>Gọi điện xác nhận và giao dịch tận nơi</span></button
          >`;
}
renderProductInfor();
// Thêm chi tiết sản phẩm
const productDetail = document.getElementById('productDetail');
function renderProductDetail() {
  productDetail.innerHTML = `
    <li><strong>Chất liệu : </strong>lông, bông</li>
    <li><strong>Loại da : </strong>da Trâu</li>
    <li><strong>Mô tả : </strong>${productObject.description}</li>
    <li><strong>Số lượng tồn kho : </strong>${productObject.stock}</li>
    <li><strong>Xuất xứ : </strong>Việt Nam</li>
    <li><strong>Thương hiệu : </strong>${productObject.brand}</li>
    <li><strong>Kiểu áo : </strong>${productObject.category}</li>
    <li><strong>Chất lượng in : </strong>in lụa dùng mực Nhật Bản chất lượng cao</li>
    <li><strong>Bảo quản : </strong>có thể giặt máy hoặc giặt tay</li>`;
}
renderProductDetail();

const similarProducts = document.getElementById('similarProducts');
function renderSimilarProducts() {
  const data = {
    shirts,
    pants,
    shoes,
  };
  let name = productObject.type;
  const arrayProductNow = data[name];
  for (let i = 0; i < 4; i++) {
    if (arrayProductNow[i].id == productObject.id) continue;
    else {
      const productHTML = `
      <div class="similarProducts col-12 col-sm-6 col-md-6 col-lg-3"
              
           data-id="${arrayProductNow[i].id}" 
           data-type="${arrayProductNow[i].type}"
          data-price="${arrayProductNow[i].price}">
        <div class="similarProducts__img">
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${
            arrayProductNow[i].type
          }&id=${arrayProductNow[i].id}" class="similarProducts__imgLink">
            <img class="img-fluid" style="width: 150px; height: auto;" src="${
              arrayProductNow[i].images[0]
            }" alt="${arrayProductNow[i].alt}" />
          </a>
        </div>
        <div class="similarProducts__info">
          <h5>4Bros</h5>
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${
            arrayProductNow[i].type
          }&id=${arrayProductNow[i].id}" class="productName">${
        arrayProductNow[i].name
      }</a>
          <p>${arrayProductNow[i].price.toLocaleString('vi-VN') + ' ₫'}</p>
        </div>
      </div>
    `;
      similarProducts.insertAdjacentHTML('beforeend', productHTML);
    }
  }
}
// renderSimilarProducts();

// Xử lý sự kiện tăng, giảm số lượng
const incrQuantity = document.getElementById('incrQuantity');
const descQuantity = document.getElementById('descQuantity');
const productQuantity = document.getElementById('productQuantity');
let quantity = parseInt(productQuantity.textContent) || 0;

incrQuantity.addEventListener('click', () => {
  if (quantity >= 0) {
    quantity++;
    productQuantity.innerText = quantity;
  }
});
descQuantity.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    productQuantity.innerText = quantity;
  }
});

// Thêm sản phẩm vào localStorage
function addToPayment(Name, Price, Quantity, Img) {
  // Lấy giỏ hàng cần trả từ localStorage hoặc khởi tạo giỏ hàng rỗng
  paymentProducts = JSON.parse(localStorage.getItem('paymentProducts')) || [];
  // Thêm sản phẩm vào paymentProducts
  if (Quantity === 0) alert('🔔 Vui lòng thêm số lượng sản phẩm');
  else {
    paymentProducts.push({
      name: Name,
      price: Price,
      quantityProduct: Quantity,
      img: Img,
    });

    // Lưu lại vào localStorage
    localStorage.setItem('paymentProducts', JSON.stringify(paymentProducts));
    // Hiển thị thông báo
    alert(`🛒 ${Quantity} sản phẩm: ${Name} đã được xác nhận ✅`);
  }
}
// Thêm vào giỏ
function addToCart(productName, productPrice, productImg) {
  // Lấy giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng rỗng
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const existingProduct = cartItems.find((item) => item.name === productName);

  if (existingProduct) {
    // Nếu đã có, tăng số lượng
    existingProduct.quantity += 1;
  } else {
    // Nếu chưa có, thêm sản phẩm mới
    cartItems.push({
      name: productName,
      price: productPrice,
      quantity: 1,
      img: productImg,
    });
  }
  // Lưu lại vào localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Cập nhật badge hiển thị số lượng sản phẩm
  // Hàm này ở bên header.js vì trang nào cũng có header
  updateCartBadge(cartItems);

  // Hiển thị thông báo
  alert(`🛒 ${productName} đã được thêm vào giỏ hàng ✅`);
}

// Lắng nghe sự kiện click trên danh sách sản phẩm
document
  .getElementById('productInformation')
  .addEventListener('click', (event) => {
    function buyNow() {
      // Kiểm tra nếu nút thêm giỏ hàng được nhấn
      const button = event.target.closest('.info-buyNow');
      if (!button) {
        console.error('not a button');
        return;
      }
      // Lấy thông tin sản phẩm từ DOM
      const productItem = button.closest('.main__product-info');
      if (!productItem) {
        console.error('not a product');
        return;
      }
      const Name = productItem.querySelector('#productName')?.innerText;
      const Price = productItem
        .querySelector('#productPrice')
        ?.innerText.replace(/[^\d]/g, '');
      const Img = document.getElementById('mainImage').getAttribute('src');
      const Quantity = parseInt(
        productItem.querySelector('#productQuantity').textContent
      );
      // Kiểm tra tên và giá có hợp lệ không và thêm sản phẩm vào giỏ hàng
      if (Name && Price && Quantity && Img) {
        addToPayment(Name, Price, Quantity, Img);
        window.location.href = '../thanhToan/thanhtoan.html';
      } else {
        console.log('not attribute');
      }
    }
    function addToCartBadge() {
      // Kiểm tra nếu nút thêm giỏ hàng được nhấn
      const addCart = event.target.closest('#addShopCart');
      if (!addCart) {
        console.error('not a addCart');
        return;
      }
      // Lấy thông tin sản phẩm từ DOM
      const productItem = addCart.closest('.main__product-info');
      if (!productItem) {
        console.error('not a product');
        return;
      }
      const Name = productItem.querySelector('#productName')?.innerText;
      const Price = productItem
        .querySelector('#productPrice')
        ?.innerText.replace(/[^\d]/g, '');
      const Img = productItem.querySelector('img').getAttribute('src');
      // Kiểm tra tên và giá có hợp lệ không và thêm sản phẩm vào giỏ hàng
      if (Name && Price && Img) {
        addToCart(Name, Price, Img);
      } else {
        console.log('not attribute');
      }
    }
    buyNow();
    addToCartBadge();
  });
