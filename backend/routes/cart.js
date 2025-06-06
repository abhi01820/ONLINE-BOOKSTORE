// Assuming you are using Express and MongoDB (mongoose)
const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order"); 
const { authenticateToken } = require("./userAuth");

// Route for adding item to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookinCard = userData.cart.includes(bookid);
    if (isBookinCard) {
      return res.json({
        status: "Success",
        message: "Book is already in cart "
      });
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book added to cart "
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured " });
  }
});

// Route for removing item from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book removed from cart "
    });
  } catch (error) {
    return res.status(500).json({ message: "An Error Occured " });
  }
});

// Route for getting the user's cart
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occured " });
  }
});

// Route for placing the order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { order } = req.body; // The order array containing books and userId
    const { id } = req.headers;

    // Create new order in database
    const newOrder = new Order({
      user: id,
      books: order,
      status: "Pending",
      createdAt: new Date(),
    });

    await newOrder.save();

    // Clear cart for the user after order placement
    await User.findByIdAndUpdate(id, {
      $set: { cart: [] }, // Clear the cart
    });

    return res.json({
      success: true,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error Occured " });
  }
});

module.exports = router;
