const express = require("express");
const mongoose = require("mongoose");
const StoreData = require("./data");
const CartData = require("./cart");
const app = express();
const PORT = 3000 || process.env.PORT;

mongoose.connect("mongodb://localhost/manageStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const storeData = await StoreData.find();
  const cartData = await CartData.find();
  res.render("index.ejs", { storeData: storeData, cartData: cartData });
});

app.post("/delete/:id", async (req, res) => {
  try {
    await StoreData.findByIdAndRemove({ _id: req.params.id });
    res.redirect("/");
  } catch (e) {
    res.redirect("/");
  }
});

app.post("/addtocart/:id", async (req, res) => {
  try {
    const foundData = await CartData.findOne({ id: req.params.id });
    const data = await storeData.findOne({ id: req.params.id });
    if (foundData == null) {
      await CartData.create({ item: data.item });
      data.quantity--;
      data.save();
    } else {
      data.quantity--;
      data.save();
      foundData.quantity++;
      foundData.save();
    }
    res.redirect("/");
  } catch (e) {
    res.redirect("/");
  }
});

app.post("/buy", async (req, res) => {
  try {
  } catch (e) {
    res.redirect("/");
  }
});
app.post("/adddata", async (req, res) => {
  try {
    const dataFound = await StoreData.findOne({ item: req.body.item });
    if (dataFound == null) {
      await StoreData.create({
        item: req.body.item,
        quantity: req.body.quantity,
      });
    } else {
      dataFound.quantity += parseInt(req.body.quantity);
      dataFound.save();
    }
    res.redirect("/");
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
