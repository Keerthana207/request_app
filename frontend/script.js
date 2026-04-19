// LOGIN
function login(){

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  if(!name || !password){
    alert("Please enter name and password");
    return;
  }

  // simple password check
  if(password !== "1234"){
    alert("Wrong password");
    return;
  }

  localStorage.setItem("studentName", name);

  window.location.href = "request.html";
}



// SUBMIT REQUEST
function submitRequest(){

  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const studentName = localStorage.getItem("studentName");

  if(!studentName){
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  if(!type || !title || !description){
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:3000/request", {

    method: "POST",

    headers:{
      "Content-Type":"application/json"
    },

    body: JSON.stringify({

      name: studentName,
      type: type,
      title: title,
      description: description

    })

  })

  .then(res => res.text())
  .then(data => {

    alert("Request Submitted Successfully!");

    document.getElementById("type").value="";
    document.getElementById("title").value="";
    document.getElementById("description").value="";

  })

  .catch(err=>{
    console.log(err);
    alert("Server error");
  });

}



// LOGOUT
function logout(){

  localStorage.removeItem("studentName");

  window.location.href="login.html";

}



// SHOW USER NAME
window.onload=function(){

  const studentName=localStorage.getItem("studentName");

  if(studentName){

    const welcome=document.getElementById("welcomeUser");

    if(welcome){

      welcome.innerText="Welcome, "+studentName+" 👋";

    }

  }

}