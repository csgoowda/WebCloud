// ✅ API Used: LocalStorage API
// 📌 Function: Save login session
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass); // demo only
    window.location.href = "dashboard.html";
  }
}

// ✅ API Used: SessionStorage API
// 📌 Function: Clear session on logout
function logout() {
  localStorage.clear();
  location.href = "index.html";
}

// ✅ API Used: File API + Blob API
// 📌 Function: Upload and preview profile picture
function uploadProfilePic() {
  const file = document.getElementById("profilePic").files[0];
  const user = localStorage.getItem("user");
  if (!user) {
    alert("User not logged in.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("preview").src = e.target.result;
    localStorage.setItem("profile_" + user, e.target.result); // Save base64 per user
  };
  reader.readAsDataURL(file);
}

// ✅ API Used: File API + LocalStorage API
// 📌 Function: Save uploaded file to localStorage
function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const user = localStorage.getItem("user");
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }
  if (!user) {
    alert("User not logged in.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    // Store as base64 string in localStorage with user and file name as key
    localStorage.setItem("file_" + user + "_" + file.name, e.target.result);
    listFiles();
  };
  reader.readAsDataURL(file);
}

// ✅ API Used: LocalStorage API
// 📌 Function: List uploaded files from localStorage
function listFiles() {
  const ul = document.getElementById("fileList");
  ul.innerHTML = "";
  const user = localStorage.getItem("user");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("file_" + user + "_")) {
      const fileName = key.substring(("file_" + user + "_").length);
      const li = document.createElement("li");
      li.innerHTML = fileName +
        ' <button onclick="downloadFile(\'' + fileName + '\')">⬇️</button>' +
        ' <button onclick="deleteFile(\'' + fileName + '\')">❌</button>';
      ul.appendChild(li);
    }
  }
}

// ✅ API Used: Blob API + LocalStorage API
// 📌 Function: Download file from localStorage
function downloadFile(name) {
  const user = localStorage.getItem("user");
  const dataUrl = localStorage.getItem("file_" + user + "_" + name);
  if (!dataUrl) {
    alert("File not found.");
    return;
  }
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name;
  a.click();
}

// ✅ API Used: LocalStorage API
// 📌 Function: Delete file from localStorage
function deleteFile(name) {
  const user = localStorage.getItem("user");
  localStorage.removeItem("file_" + user + "_" + name);
  listFiles();
}

// ✅ API Used: LocalStorage
// 📌 Function: Show profile + username
function loadUser() {
  const user = localStorage.getItem("user");
  document.getElementById("userInfo").innerText = user;
  document.getElementById("preview").src = localStorage.getItem("profile_" + user) || "";
  listFiles();
}

// ✅ API Used: SessionStorage API
// 📌 Function: Save a temporary session value
function setSessionValue(key, value) {
  sessionStorage.setItem(key, value);
}

// ✅ API Used: Clipboard API
// 📌 Function: Copy text to clipboard
function copyTextToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, () => {
      alert('Failed to copy.');
    });
  } else {
    alert('Clipboard API not supported.');
  }
}

// ✅ API Used: Notification API
// 📌 Function: Show a browser notification
function showNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body });
      }
    });
  }
}

// ✅ API Used: Vibration API
// 📌 Function: Vibrate device (if supported)
function vibrateDevice(pattern = [200, 100, 200]) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// ✅ API Used: Geolocation API
// 📌 Function: Get user’s current location
function getCurrentLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => callback(position.coords),
      error => alert('Location error: ' + error.message)
    );
  } else {
    alert('Geolocation not supported.');
  }
}
