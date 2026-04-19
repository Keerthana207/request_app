const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const Request = require("./models/Request");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend (optional)
app.use(express.static(path.join(__dirname, "../frontend")));

// MongoDB Atlas Connection
mongoose.connect(
  "mongodb+srv://db_user_mern:keerthu123@cluster0.3juwzjy.mongodb.net/studentService?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("API Running...");
});


// SAVE REQUEST
app.post("/request", async (req, res) => {
  try {
    const { name, type, title, description } = req.body;

    const newRequest = new Request({
      name,
      type: type || "General",
      title,
      description,
      status: "Pending"
    });

    await newRequest.save();
    res.send("Request received successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving request");
  }
});


// GET ALL REQUESTS  ✅ (single request route)
app.get("/request", async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.json(allRequests);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching requests");
  }
});


// UPDATE STATUS (Approve / Reject) ✅
app.put("/request/:id", async (req, res) => {
  try {
    await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      }
    );

    res.send("Status updated successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating status");
  }
});


// IMPORTANT FOR RENDER DEPLOY
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});