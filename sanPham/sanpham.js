const container = document.getElementById('ProductsGrid');

function renderProducts(productArray) {
  productArray.forEach((product) => {
    const productHTML = `
      <div class="main__productsList-item col-12 col-sm-6 col-md-4 col-lg-3" 
           id="${product.id}" 
           type="${product.type}">
        <div class="product__img">
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${product.type}&id=${product.id}" class="product__imgLink">
            <img class="img-fluid" src="${product.images[0]}" alt="${product.alt}" />
          </a>
          <button class="product__img-addCartBadge">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
        <div class="product__info">
          <div class="product__info-top">
            <h5>${product.brand}</h5>
            <div class="product__info-loveIcon">
              <i class="loveIcon__icon fa-regular fa-heart"></i>
              <span class="loveIcon__text">Yêu thích</span>
            </div>
          </div>
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${product.type}&id=${product.id}" id="productName">${product.name}</a>
          <p>${product.price}đ</p>
        </div>
        <a href="../chiTietSanPham/chiTietSanPham.html?type=${product.type}&id=${product.id}" class="product__buyNow">Mua ngay</a>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', productHTML);
  });
}

// thêm vào trang
// Lấy tên file từ URL (vd: ao.html → "ao")
const pageName = window.location.pathname
  .split('/')
  .pop()
  .split('.')[0]
  .toLowerCase();

console.log(pageName); // "ao", "quan", "giay"...
if (pageName == 'sanpham') {
  renderProducts(shirts);
  renderProducts(pants);
  renderProducts(shoes);
} else if (pageName == 'ao') {
  renderProducts(shirts);
} else if (pageName == 'quan') {
  renderProducts(pants);
} else if (pageName == 'giay') {
  renderProducts(shoes);
}

// Hàm để thêm sản phẩm vào mục sản phẩm yêu thích
function addHeartBadge(productName, productPrice, productSrcImg, productLink) {
  // Lấy giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng rỗng
  const heartProducts = JSON.parse(localStorage.getItem('heartProducts')) || [];

  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const existingProduct = heartProducts.find(
    (item) => item.name === productName
  );

  if (existingProduct) {
    // Nếu đã có thì
    alert(`${productName} đã nằm trong danh sách yêu thích💡`);
    return;
  } else {
    // Nếu chưa có, thêm sản phẩm mới
    heartProducts.push({
      name: productName,
      price: productPrice,
      img: productSrcImg,
      link: productLink,
    });
  }

  // Lưu lại vào localStorage
  localStorage.setItem('heartProducts', JSON.stringify(heartProducts));

  // Cập nhật badge hiển thị số lượng sản phẩm
  // Hàm này ở bên header.js vì trang nào cũng có header
  updateHeartBadge(heartProducts);
}
// Thêm sản phẩm yêu thích
const loveItems = document.querySelectorAll('.product__info-loveIcon');
const heartProducts = JSON.parse(localStorage.getItem('heartProducts')) || [];
loveItems.forEach((item) => {
  const loveIcon = item.querySelector('.loveIcon__icon');
  const textIcon = item.querySelector('.loveIcon__text');
  // Đổi trái tym và text khi click vào
  loveIcon.addEventListener('click', () => {
    let heartProducts = JSON.parse(localStorage.getItem('heartProducts')) || [];
    if (loveIcon.classList.contains('fa-regular')) {
      const productItem = loveIcon.closest('.main__productsList-item');
      // Lấy tên, giá, ảnh, đường link của sản phẩm
      const productName = productItem.querySelector('#productName')?.innerText;
      const productPrice = parseInt(productItem.dataset.price);
      const productLink = productItem
        .querySelector('.product__imgLink')
        .getAttribute('href');
      const productSrcImg = productItem
        .querySelector('img')
        .getAttribute('src');

      if (productName || productPrice || productSrcImg || productLink) {
        addHeartBadge(productName, productPrice, productSrcImg, productLink);
        // sửa trái tym và text khi thêm
        loveIcon.classList.remove('fa-regular');
        loveIcon.classList.add('fa-solid');
        loveIcon.style.color = 'red';
        textIcon.innerText = 'Bỏ Yêu thích'; // Thay đổi văn bản tương ứng
      } else {
        alert(`Không lấy được thông tin sản phẩm`);
      }
    } else {
      loveIcon.classList.remove('fa-solid');
      loveIcon.classList.add('fa-regular');
      loveIcon.style.color = '#333';
      textIcon.innerText = 'Yêu thích'; // Thay đổi văn bản tương ứng

      const productItem = loveIcon.closest('.main__productsList-item');
      // Lấy tên, giá, ảnh, đường link của sản phẩm
      const productName = productItem.querySelector('#productName').innerText;

      let index = heartProducts.findIndex(
        (product) => product.name === productName
      );
      if (index !== -1) {
        heartProducts.splice(index, 1);
        // Lưu lại vào localStorage
        localStorage.setItem('heartProducts', JSON.stringify(heartProducts));
        // Cập nhật badge hiển thị số lượng sản phẩm
        updateHeartBadge(heartProducts);
      } else {
        alert(`Không tìm thấy sản phẩm yêu thích`);
      }
    }
  });
});

// Hàm để thêm sản phẩm vào giỏ hàng
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
  .querySelector('.main__productsList-all')
  .addEventListener('click', (event) => {
    // Kiểm tra nếu nút thêm giỏ hàng được nhấn
    const button = event.target.closest('.product__img-addCartBadge');
    if (!button) return;

    // Lấy thông tin sản phẩm từ DOM
    const productItem = button.closest('.main__productsList-item');
    if (!productItem) return;

    const productName = productItem.querySelector('#productName')?.innerText;
    const productPrice = parseInt(productItem.dataset.price);
    const productImg = productItem.querySelector('img').getAttribute('src');
    // Kiểm tra tên và giá có hợp lệ không và thêm sản phẩm vào giỏ hàng
    if (productName && productPrice && productImg) {
      addToCart(productName, productPrice, productImg);
    }
  });

// Hiển thị sản phẩm theo theo giá
function hiddenAllProduct(condition) {
  document.querySelectorAll('.main__productsList-item').forEach((item) => {
    const price = Number(item.dataset.price);
    if (condition === 'under100') {
      if (price < 100000) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    } else {
      if (condition === '100-200') {
        if (price < 200000 && price >= 100000) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      } else {
        if (condition === '200-300') {
          if (price < 300000 && price >= 200000) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        } else {
          if (condition === '300-500') {
            if (price < 500000 && price >= 300000) {
              item.style.display = 'flex';
            } else {
              item.style.display = 'none';
            }
          } else {
            if (condition === 'over500') {
              if (price >= 500000) {
                item.style.display = 'flex';
              } else {
                item.style.display = 'none';
              }
            } else {
              item.style.display = 'flex';
            }
          }
        }
      }
    }
  });
}
document.querySelectorAll('.price').forEach((box) => {
  box.addEventListener('change', () => {
    const isChecked = box.checked;
    if (isChecked) {
      hiddenAllProduct(box.value);
    } else {
      document.querySelectorAll('.main__productsList-item').forEach((item) => {
        item.style.display = 'flex';
      });
    }
  });
});
