import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dns from "dns";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Restaurant from "./model/Restaurant.js";
import Review from "./model/ReviewRest.js";
import Attraction from "./model/Attraction.js";
import ReviewAttra from "./model/ReviewAttra.js";
import ReviewMosque from "./model/ReviewMosque.js";
import ReviewHotels from "./model/ReviewHotels.js";
import Mosque from "./model/Mosque.js";
import Hotels from "./model/Hotels.js";
import UserModel from "./model/User.js";
const models = {
  restaurants: Restaurant,
  mosques: Mosque,
  hotels: Hotels,
  attractions: Attraction,
};
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

const PORT = process.env.PORT || 7500;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });

async function createAdmin() {
  const email = "admin@gmail.com";
  const password = "123456";

  const user = await UserModel.findOne({ email });

  if (!user) {
    const hash = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: "Admin",
      email,
      password: hash,
      role: "admin",
    });

    console.log("Admin Created");
  }
}

createAdmin();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "Success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// RESTAURANTS 
app.get("/restaurants", async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const data = await Restaurant.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/reviews/:restaurantId", async (req, res) => {
  const data = await Review.find({
    restaurantId: req.params.restaurantId,
  });

  res.json(data);
});

app.post("/reviews", upload.single("image"), async (req, res) => {
  try {
    const review = new Review({
      restaurantId: req.body.restaurantId,
      name: req.body.name,
      comment: req.body.comment,
      rating: Number(req.body.rating),
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await review.save();

    const reviews = await Review.find({
      restaurantId: req.body.restaurantId,
    });

    const count = reviews.length;

    const avg =
      count > 0
        ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / count
        : 0;

    await Restaurant.findByIdAndUpdate(req.body.restaurantId, {
      averageRating: avg,
      reviewsCount: count,
    });

    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put("/reviews/:id", async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      {
        comment: req.body.comment,
        rating: req.body.rating,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ATTRACTIONS 
app.get("/attractions", async (req, res) => {
  try {
    const data = await Attraction.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/attractions/:id", async (req, res) => {
  try {
    const data = await Attraction.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/attractions", async (req, res) => {
  try {
    const item = new Attraction(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/attraction-reviews/:attractionId", async (req, res) => {
  const data = await ReviewAttra.find({
    attractionId: req.params.attractionId,
  });

  res.json(data);
});

app.post("/attraction-reviews", upload.single("image"), async (req, res) => {
  try {
    const review = new ReviewAttra({
      attractionId: req.body.attractionId,
      name: req.body.name,
      comment: req.body.comment,
      rating: Number(req.body.rating),
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await review.save();

    const reviews = await ReviewAttra.find({
      attractionId: req.body.attractionId,
    });

    const count = reviews.length;

    const avg =
      count > 0
        ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / count
        : 0;

    await Attraction.findByIdAndUpdate(req.body.attractionId, {
      averageRating: avg,
      reviewsCount: count,
    });

    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put("/attraction-reviews/:id", async (req, res) => {
  try {
    const updated = await ReviewAttra.findByIdAndUpdate(
      req.params.id,
      {
        comment: req.body.comment,
        rating: req.body.rating,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// MOSQUES 
app.get("/mosques", async (req, res) => {
  const data = await Mosque.find();
  res.json(data);
});

app.get("/mosques/:id", async (req, res) => {
  const data = await Mosque.findById(req.params.id);
  res.json(data);
});

app.post("/mosques", async (req, res) => {
  const item = new Mosque(req.body);
  await item.save();
  res.json(item);
});

app.get("/mosque-reviews/:mosqueId", async (req, res) => {
  const data = await ReviewMosque.find({
    mosqueId: req.params.mosqueId,
  });

  res.json(data);
});

app.post("/mosque-reviews", upload.single("image"), async (req, res) => {
  try {
    const review = new ReviewMosque({
      mosqueId: req.body.mosqueId,
      name: req.body.name,
      comment: req.body.comment,
      rating: Number(req.body.rating),
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await review.save();

    const reviews = await ReviewMosque.find({
      mosqueId: req.body.mosqueId,
    });

    const count = reviews.length;

    const avg =
      count > 0
        ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / count
        : 0;

    await Mosque.findByIdAndUpdate(req.body.mosqueId, {
      averageRating: avg,
      reviewsCount: count,
    });

    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put("/mosque-reviews/:id", async (req, res) => {
  try {
    const updated = await ReviewMosque.findByIdAndUpdate(
      req.params.id,
      {
        comment: req.body.comment,
        rating: req.body.rating,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//HOTELS 
app.get("/hotels", async (req, res) => {
  const data = await Hotels.find();
  res.json(data);
});

app.get("/hotels/:id", async (req, res) => {
  const data = await Hotels.findById(req.params.id);
  res.json(data);
});

app.post("/hotels", async (req, res) => {
  const item = new Hotels(req.body);
  await item.save();
  res.json(item);
});

app.get("/hotel-reviews/:hotelId", async (req, res) => {
  const data = await ReviewHotels.find({
    hotelId: req.params.hotelId,
  });

  res.json(data);
});

app.post("/hotel-reviews", upload.single("image"), async (req, res) => {
  try {
    const review = new ReviewHotels({
      hotelId: req.body.hotelId,
      name: req.body.name,
      comment: req.body.comment,
      rating: Number(req.body.rating),
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await review.save();

    const reviews = await ReviewHotels.find({
      hotelId: req.body.hotelId,
    });

    const count = reviews.length;

    const avg =
      count > 0
        ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / count
        : 0;

    await Hotels.findByIdAndUpdate(req.body.hotelId, {
      averageRating: avg,
      reviewsCount: count,
    });

    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.put("/hotel-reviews/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      comment: req.body.comment,
      rating: Number(req.body.rating),
    };

    // new picture
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await ReviewHotels.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

app.delete("/hotel-reviews/:id", async (req, res) => {
  try {
    await ReviewHotels.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// DELETE COMMENT 
app.delete("/:type/:id", async (req, res) => {
  const { type, id } = req.params;

  const models = {
    restaurant: Review,
    attraction: ReviewAttra,
    mosque: ReviewMosque,
    hotel: ReviewHotels,
  };

  try {
    await models[type].findByIdAndDelete(id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/:type/:id", async (req, res) => {
  const { type, id } = req.params;

  const models = {
    restaurants: Restaurant,
    mosques: Mosque,
    hotels: Hotels,
    attractions: Attraction,
  };

  try {
    const model = models[type];

    if (!model) {
      return res.status(400).json({ msg: "Invalid type" });
    }

    const updated = await model.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// app.delete("/:type/:id", async (req, res) => {
//   const { type, id } = req.params;

//   const models = {
//     restaurants: Restaurant,
//     mosques: Mosque,
//     hotels: Hotels,
//     attractions: Attraction,
//   };

//   try {
//     const model = models[type];

//     if (!model) {
//       return res.status(400).json({ msg: "Invalid type" });
//     }

//     await model.findByIdAndDelete(id);

//     res.json({ msg: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });



app.post("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const model = models[type];

    if (!model) {
      return res.status(400).json({ msg: "Invalid type" });
    }

    const newItem = new model(req.body);

    await newItem.save();

    res.status(201).json({
      msg: "Added successfully",
      data: newItem,
    });

  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/dist/index.html"));
// });
