const studentName = localStorage.getItem("studentName");

if (!studentName) {
  alert("Please login first");
  window.location.href = "login.html";
}

fetch("http://localhost:3000/requests")
  .then(res => res.json())
  .then(data => {

    // Only show this student's requests
    const myData = data.filter(r => r.name === studentName);

    let output = "";

    if (myData.length === 0) {
      output = "<p>No requests submitted yet.</p>";
    } else {
      myData.forEach(r => {
        output += `
          <div style="
            background:white;
            padding:20px;
            margin:15px auto;
            width:80%;
            border-radius:10px;
            box-shadow:0 5px 15px rgba(0,0,0,0.08);
          ">
            <h4>Request ID: ${r._id}</h4>
            <h3>${r.title}</h3>
            <p>${r.description}</p>
            <b>Status:</b> 
            <span style="
              color: ${
                r.status === "Approved" ? "green" :
                r.status === "Rejected" ? "red" :
                "orange"
              };
              font-weight:bold;
            ">
              ${r.status}
            </span>
          </div>
        `;
      });
    }

    document.getElementById("myRequests").innerHTML = output;
  });
