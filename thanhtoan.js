let paymentProducts;
try {
  paymentProducts = JSON.parse(localStorage.getItem('paymentProducts')) || [];
} catch (error) {
  console.error('Lỗi khi đọc giỏ hàng từ localStorage:', error);
  paymentProducts = [];
}

if (paymentProducts.length > 0) {
  let product = paymentProducts[0]; // Lấy sản phẩm đầu tiên (index 0)
  let quantityText = product.quantityProduct
    ? 'x' + product.quantityProduct
    : 'Không có số lượng';
  let Price = new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';
  // Hiển thị thông tin sản phẩm lên trang
  document.getElementById('productName').innerText =
    product.name || 'Không có tên sản phẩm';
  document.getElementById('productPrice').innerText = '+ ' + Price;
  document.getElementById('quantityProduct').innerText = quantityText;
  document
    .querySelector('.main__inforOrder-product img')
    .setAttribute('src', product.img);
  // xóa sản phẩm khỏi localStorage sau khi thanh toán
  localStorage.removeItem('paymentProducts');
} else {
  console.log('Giỏ hàng trống');
}
console.log(paymentProducts);
//Tính tổng số tiền mà người mua cần thanh toán
function isTotalPrice() {
  const amountOfProduct =
    parseInt(
      document.getElementById('productPrice').innerText.replace(/[^\d]/g, '')
    ) || 0;
  const quantityProduct =
    parseInt(
      document.getElementById('quantityProduct').innerText.replace(/[^\d]/g, '')
    ) || 0;
  const amountOfShippingFee =
    parseInt(
      document.getElementById('shippingFee').innerText.replace(/[^\d]/g, '')
    ) || 0;
  const amountOfDiscountCodePrice =
    parseInt(
      document
        .getElementById('discountCodePrice')
        .innerText.replace(/[^\d]/g, '')
    ) || 0;
  const totalAmount =
    amountOfProduct * quantityProduct +
    amountOfShippingFee -
    amountOfDiscountCodePrice;
  // gán 1 biến mang giá trị kiểu : 100,000đ
  const formattedAmount =
    new Intl.NumberFormat('vi-VN').format(totalAmount) + 'đ';
  document.getElementById('totalAmount').innerText = formattedAmount;
}
isTotalPrice();

// Mảng mã giảm giá và số tiền được giảm nếu nhập vào!
const discountCodeArray = [
  { code: 'abcd', discount: '40000' },
  { code: 'NguyenTrongThanh', discount: '30000' },
  { code: 'NguyenVietNghia', discount: '30000' },
  { code: 'NguyenVanCuong', discount: '30000' },
  { code: 'LeDinhAnh', discount: '30000' },
];

// Xử lý mã giảm giá và giảm số tiền đúng với mã
document.getElementById('applyDiscountCode').addEventListener('click', () => {
  const code = document.getElementById('discountCode').value.trim(); // Lấy mã của người nhập mà không có khoảng trắng bằng trim()
  let check = false; //Dùng để thông báo Nhập thành công hay thất bại
  // chạy for để kiểm tra có đúng mã không
  for (let i = 0; i < discountCodeArray.length; i++) {
    if (code == discountCodeArray[i].code) {
      check = true;
      let discountAmount = Number(discountCodeArray[i].discount); // Lấy số tiền được giảm khi nhập mã
      const formattedAmount =
        new Intl.NumberFormat('vi-VN').format(discountAmount) + 'đ';
      alert(`Nhập mã thành công và được giảm ${formattedAmount}`);
      document.getElementById('discountCodePrice').innerText =
        '- ' + formattedAmount;
      isTotalPrice();
      break;
    }
  }
  if (!check) {
    alert('Mã giảm giá không chính xác');
  }
});

// Chọn phương thức vận chuyển với giá khác nhau
document.getElementById('shipping').addEventListener('change', () => {
  const price = document.getElementById('shipping');
  const shippingFeeProduct = document.getElementById('shippingFee');
  if (parseInt(price.value) == 25000) {
    shippingFeeProduct.innerText = '+25,000đ';
    shippingFeeProduct.value = '25000';
    isTotalPrice();
  } else {
    shippingFeeProduct.innerText = '+40,000đ';
    shippingFeeProduct.value = '40000';
    isTotalPrice();
  }
});
// chọn phương thức thanh toán
function payForOrder() {
  const cash = document.getElementById('cashPayment');
  const transfer = document.getElementById('paymentTransfer');
  const order = document.getElementById('placeAnOrder');
  cash.addEventListener('click', () => {
    document.querySelectorAll('.bankInformation').forEach((bank) => {
      bank.style.display = 'none';
    });
    order.innerText = 'Đặt hàng';
    order.value = '0';
  });
  transfer.addEventListener('click', () => {
    document.querySelectorAll('.bankInformation').forEach((bank) => {
      bank.style.display = 'flex';
    });
    order.innerText = 'Xác nhận đã chuyển khoản';
    order.value = '1';
  });
}
payForOrder();

// Thanh toán

document.getElementById('placeAnOrder').addEventListener('click', () => {
  alert(
    `🛒 Cảm ơn bạn đã tin tưởng và mua sắm cùng chúng tôi. Chúc bạn một ngày tuyệt vời và hẹn gặp lại! 🎀`
  );
  window.location.href = '../html/trangchu.html';

  // Tạo 1 cái localStorage để dùng cho hiển thị thông báo
  notificationOfShop =
    JSON.parse(localStorage.getItem('notificationOfShop')) || [];

  const productName =
    document.getElementById('productName').textContent ||
    'Không có tên sản phẩm';
  const productPrice =
    parseInt(
      document.getElementById('productPrice').textContent.replace(/[^\d]/g, '')
    ) || 0;
  const productQuantity =
    parseInt(
      document
        .getElementById('quantityProduct')
        .textContent.replace(/[^\d]/g, '')
    ) || 0;
  const productImg = document
    .querySelector('.main__inforOrder-product img')
    .getAttribute('src');
  notificationOfShop.push({
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    img: productImg,
  });
  // Lưu lại vào localStorage
  localStorage.setItem(
    'notificationOfShop',
    JSON.stringify(notificationOfShop)
  );
});
