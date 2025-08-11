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
           data-id="${product.id}" 
           data-type="${type}">
        <div class="product__img">
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${type}&id=${
      product.id
    }" class="product__imgLink">
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
              <i class="loveIcon__icon fa-regular fa-heart"></i>
              <span class="loveIcon__text">Yêu thích</span>
            </div>
          </div>
          <a href="../chiTietSanPham/chiTietSanPham.html?type=${type}&id=${
      product.id
    }" id="productName">${product.name}</a>
          <p>${product.price.toLocaleString('vi-VN') + ' ₫'}</p>
        </div>
        <a href="../chiTietSanPham/chiTietSanPham.html?type=${type}&id=${
      product.id
    }" class="product__buyNow">Mua ngay</a>
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
  console.log(productArrayPerPage);
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

// Hàm trả về mảng chứa sản phẩm ở trang hiện tại
function defineArrayOfPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  let productArrayPerPage = [];

  // check trang hiện tại và lấy mảng chứa sản phẩm ở trang hiện tại
  if (pageName == 'sanpham') {
    productArrayPerPage = productArray.slice(start, end);
  } else if (pageName == 'ao') {
    productArrayPerPage = shirts.slice(start, end);
  } else if (pageName == 'quan') {
    productArrayPerPage = pants.slice(start, end);
  } else if (pageName == 'giay') {
    productArrayPerPage = shoes.slice(start, end);
  }

  return productArrayPerPage;
}

// Khai báo biến để lưu filter hiện tại
let currentFilter = 'all';
// Function lọc dữ liệu selecter
function applyFilterAndRender() {
  // 1. Lấy sản phẩm mới của trang hiện tại
  let arrayOfPage = defineArrayOfPage(pageNumberNow);

  // 2. Lọc / sắp xếp dựa trên giá trị currentFilter
  switch (currentFilter) {
    case 'a-z':
      arrayOfPage.sort((a, b) =>
        a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' })
      );
      break;
    case 'z-a':
      arrayOfPage.sort((a, b) =>
        b.name.localeCompare(a.name, 'vi', { sensitivity: 'base' })
      );
      break;
    case 'ascending':
      arrayOfPage.sort((a, b) => a.price - b.price);
      break;
    case 'decreasing':
      arrayOfPage.sort((a, b) => b.price - a.price);
      break;
    case 'all':
    default:
      break;
  }

  console.log('This array after solving option: ', arrayOfPage, currentFilter);
  // 3. Xóa sản phẩm cũ trên giao diện
  container.innerHTML = '';
  // 4. Render sản phẩm mới
  renderProducts(arrayOfPage);
}
//Xử lý lọc dữ liệu theo checkbox giá và kích thước sản phẩm
// Hiển thị sản phẩm theo theo giá
function filterByPriceAndBrand() {
  const arrayOfPageOrigin = defineArrayOfPage(pageNumberNow);
  let arrayOfPage = arrayOfPageOrigin;
  // Lấy giá trị của các phần tử được check bằng map
  const priceChecked = Array.from(
    document.querySelectorAll('.price:checked')
  ).map((cb) => cb.value);
  const brandChecked = Array.from(
    document.querySelectorAll('.brand:checked')
  ).map((cb) => cb.value);

  console.log(priceChecked, brandChecked);

  if (priceChecked.length > 0) {
    arrayOfPage = arrayOfPage.filter((item) => {
      return priceChecked.some((priceRange) => {
        const price = item.price;
        if (priceRange === 'under100') return price < 100000;
        if (priceRange === '100-200') return price >= 100000 && price <= 200000;
        if (priceRange === '200-300') return price >= 200000 && price <= 300000;
        if (priceRange === '300-500') return price >= 300000 && price <= 500000;
        if (priceRange === 'over500') return price > 500000;
      });
    });
  }
  // Lọc theo danh mục
  if (brandChecked.length) {
    if (brandChecked.includes('Others')) {
      //Không lọc bởi vì others ở đây là các brand khác: nike, adidas, balance
      // Thì nó sẽ lấy hết tất cả sản phẩm mà được lọc qua price hoặc không lọc price
    } else {
      arrayOfPage = arrayOfPage.filter((p) => brandChecked.includes(p.brand));
    }
  }
  console.log(arrayOfPage);

  // 3. Xóa sản phẩm cũ trên giao diện
  container.innerHTML = '';
  renderProducts(arrayOfPage);
}

// Nghe sự kiện thay đổi checkbox
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('price')) {
    document.getElementById('arrange').value = 'all';
    filterByPriceAndBrand();
  }
  if (e.target.classList.contains('brand')) {
    document.getElementById('arrange').value = 'all';
    filterByPriceAndBrand();
  }
});

// Nghe sự kiện change trên select
document.getElementById('arrange').addEventListener('change', (e) => {
  // Lấy value trực tiếp từ event target
  currentFilter = e.target.value;

  // Gọi lại hàm lọc và render
  applyFilterAndRender();
});

// Xử lý sự kiện click ở các nút trang
const buttonQuanity = document.getElementById('pageNumberTotal');
buttonQuanity.addEventListener('click', (e) => {
  if (e.target.classList.contains('page-btn')) {
    let page = parseInt(e.target.value);
    pageNumberNow = page;
    switchPage(pageNumberNow);
    highlightActivePage(pageNumberNow);
    applyFilterAndRender();
    filterByPriceAndBrand();
  }
});

// Xử lý sự kiện quay lại trang trước
document.getElementById('prev').addEventListener('click', () => {
  if (pageNumberNow > 1) {
    pageNumberNow--;
    switchPage(pageNumberNow);
    highlightActivePage(pageNumberNow);
    applyFilterAndRender();
    filterByPriceAndBrand();
  }
});

// Xử lý sự kiện tới trang tiếp theo
document.getElementById('next').addEventListener('click', () => {
  console.log(pageNumberTotal);
  if (pageNumberNow < pageNumberTotal) {
    pageNumberNow++;
    switchPage(pageNumberNow);
    highlightActivePage(pageNumberNow);
    applyFilterAndRender();
    filterByPriceAndBrand();
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
