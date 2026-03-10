function login() {
  const name = document.getElementById("name").value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  localStorage.setItem("studentName", name);
  window.location.href = "request.html";
}

function submitRequest() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const studentName = localStorage.getItem("studentName");

  if (!studentName) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  if (!title || !description) {
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:3000/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: studentName,
      title: title,
      description: description
    })
  })
  .then(res => res.text())
  .then(data => {
    alert("Request Submitted Successfully!");
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  })
  .catch(err => {
    console.log(err);
    alert("Server error");
  });
}
// 🔹 Open Modal
function openModal() {
  document.getElementById("requestModal").style.display = "block";
}

// 🔹 Close Modal
function closeModal() {
  document.getElementById("requestModal").style.display = "none";
}

// 🔹 Logout
function logout() {
  localStorage.removeItem("studentName");
  window.location.href = "login.html";
}
