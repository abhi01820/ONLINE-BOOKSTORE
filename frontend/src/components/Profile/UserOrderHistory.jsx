import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const BASE_URL=import.meta.env.MODE==="development" ? "http://localhost:1000/api/v1":"/api/v1";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/get-order-history`,
          { headers }
        );

        console.log("Fetched Order History:", response.data.data); // DEBUG LOG
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="p-4 h-[80vh] text-zinc-100 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No Order placed 
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com//128/9961/9961218.png"
            alt="No orders"
            className="h-[20vh] mb-8"
          />
        </div>
      ) : (
        <div className="h-full p-4 text-zinc-100 overflow-x-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full min-w-[900px] rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">
              <h1>Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="hidden w-none md:block md:w-[5%]">
              <h1>Mode</h1>
            </div>
          </div>

          {/* Render Orders Inline */}
          {orderHistory.map((items, index) => (
            <div
              key={items?._id || index}
              className="bg-zinc-800 w-full min-w-[900px] rounded py-2 px-4 flex flex-col gap-2 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="flex justify-between w-full">
                <h1>Order #{index + 1}</h1>
                <span className="text-sm text-zinc-400">{items.status || "Pending"}</span>
              </div>

              {items.books && items.books.length > 0 ? (
                items.books.map((book, i) => (
                  <div key={book?._id || i} className="flex gap-4">
                    <div className="w-[25%]">
                      <Link
                        to={`/view-book-details/${book._id}`}
                        className="hover:text-blue-300"
                      >
                        {book?.title || "Book Title"}
                      </Link>
                    </div>
                    <div className="w-[40%]">
                      <p>{book?.desc ? `${book.desc.slice(0, 50)}...` : "No Description"}</p>
                    </div>
                    <div className="w-[10%]">
                      ₹ {book?.price || "--"}
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-red-500">No Books Found</span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
