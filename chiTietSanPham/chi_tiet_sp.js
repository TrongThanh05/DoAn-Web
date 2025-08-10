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

// Lắng nghe sự kiện click trên danh sách sản phẩm
document.querySelector('.main__product').addEventListener('click', (event) => {
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
    const Img = productItem.querySelector('img').getAttribute('src');
    const Quantity = parseInt(
      productItem.querySelector('#productQuantity').textContent
    );
    // Kiểm tra tên và giá có hợp lệ không và thêm sản phẩm vào giỏ hàng
    if (Name && Price && Quantity && Img) {
      addToPayment(Name, Price, Quantity, Img);
      window.location.href = '../html/thanhtoan.html';
    } else {
      console.log('not attribute');
    }
  }
  function addToCartBadge() {
    // Kiểm tra nếu nút thêm giỏ hàng được nhấn
    const addCart = event.target.closest('.add-shoppingCart');
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
