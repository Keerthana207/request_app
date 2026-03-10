const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const Request = require("./models/Request");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Serve Frontend Folder
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔹 MongoDB Connection
mongoose.connect(
  "mongodb+srv://db_user_mern:keerthu123@cluster0.3juwzjy.mongodb.net/studentService?appName=Cluster0"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// 🔹 Default Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// 🔹 Save Request (Student Submit)
app.post("/request", async (req, res) => {
  try {
    const { name, title, description } = req.body;

    const newRequest = new Request({
      name,
      title,
      description
    });

    await newRequest.save();
    res.send("Request received");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving request");
  }
});

// 🔹 Get All Requests (Admin Page)
app.get("/requests", async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.json(allRequests);
  } catch (error) {
    res.status(500).send("Error fetching requests");
  }
});

// 🔹 Update Status (Approve / Reject)
app.put("/requests/:id", async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.send("Status updated");
  } catch (error) {
    res.status(500).send("Error updating status");
  }
});

// 🔹 Start Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
