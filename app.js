let currentUser = null;
let generatedOTP = null;

function showLoginForm() {
    document.getElementById('login-modal').style.display = 'block';
}

function closeLoginForm() {
    document.getElementById('login-modal').style.display = 'none';
}

function sendOTP() {
    const phone = document.getElementById('phone').value;
    console.log(`OTP sent to ${phone}`);
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    return sendOTP;
}

function verifyOTP() {
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;

    if (otp === '10000') {
        alert('Congratulations! Login successful');
        currentUser = { username, phone };
        showDashboard(username);
        loadDashboard();
    } else {
        alert('Invalid OTP. Please try again.');
    } 
}

function showDashboard(username) {
    document.getElementById('login-modal').style.display = 'none';
    const dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'block';
    dashboard.innerHTML = `
        <h2>Welcome, ${username}!</h2>
        <div id="dashboard-content"></div>
    `;
    loadDashboard();
}

function loadDashboard() {
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `
        <div class="dashboard-cards">
            <div class="card" onclick="getInstantHelp()">
                <img src="tow_truck_image.jpg" alt="Get Instant Help">
                <h3>Get Instant Help</h3>
            </div>
            <div class="card" onclick="showMembershipPlans()">
                <img src="membership_card_image.jpg" alt="Take Assistance Membership">
                <h3>Membership Plans</h3>
            </div>
        </div>
    `;
    updateProfileInfo();
}

function editProfile() {
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `
        <h2>Edit Profile</h2>
        <div class="profile-form">
            <div id="image-preview">
                <i class="fas fa-user"></i>
            </div>
            <input type="file" id="profile-image" accept="image/*" onchange="previewImage(event)">
            <input type="text" id="vehicle-number" placeholder="Vehicle Number" value="${currentUser.vehicleNumber || ''}">
            <textarea id="other-vehicles" placeholder="Other vehicles owned">${currentUser.otherVehicles || ''}</textarea>
            <button onclick="saveProfile()">Save Profile</button>
        </div>
    `;
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.querySelector('#image-preview img') || document.createElement('img');
        preview.src = reader.result;
        document.querySelector('#image-preview').appendChild(preview);
    }
    reader.readAsDataURL(event.target.files[0]);
}

function saveProfile() {
    const vehicleNumber = document.getElementById('vehicle-number').value;
    const otherVehicles = document.getElementById('other-vehicles').value;
    
    currentUser.vehicleNumber = vehicleNumber;
    currentUser.otherVehicles = otherVehicles;

    console.log('Profile saved:', currentUser);
    updateProfileInfo();
    loadDashboard();
}

function updateProfileInfo() {
    const profilePicSmall = document.querySelector('#profile-pic-small');
    const newProfilePic = document.querySelector('#image-preview img');
    if (newProfilePic) {
        profilePicSmall.innerHTML = `<img src="${newProfilePic.src}" alt="Profile Picture">`;
    } else {
        profilePicSmall.innerHTML = `<i class="fas fa-user"></i>`;
    }
}

function getInstantHelp() {
    if (!isLoggedIn()) {
        showLoginForm();
        return;
    }
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `
        <h2>Request Instant Help</h2>
        <form id="help-form">
            <input type="text" id="location" placeholder="Your Current Location" required>
            <input type="text" id="vehicle-type" placeholder="Vehicle Type" required>
            <textarea id="issue-description" placeholder="Describe the issue" required></textarea>
            <button type="submit">Submit Request</button>
        </form>
    `;
    document.getElementById('help-form').addEventListener('submit', submitHelpRequest);
}

function showMembershipPlans() {
    if (!isLoggedIn()) {
        showLoginForm();
        return;
    }
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `
        <h2>Membership Plans</h2>
        <div class="membership-plans">
            <div class="plan-card">
                <h3>Monthly</h3>
                <p class="price">₹499/-</p>
                <button onclick="selectPlan('Monthly', 499)">Select</button>
            </div>
            <div class="plan-card">
                <h3>Quarterly</h3>
                <p class="price">₹1,499/-</p>
                <button onclick="selectPlan('Quarterly', 1499)">Select</button>
            </div>
            <div class="plan-card">
                <h3>Half-Yearly</h3>
                <p class="price">₹2,899/-</p>
                <button onclick="selectPlan('Half-Yearly', 2899)">Select</button>
            </div>
            <div class="plan-card">
                <h3>Annual</h3>
                <p class="price">₹5,499/-</p>
                <button onclick="selectPlan('Annual', 5499)">Select</button>
            </div>
        </div>
    `;
}

function submitHelpRequest(event) {
    event.preventDefault();
    alert('Hold on help is on the way!');
    loadDashboard();
}

function isLoggedIn() {
    return !!currentUser;
}

function selectPlan(planName, price) {
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = `
        <h2>Payment for ${planName} Plan</h2>
        <h2>Amount: ₹${price}</h2>
        <img src="qr_code_image.png" alt="Payment QR Code">
        <h2>Pay by scanning above QR code</h2>
        <button onclick="completePurchase()">Done</button>
    `;
}

function completePurchase() {
    alert('Thank you for your purchase!');
    loadDashboard();
}

window.onclick = function(event) {
    if (event.target == document.getElementById('login-modal')) {
        closeLoginForm();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-button').addEventListener('click', showLoginForm);
    document.getElementById('close-login').addEventListener('click', closeLoginForm);
    document.getElementById('send-otp-button').addEventListener('click', sendOTP);
    document.getElementById('verify-otp-button').addEventListener('click', verifyOTP);
});