// ฟังก์ชันตรวจสอบเมื่อกด Enter
function handleEnter(event) {
    event.preventDefault(); // ป้องกันการ submit แบบปกติ
    validateForm(); // เรียกใช้ validateForm
}

// ฟังก์ชันตรวจสอบและเปลี่ยนหน้า
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    let isValid = true;

    // ตรวจสอบอีเมล
    if (!email) {
        emailError.textContent = 'โปรดป้อนอีเมลหรือหมายเลขโทรศัพท์!';
        emailError.style.display = 'block';
        isValid = false;
    } else if (email !== '06075') {
        emailError.textContent = 'อีเมลไม่ถูกต้อง!';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // ตรวจสอบรหัสผ่าน
    if (!password) {
        passwordError.textContent = 'โปรดป้อนรหัสผ่าน!';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password !== '123456789') {
        passwordError.textContent = 'รหัสผ่านไม่ถูกต้อง!';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // ถ้าข้อมูลถูกต้อง
    if (isValid) {
        window.location.href = "welcome.html"; // เปลี่ยนไปยังหน้าใหม่ทันที
    }
}

function selectProfile(profileName) {
    // สร้างหน้าต่างแบบ Custom PIN Input
    const pinContainer = document.createElement('div');
    pinContainer.classList.add('pin-container');

    pinContainer.innerHTML = `
        <div class="pin-modal">
            <h2>Enter your PIN to access this profile.</h2>
            <div class="pin-inputs">
                <input type="password" maxlength="1" id="pin1" oninput="moveToNext(this, 'pin2')" />
                <input type="password" maxlength="1" id="pin2" oninput="moveToNext(this, 'pin3')" />
                <input type="password" maxlength="1" id="pin3" oninput="moveToNext(this, 'pin4')" />
                <input type="password" maxlength="1" id="pin4" oninput="submitPIN('${profileName}')" />
            </div>
            <p class="forgot-pin">Forgot PIN?</p>
            <button class="cancel-btn" onclick="closePinModal()">Cancel</button>
        </div>
    `;

    document.body.appendChild(pinContainer);
}

function moveToNext(current, nextId) {
    if (current.value.length === current.maxLength) {
        document.getElementById(nextId).focus();
    }
}

function closePinModal() {
    const pinModal = document.querySelector('.pin-container');
    if (pinModal) pinModal.remove();
}

function submitPIN(profileName) {
    const pin1 = document.getElementById('pin1').value;
    const pin2 = document.getElementById('pin2').value;
    const pin3 = document.getElementById('pin3').value;
    const pin4 = document.getElementById('pin4').value;

    const enteredPIN = pin1 + pin2 + pin3 + pin4;

    const correctPins = {
        Tom: "1234",
        Jerry: "5678",
        Harry: "91011",
        Jolie: "1213",
        Raquel: "1415"
    };

    if (enteredPIN === correctPins[profileName]) {
        alert(`Welcome, ${profileName}!`);
        window.location.href = `${profileName.toLowerCase()}.html`;
    } else {
        alert("Incorrect PIN!");
        closePinModal();
    }
}

// เปิด Modal
function selectProfile(profileName) {
    const modal = document.getElementById("pinModal");
    modal.style.display = "flex";
    console.log("Selected profile:", profileName);
}

// ปิด Modal
function closeModal() {
    const modal = document.getElementById("pinModal");
    modal.style.display = "none";
}

// ฟังก์ชันเลื่อน focus ไปยัง input ถัดไป
function moveToNext(input) {
    if (input.value.length === input.maxLength) {
        let nextInput = input.nextElementSibling;
        if (nextInput) {
            nextInput.focus();
        }
    }
}

// ฟังก์ชันส่ง PIN เมื่อครบ 4 ช่อง
function submitPIN() {
    const pinInputs = document.querySelectorAll(".pin-inputs input");
    const pin = Array.from(pinInputs).map(input => input.value).join("");

    if (pin.length === 4) {
        alert("PIN entered: " + pin); // คุณสามารถเปลี่ยนเป็น redirect หน้าอื่น
        closeModal();
    }
}

const profilePINs = {
    Tom: "1234",
    Jerry: "5678",
    Harry: "9101",
    Jolie: "1213",
    Raquel: "1415",
};

// เปิด Modal และบันทึกโปรไฟล์ที่เลือก
function selectProfile(profileName) {
    const modal = document.getElementById("pinModal");
    modal.style.display = "flex";
    modal.setAttribute("data-profile", profileName);
}

// ปิด Modal
function closeModal() {
    const modal = document.getElementById("pinModal");
    modal.style.display = "none";
    clearPINInputs(); // ล้าง PIN เมื่อปิด Modal
}

// ย้ายไปยัง input ถัดไปเมื่อพิมพ์ครบ
function moveToNext(current, nextId) {
    if (current.value.length === current.maxLength) {
        const nextInput = document.getElementById(nextId);
        if (nextInput) nextInput.focus();
    }
}

// ล้าง PIN Inputs
function clearPINInputs() {
    document.querySelectorAll(".pin-inputs input").forEach(input => input.value = "");
    document.getElementById("pin1").focus(); // โฟกัสช่องแรกใหม่
}

// ตรวจสอบ PIN และเปลี่ยนหน้า
function submitPIN() {
    const modal = document.getElementById("pinModal");
    const profileName = modal.getAttribute("data-profile");
    const pinInputs = document.querySelectorAll(".pin-inputs input");
    const enteredPIN = Array.from(pinInputs).map(input => input.value).join("");

    if (enteredPIN === profilePINs[profileName]) {
        window.location.href = "main.html"; // เปลี่ยนหน้าเดียวสำหรับทุกโปรไฟล์
    } else {
        alert("Incorrect PIN! Please try again.");
        clearPINInputs(); // เคลียร์ input ที่กรอกไว้
    }
}

// ตัวแปรสำคัญ
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const movieRow = document.querySelector('.movie-row');

let scrollPosition = 0; // ตำแหน่งการเลื่อน
const visibleMovies = 6; // จำนวนรูปที่แสดงใน 1 แถว
const totalMovies = 12; // จำนวนรูปทั้งหมด
const movieWidth = movieRow.offsetWidth / visibleMovies; // ความกว้างของแต่ละรูป

// ฟังก์ชันสำหรับปุ่มลูกศรขวา
rightArrow.addEventListener('click', () => {
    if (scrollPosition < totalMovies - visibleMovies) {
        scrollPosition += visibleMovies; // เพิ่มตำแหน่ง
        movieRow.style.transform = `translateX(-${scrollPosition * movieWidth}px)`;
    }
});

// ฟังก์ชันสำหรับปุ่มลูกศรซ้าย
leftArrow.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= visibleMovies; // ลดตำแหน่ง
        movieRow.style.transform = `translateX(-${scrollPosition * movieWidth}px)`;
    }
});


