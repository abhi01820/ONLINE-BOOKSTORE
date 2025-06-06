
const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Order = require("../models/order");
const User = require("../models/user");
const Book = require("../models/book");


router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      // Create a new order with user ID and book ID
      const newOrder = new Order({
        user: id,
        books: [orderData._id],
        status: "Pending", // You can customize status
      });

      // Save to DB
      const savedOrder = await newOrder.save();

      // Add order to user's history
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id },
      });

      // Remove from cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});





router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "books", model: "Book" },
    });


    const ordersData = userData?.orders?.reverse() || [];

    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});





router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "books",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred " });
  }
});


router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occcurred" });
  }
})




module.exports = router;