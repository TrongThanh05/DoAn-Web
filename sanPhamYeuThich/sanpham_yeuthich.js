let heartProducts;
try {
  heartProducts = JSON.parse(localStorage.getItem('heartProducts')) || [];
} catch (error) {
  console.error('Lỗi khi đọc giỏ hàng từ localStorage:', error);
  heartProducts = [];
}
console.log(heartProducts);
const allProduct = document.querySelector('.main__productList');
heartProducts.forEach((product) => {
  const formattedPrice =
    new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';
  const item = document.createElement('div');
  item.className = 'main__productsList-item col-12 col-sm-6 col-md-4 col-lg-3';
  item.setAttribute('data-id', product.id);
  item.setAttribute('data-type', product.type);
  item.setAttribute('data-price', product.price);

  item.innerHTML = `
        <div class="product__img">
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${
            product.type
          }&id=${product.id}" class="product__imgLink">
            <img class="img-fluid" src="${product.images[0]}" alt="${
    product.alt
  }" />
          </a>
          <button class="product__img-addCartBadge">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
        <div class="product__info">
          <div class="product__info-top">
            <h5>4Bros</h5>
            <div class="product__info-loveIcon">
              <i class="loveIcon__icon fa-solid fa-heart"></i>
              <span class="loveIcon__text">Bỏ yêu thích</span>
            </div>
          </div>
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${
            product.type
          }&id=${product.id}" class="productName">${product.name}</a>
          <p>${product.price.toLocaleString('vi-VN') + ' ₫'}</p>
        </div>
        <a href="../chiTietSanPham/chiTietSanPham.html?type=${
          product.type
        }&id=${product.id}" class="product__buyNow">Mua ngay</a>
    `;
  allProduct.appendChild(item);

  // Gán sự kiện xóa cho mỗi sản phẩm
  const loveIcon = item.querySelector('.loveIcon__icon');
  loveIcon.addEventListener('click', () => {
    // Tìm tên sản phẩm trong DOM
    const productName = item.querySelector('.productName').textContent;
    // Tìm sản phẩm trong heartProducts
    const productItemId = item.dataset.id;
    const productItemType = item.dataset.type;

    console.log(productName, productItemId, productItemType, heartProducts);
    const index = heartProducts.findIndex(
      (product) =>
        product.id == productItemId && product.type == productItemType
    );
    if (index !== -1) {
      heartProducts.splice(index, 1); // Xóa sản phẩm khỏi mảng
      // Lưu lại vào localStorage
      localStorage.setItem('heartProducts', JSON.stringify(heartProducts));
      // Cập nhật badge hiển thị số lượng sản phẩm
      updateHeartBadge(heartProducts);
      // Ẩn sản phẩm trong danh sách
      item.style.display = 'none';
      alert(`📤 Đã xóa thành công ${productName} ra khỏi danh sách yêu thích`);
    } else {
      alert('Không tìm thấy sản phẩm yêu thích');
    }
  });
});
