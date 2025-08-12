const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function showLogin() {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
}

function showRegister() {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
}

showLogin();
// Lấy giá trị tham số 'type' từ URL
function getTypeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('type'); // Trả về 'login' hoặc 'register'
}
// Hiển thị form dựa trên giá trị 'type'
function showFormBasedOnType() {
  const type = getTypeFromUrl();
  if (type === 'register') {
    showRegister();
  } else {
    showLogin(); // Mặc định hiển thị form đăng nhập
  }
}

// Khi trang được tải, thực thi logic
document.addEventListener('DOMContentLoaded', showFormBasedOnType);

function showModal(message, redirectUrl) {
  const modal = document.getElementById('successModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message;
  modal.style.display = 'flex';

  // Tự động đóng modal và điều hướng sau 1,5 giây
  setTimeout(() => {
    modal.style.display = 'none';
    if (redirectUrl) {
      console.log(redirectUrl);
      window.location.assign(redirectUrl);
    }
  }, 1500);
}
function addAccount(accountName, email, phone, password) {
  const accountList = JSON.parse(localStorage.getItem('accountList')) || [];
  // Tính độ dài mảng và gán id cho account
  if (!Array.isArray(accountList)) {
    accountList = [];
  }
  const newId = accountList.length;

  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const existingAccount = accountList.find((item) => item.name == accountName);

  if (existingAccount) {
    // Nếu đã có thì
    alert(`Tên tài khoản ${accountName} đã được sử dụng`);
    return;
  } else {
    // Nếu chưa có, thêm sản phẩm mới
    accountList.push({
      AccountID: newId,
      AccountName: accountName,
      Email: email,
      Phone: phone,
      Password: password,
    });

    // Lưu lại vào localStorage
    localStorage.setItem('accountList', JSON.stringify(accountList));

    showModal('Đăng ký thành công!', `../trangchu/trangchu.html?id=${newId}`);
  }
}

function checkAccount(accountLogin, passwordLogin) {
  const accountList = JSON.parse(localStorage.getItem('accountList')) || [];

  let checkAccount = false;
  let checkPass = false;
  let foundAccount = null; //Biến lưu account để sau còn lấy id account khi đăng nhập đúng

  for (const account of accountList) {
    if (account.AccountName === accountLogin) {
      checkAccount = true;
      if (account.Password === passwordLogin) {
        checkPass = true;
        foundAccount = account; // lưu luôn account đúng
      }
      break; // tìm thấy username rồi thì dừng
    }
  }

  if (checkAccount && checkPass) {
    showModal(
      'Đăng nhập thành công!',
      `../trangchu/trangchu.html?id=${foundAccount.AccountID}`
    );
  } else {
    if (!checkAccount) {
      alert(`Tài khoản chưa tồn tại, hãy đăng ký tài khoản`);
    } else if (!checkPass) {
      alert(`Sai mật khẩu, vui lòng nhập lại`);
    }
  }

  console.log(checkAccount, checkPass);
}

document.getElementById('submitRegis').addEventListener('click', (e) => {
  e.preventDefault(); // Ngăn form submit lại
  const account = document.getElementById('regisAccount').value;
  const email = document.getElementById('regisEmail').value;
  const phone = document.getElementById('regisPhone').value;
  const password = document.getElementById('regisPassword').value;

  if (account == '' || email == '' || phone == '' || password == '')
    alert('Vui lòng nhập đầy đủ thông tin !!!');
  else addAccount(account, email, phone, password);
});
document.getElementById('submitLogin').addEventListener('click', (e) => {
  e.preventDefault(); // Ngăn form submit lại
  const accountLogin = document.getElementById('loginAccount').value;
  const passwordLogin = document.getElementById('loginPassword').value;

  if (accountLogin == '' || passwordLogin == '')
    alert('Vui lòng nhập đầy đủ thông tin !!!');
  else checkAccount(accountLogin, passwordLogin);
});
