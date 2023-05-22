import { Link, useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineArrowUp, AiOutlineDelete } from "react-icons/ai";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Favorites = ({ setCartItemCount }) => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  // scroll to top functionality
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // fetch products from localstorage
  const [favorites, setFavorites] = useState([]);
  function getSortedProductsFromLocalStorage() {
    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Sort the cart items in reverse order based on the timestamp or any other relevant property
    const sortedCartItems = cartItems.sort((a, b) => b.timestamp - a.timestamp);

    // Update the cart state with the sorted products
    setFavorites(sortedCartItems);
  }

  useEffect(() => {
    getSortedProductsFromLocalStorage();
  }, []);

  const handleRemoveFromCart = (id) => {
    let isRemove = confirm("Remove From Favorites ? ");

    if (isRemove) {
      // Retrieve the cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Filter out the product with the specified ID
      const updatedCartItems = cartItems.filter((item) => item._id !== id);

      // Update the cart state and localStorage with the updated cart items
      setFavorites(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      getSortedProductsFromLocalStorage();
      // Update the cart item count in the parent component
      setCartItemCount((prevCount) => prevCount - 1);
      toast.success("Removed From Favorites");
    }
  };

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("You Need An Account For This");
    }
  }, [user, navigate]);

  return (
    <div className=" px-[10px] sm:px-[3em] pt-3">
      {/* topbar */}
      <nav className="mb-[3em]">
        <Link to="/">
          <h2 className="text-zinc-200 text-xl" style={{ fontWeight: 700 }}>
            SWAPSOKO
          </h2>
        </Link>
      </nav>

      {/* arrow to scroll to top */}
      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-orange-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* show my Favorites */}
      <div className="mt-[30px]">
        <p className="mb-[20px] text-lg text-zinc-400">Favorite Trades</p>
        {console.log(favorites)}
        <div>
          {favorites?.length >= 1 ? (
            <>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid "
                columnClassName="my-masonry-grid_column"
              >
                {/* {alert(records.length)} */}

                {favorites?.map((item) => (
                  <div key={item._id} className="bg-slate-800 rounded-lg">
                    <div className="image-item rounded-lg">
                      <Link to={`/post/${item._id}`}>
                        <img
                          src={item.mainPhoto}
                          alt=""
                          className="w-full rounded-md max-h-[800px] object-cover"
                        />
                      </Link>
                      <div className="mt-[10px] px-[6px] pb-[10px] ">
                        <div className="flex justify-between mb-2 items-center">
                          <p className="bg-orange-700 text-zinc-300 rounded-full p-[5px]">
                            {item.creator.slice(0, 2)}
                          </p>

                          <p>{item.title}</p>
                        </div>
                        <div className="flex justify-between mb-2 items-center">
                          <div>
                            <p className="text-emerald-500 cursor-pointer">
                              #{item.category}
                            </p>
                          </div>
                          {item.isVerified == "nope" && (
                            <div className="flex items-center gap-2">
                              <p>
                                <AiFillStar />
                              </p>
                              <p>verified</p>
                            </div>
                          )}
                          <div>
                            <p
                              className="text-emerald-500 text-xl cursor-pointer"
                              onClick={() => handleRemoveFromCart(item._id)}
                            >
                              <AiOutlineDelete title="Remove From Favorites" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </>
          ) : (
            <div className="flex justify-center my-[4em]">
              <div>
                <p className="text-3xl text-zinc-300 mb-[20px]">
                  Your Favorites is empty 😥
                </p>
                <Link to="/">
                  <p className="text-emerald-600 underline">
                    Go Back And Add ?
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
