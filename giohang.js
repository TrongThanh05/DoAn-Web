let products;
try {
  products = JSON.parse(localStorage.getItem('cartItems')) || [];
} catch (error) {
  console.error('Lỗi khi đọc giỏ hàng từ localStorage:', error);
  products = [];
}

const productList = document.querySelector('.product-list');
const totalAmountElement = document.getElementById('totalAmount');
let totalAmount = 0;

if (!productList || !totalAmountElement) {
  console.error('Không tìm thấy các phần tử cần thiết trong DOM.');
  return;
}

if (products.length === 0) {
  productList.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
} else {
  products.forEach((product, index) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
                    <input type="checkbox" class="product-checkbox" data-price="${
                      product.price
                    }" data-quantity="${product.quantity}">
                    <div class="product-details">
                        <h3>${product.name} (x${product.quantity})</h3>
                        <p>Giá: ${product.price.toLocaleString()} VNĐ</p>
                        <button class="remove-product" data-index="${index}">Xóa</button>
                    </div>
                `;
    productList.appendChild(productItem);
  });
}

const updateTotalAmount = () => {
  totalAmount = Array.from(
    document.querySelectorAll('.product-checkbox:checked')
  ).reduce((sum, checkbox) => {
    const price = parseInt(checkbox.dataset.price);
    const quantity = parseInt(checkbox.dataset.quantity);
    return sum + price * quantity;
  }, 0);
  totalAmountElement.innerText = isNaN(totalAmount)
    ? '0'
    : totalAmount.toLocaleString();
};

document.querySelectorAll('.product-checkbox').forEach((checkbox) => {
  checkbox.addEventListener('change', updateTotalAmount);
});

document.querySelectorAll('.remove-product').forEach((button) => {
  button.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    products.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(products));
    location.reload();
  });
});
