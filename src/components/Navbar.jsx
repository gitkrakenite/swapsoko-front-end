import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../axios";

const Navbar = ({ cartItemCount }) => {
  const { user } = useSelector((state) => state.auth);

  // let us fetchAllNotifications
  const [allNotifications, setAllNotifications] = useState([]);
  const fetchAllNotifications = async () => {
    try {
      let username = user.username;
      let dataToSend = { username };

      const response = await axios.post("/notify/fetch", dataToSend);
      if (response) {
        setAllNotifications(response.data);
      }
    } catch (error) {
      console.log("Error Finding Notifications");
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllNotifications();
    }
  }, []);

  // we need to count how many items are in the cart
  function getCartItemCount() {
    const cartItems = localStorage.getItem("cart");
    let count = 0;

    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems);
      count = parsedCartItems.length;
    }

    return count;
  }

  useEffect(() => {
    getCartItemCount();
  }, []);

  return (
    <div className="mb-[20px]">
      {/* desktop wrapper */}
      <div className="flex justify-between items-center pt-[10px] gap-[20px] flex-wrap">
        {/* logo */}
        <div
          className="flex gap-[25px] justify-between 
         w-full sm:w-0 items-center"
        >
          <Link to="/" className="no-underline">
            <h2 className="text-zinc-300 text-xl">SWAPSOKO</h2>
          </Link>
          <Link to="/about" className="">
            <h2 className="text-emerald-500 hover:underline text-xl">About</h2>
          </Link>
        </div>
        {/* links */}
        {user ? (
          <div>
            <ul className="flex gap-[28px] md:gap-[40px] items-center ">
              <Link to="/create" className="no-underline">
                <li className="text-zinc-400 hover:text-zinc-300">
                  <p>EXCHANGE</p>
                </li>
              </Link>
              <li className="relative">
                <Link to="/fav" className="no-underline">
                  <AiOutlineHeart className="text-emerald-500 text-2xl cursor-pointer" />
                  <p className="absolute bottom-3 left-7 text-sm text-zinc-300">
                    {getCartItemCount()}
                  </p>
                </Link>
              </li>
              <li className="relative">
                <Link to="/notifications" className="no-underline">
                  <AiOutlineMessage className="text-emerald-500 text-2xl cursor-pointer" />
                  <p className="absolute bottom-3 left-7 text-sm text-zinc-300">
                    {allNotifications?.length}
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="no-underline">
                  <p className="bg-orange-700 text-zinc-300 rounded-full p-[8px]">
                    {user?.username.slice(0, 2)}
                    {/* JN */}
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <p>
                <span className="bg-orange-800 text-zinc-300 p-[5px] rounded-md">
                  LOGIN NOW
                </span>
              </p>
            </Link>
          </div>
        )}
      </div>
      {/* mobile wrapper */}
      <div>
        {/* logo */}
        {/* links */}
      </div>
    </div>
  );
};

export default Navbar;
