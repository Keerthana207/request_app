const studentName = localStorage.getItem("studentName");

if (!studentName) {
  alert("Please login first");
  window.location.href = "login.html";
}

fetch("http://localhost:3000/requests")
  .then(res => res.json())
  .then(data => {

    const myData = data.filter(r => r.name === studentName);

    let output = "";

    if (myData.length === 0) {
      output = "<p style='text-align:center'>No requests submitted yet.</p>";
    } else {

      myData.forEach(r => {

        let statusIcon = "";
        if (r.status === "Approved") statusIcon = "🟢";
        else if (r.status === "Rejected") statusIcon = "🔴";
        else statusIcon = "🟡";

        output += `
          <div style="
            background:white;
            padding:20px;
            margin:20px auto;
            width:75%;
            border-radius:12px;
            box-shadow:0 5px 15px rgba(0,0,0,0.08);
          ">

            <h4>Request ID: ${r._id}</h4>

            <h3>📄 ${r.title}</h3>

            <p><b>👤 Student Name:</b> ${r.name}</p>

            <p>${r.description}</p>

            <p><b>📅 Submitted On:</b> ${
              r.createdAt ? new Date(r.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
            }</p>

            <b>Status:</b>
            <span style="
              color: ${
                r.status === "Approved" ? "green" :
                r.status === "Rejected" ? "red" :
                "orange"
              };
              font-weight:bold;
              font-size:16px;
            ">
              ${statusIcon} ${r.status}
            </span>

          </div>
        `;

      });

    }

    document.getElementById("myRequests").innerHTML = output;

  })
  .catch(err => {
    console.log(err);
    alert("Error loading requests");
  });