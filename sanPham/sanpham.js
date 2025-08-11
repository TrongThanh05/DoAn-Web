// Lấy khung chứa của các sản phẩm
const container = document.getElementById('ProductsGrid');

// Lấy tên file từ URL (vd: ao.html → "ao")
const pageName = window.location.pathname
  .split('/')
  .pop()
  .split('.')[0]
  .toLowerCase();

// Tạo 1 array tổng hợp sản phẩm từ 3 array kia khi ở trong trang sản phẩm
const productArray = [];
const products = (shirts, pants, shoes) => {
  const maxLength = Math.max(shirts.length, pants.length, shoes.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < shirts.length) {
      productArray.push(shirts[i]);
    }
    if (i < pants.length) {
      productArray.push(pants[i]);
    }
    if (i < shoes.length) {
      productArray.push(shoes[i]);
    }
  }
};
products(shirts, pants, shoes);

// function thêm sản phẩm vào khung theo array có sẵn trong file wareHouse.js
function renderProducts(productArray, type) {
  productArray.forEach((product) => {
    const productHTML = `
      <div class="main__productsList-item col-12 col-sm-6 col-md-4 col-lg-3" 
           id="${product.id}" 
           type="${type}">
        <div class="product__img">
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${type}&id=${product.id}" class="product__imgLink">
            <img class="img-fluid" src="${product.images[0]}" alt="${product.alt}" />
          </a>
          <button class="product__img-addCartBadge">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
        <div class="product__info">
          <div class="product__info-top">
            <h5>4Bros</h5>
            <div class="product__info-loveIcon">
              <i class="loveIcon__icon fa-regular fa-heart"></i>
              <span class="loveIcon__text">Yêu thích</span>
            </div>
          </div>
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${type}&id=${product.id}" id="productName">${product.name}</a>
          <p>${product.price}đ</p>
        </div>
        <a href="../chiTietSanPham/chiTietSanPham.html?type=${type}&id=${product.id}" class="product__buyNow">Mua ngay</a>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', productHTML);
  });
}
// Xử lý chuyển trang trong 1 mục sản phẩm
let pageNumberNow = 1;
const itemsPerPage = 9;

//Chuyển trang
function switchPage(page) {
  container.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  let productArrayPerPage = [];

  // check trang hiện tại là gì
  if (pageName == 'sanpham') {
    productArrayPerPage = productArray.slice(start, end);
  } else if (pageName == 'ao') {
    productArrayPerPage = shirts.slice(start, end);
  } else if (pageName == 'quan') {
    productArrayPerPage = pants.slice(start, end);
  } else if (pageName == 'giay') {
    productArrayPerPage = shoes.slice(start, end);
  }

  renderProducts(productArrayPerPage);
}

// Tổng số trang và thêm số lượng button theo số lượng đó
let pageNumberTotal = 0;
function addButtonNumber(page) {
  if (pageName == 'sanpham') {
    pageNumberTotal = Math.ceil(productArray.length / itemsPerPage);
  } else if (pageName == 'ao') {
    pageNumberTotal = Math.ceil(shirts.length / itemsPerPage);
  } else if (pageName == 'quan') {
    pageNumberTotal = Math.ceil(pants.length / itemsPerPage);
  } else if (pageName == 'giay') {
    pageNumberTotal = Math.ceil(shoes.length / itemsPerPage);
  }

  if (pageNumberTotal < 1) pageNumberTotal = 1; // đảm bảo tối thiểu 1 trang

  const buttonQuanity = document.getElementById('pageNumberTotal');
  let pageNumberHtml = '';

  console.log('pageNumberTotal =', pageNumberTotal);
  for (let i = 1; i <= pageNumberTotal; i++) {
    pageNumberHtml += `<button value="${i}" class="page-btn">${i}</button>`;
  }

  if (buttonQuanity) {
    buttonQuanity.innerHTML = pageNumberHtml;
  }
  highlightActivePage(page);
}
//Css cho nút trang
function highlightActivePage(pageNumber) {
  // Xóa hết class active của tất cả các nút trước
  document.querySelectorAll('.page-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Thêm class active cho nút có value tương ứng pageNumber
  const activeBtn = document.querySelector(`.page-btn[value="${pageNumber}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Quy định số sản phẩm 1 trang khi load trang
window.addEventListener('load', () => {
  addButtonNumber(pageNumberNow);
  switchPage(pageNumberNow);
});

// document.getElementById('pageNumber').addEventListener('click', () => {
//   console.log(this.);
// });
const buttonQuanity = document.getElementById('pageNumberTotal');

buttonQuanity.addEventListener('click', (e) => {
  if (e.target.classList.contains('page-btn')) {
    let page = parseInt(e.target.value);
    pageNumberNow = page;
    switchPage(pageNumberNow);
    highlightActivePage(pageNumberNow);
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (pageNumberNow > 1) {
    pageNumberNow--;
    switchPage(pageNumberNow);
    highlightActivePage(pageNumberNow);
  }
});

document.getElementById('next').addEventListener('click', () => {
  console.log(pageNumberTotal);
  if (pageNumberNow < pageNumberTotal) {
    pageNumberNow++;
    switchPage(pageNumberNow);
    highlightActivePage(pageNumberNow);
  }
});

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
