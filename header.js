// thoát khỏi menu ở màn hình mobile
const exitMenu = document.getElementById('exitMenu');
const barIcon = document.getElementById('barIcon');
const headerMenu = document.getElementById('header__menuMobile');
barIcon.addEventListener('click', () => {
  headerMenu.style.display = 'flex';
  headerMenu.style.flexDirection = 'column';
  barIcon.style.display = 'none';
});
exitMenu.addEventListener('click', () => {
  headerMenu.style.display = 'none';
  barIcon.style.display = 'block';
});

// Xử lý việc tính tổng số lượng sản phẩm và cập nhật badge hiển thị. Hàm này được gọi khi thêm sản phẩm hoặc khi tải trang.
function updateCartBadge(cartItems) {
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.innerText = totalQuantity;
  }
}

// Xử lý tổng số lượng sản phẩm yêu thích và khi reset trang sẽ cập nhật
function updateHeartBadge(heartProducts) {
  const totalQuantity = heartProducts.length;

  const heartBadge = document.getElementById('heart-badge');
  if (heartBadge) {
    heartBadge.innerText = totalQuantity;
  }
}

// Cập nhật badge khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const heartProducts = JSON.parse(localStorage.getItem('heartProducts')) || [];
  updateCartBadge(cartItems);
  updateHeartBadge(heartProducts);
});

let notificationOfShop;
try {
  notificationOfShop =
    JSON.parse(localStorage.getItem('notificationOfShop')) || [];
} catch (error) {
  console.error('Lỗi khi đọc giỏ hàng từ localStorage:', error);
  notificationOfShop = [];
}
let numberOfNoti = 0;

// Lấy thông tin sản phẩm đã thanh toán rồi đưa vào thông báo.
notificationOfShop.forEach((productPayed) => {
  numberOfNoti++;
  const allNotification = document.querySelector('.allNotification');
  const notice = document.createElement('a');
  notice.classList.add('notification');
  notice.innerHTML = `
  <img src="${productPayed.img}" />
  <div style="display: flex; flex-direction: column; gap: 5px">
    <b>
      Bạn vừa đặt hàng sản phẩm:
      <span id="orderName">${productPayed.name}</span>
      🛒
    </b>
    <p>
      Số lượng: x<span id="orderQuantity">${
        productPayed.quantity
      }</span> Số tiền:
      <span id="orderPrice">${(
        productPayed.price * productPayed.quantity
      ).toLocaleString()}</span>
    </p>
  </div>`;
  allNotification.appendChild(notice);
});

// Chỉnh sửa số lượng thông báo
document.getElementById('noti-badge').innerText = numberOfNoti;

// Hiện ra và thu gọn thanh thông báo
const showAllNotice = document.getElementById('showAllNotice');
showAllNotice.addEventListener('click', () => {
  const allNotification = document.querySelector('.allNotification');
  if (showAllNotice.textContent === 'Xem tất cả') {
    allNotification.style.height = '450px';
    showAllNotice.innerText = 'Rút gọn thông báo';
  } else if (showAllNotice.textContent === 'Rút gọn thông báo') {
    allNotification.style.height = '225px';
    showAllNotice.innerText = 'Xem tất cả';
  }
});

// xóa hết thông báo
document.getElementById('deleteAllNoti').addEventListener('click', () => {
  document.querySelectorAll('.notification').forEach((notice) => {
    notice.style.display = 'none';
  });
  // xóa trong localStorage
  localStorage.removeItem('notificationOfShop');
  document.getElementById('noti-badge').innerText = 0;
});
