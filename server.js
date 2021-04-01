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
  try {
    const storeData = await StoreData.find();
    const cartData = await CartData.find();
    res.render("index.ejs", {
      storeData: storeData,
      cartData: cartData,
      message: "",
    });
  } catch (e) {
    res.redirect("/");
  }
});

app.post("/delete/:name", async (req, res) => {
  try {
    await StoreData.findOneAndRemove({ item: req.params.name });
    res.redirect("/");
  } catch (e) {
    res.redirect("/");
  }
});

app.post("/addtocart/:name", async (req, res) => {
  try {
    const storeData = await StoreData.findOne({ item: req.params.name });
    const cartData = await CartData.findOne({ item: req.params.name });

    if (storeData.quantity > 0) {
      if (cartData == null) {
        await CartData.create({
          item: storeData.item,
        });
        storeData.quantity--;
        storeData.save();
      } else {
        cartData.quantity++;
        cartData.save();
        storeData.quantity--;
        storeData.save();
      }
    }
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
app.post("/deletecart/:name", async (req, res) => {
  try {
    const cartData = await CartData.findOne({ item: req.params.name });
    const storeData = await StoreData.findOne({ item: req.params.name });
    if (storeData == null) {
      await StoreData.create({
        item: cartData.item,
        quantity: cartData.quantity,
      });
      cartData.remove();
      res.redirect("/");
    } else {
      storeData.quantity += parseInt(cartData.quantity);
      storeData.save();
      await CartData.findOneAndRemove({ item: req.params.name });
      res.redirect("/");
    }
  } catch (e) {
    res.redirect("/");
  }
});

app.post("/adddata", async (req, res) => {
  try {
    const dataFound = await StoreData.findOne({
      item: req.body.item.trim().toUpperCase(),
    });
    if (dataFound == null) {
      await StoreData.create({
        item: req.body.item.trim().toUpperCase(),
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
