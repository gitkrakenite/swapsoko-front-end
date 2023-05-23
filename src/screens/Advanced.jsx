import { AiFillStar, AiOutlineArrowUp, AiOutlineSearch } from "react-icons/ai";
// import Hero from "./Hero";

import Masonry from "react-masonry-css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import Spinner from "../components/Spinner";
import axios from "../axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Advanced = ({ setCartItemCount }) => {
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

  const { user } = useSelector((state) => state.auth);

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

  // fetch all posts
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/post");
      if (response) {
        setAllPosts(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // search trading states
  const [searchTrading, setSearchTradingText] = useState("");
  const [searchTradingTimeout, setsearchTradingTimeout] = useState(null);
  const [searchedTradingResults, setSearchedTradingResults] = useState(null);

  // search user func
  const handleSearchTradeChange = async (e) => {
    e.preventDefault();
    setSearchBiddingText("");
    clearTimeout(setsearchTradingTimeout);

    setSearchTradingText(e.target.value);
    // console.log(searchText);

    setsearchTradingTimeout(
      setTimeout(() => {
        const searchResults = allPosts?.filter((item) =>
          item.title.toLowerCase().includes(searchTrading.toLowerCase())
        );

        setSearchedTradingResults(searchResults);
      }, 500)
    );
  };

  // let us use localstorage to store favorites
  const handleAddFavorite = async (product) => {
    // Retrieve the existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      // Product already exists, return a message
      toast.error("Already Added To Favorites");
      return;
    }

    // Create a new cart with the existing items and the new product
    const updatedCart = [...cartItems, product];

    // Update the cart items in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the cart item count in the parent component
    setCartItemCount((prevCount) => prevCount + 1);

    toast.success(`${product.title} added to Favorites`);
    return;
  };

  useEffect(() => {
    if (navigator.onLine) {
      console.log("online");
    } else {
      toast.error("Network Error");
    }
  }, []);

  // search bidding state
  const [searchBidding, setSearchBiddingText] = useState("");
  const [searchBiddingTimeout, setsearchBiddingTimeout] = useState(null);
  const [searchedBiddingResults, setSearchedBiddingResults] = useState(null);

  // search user func
  const handleSearchBiddingChange = async (e) => {
    e.preventDefault();
    setSearchTradingText("");
    clearTimeout(setsearchBiddingTimeout);

    setSearchBiddingText(e.target.value);
    // console.log(searchText);

    setsearchBiddingTimeout(
      setTimeout(() => {
        const searchResults = allPosts?.filter((item) =>
          item.exchangeFor.toLowerCase().includes(searchBidding.toLowerCase())
        );

        setSearchedBiddingResults(searchResults);
      }, 500)
    );
  };

  return (
    <div className="relative px-[10px] sm:px-[3em] py-[15px]">
      {/* wrapper */}

      <div>
        {/* arrow to scroll to top */}
        {showArrow && (
          <div
            className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-orange-700 text-zinc-50 rounded-full p-[5px]"
            onClick={handleScrollTop}
          >
            <AiOutlineArrowUp />
          </div>
        )}

        <div className="mb-[20px]">
          <Link to="/">
            <p
              className="text-2xl text-zinc-400"
              style={{ fontWeight: "bold" }}
            >
              SWAPSOKO
            </p>
          </Link>
        </div>

        {/* search form */}
        <p className="py-[10px] text-xl text-slate-400">
          Let Us Help You Find What You Want
        </p>
        <div className=" block md:flex justify-between py-[30px] gap-[40px] items-center">
          <div className="flex-[0.5] mb-[20px] md:mb-0">
            <form className="w-full">
              <div className="flex flex-col gap-[10px]">
                <div>
                  <label
                    htmlFor="whatYouWant"
                    className="text-lg text-zinc-400"
                  >
                    Find Someone Trading
                  </label>
                </div>
                <div
                  className="flex items-center gap-[10px] w-[100%] rounded-lg"
                  style={{ border: "1px solid #ccc", padding: "6px" }}
                >
                  <AiOutlineSearch className="text-2xl text-zinc-300" />
                  <input
                    type="text"
                    placeholder="search someone trading ..."
                    className="bg-transparent w-full outline-none border-none"
                    required
                    value={searchTrading}
                    onChange={handleSearchTradeChange}
                    id="whatYouWant"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="flex-[0.5]">
            <form className="w-full">
              <div className="flex flex-col gap-[10px]">
                <div>
                  <label
                    htmlFor="whatYouWant"
                    className="text-lg text-zinc-400"
                  >
                    Find Someone Asking For
                  </label>
                </div>
                <div
                  className="flex items-center gap-[10px] w-[100%] rounded-lg"
                  style={{ border: "1px solid #ccc", padding: "6px" }}
                >
                  <AiOutlineSearch className="text-2xl text-zinc-300" />
                  <input
                    type="text"
                    placeholder="search someone asking for ..."
                    className="bg-transparent w-full outline-none border-none"
                    required
                    value={searchBidding}
                    onChange={handleSearchBiddingChange}
                    id="whatYouWant"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* wrapper for hero and filters */}

        {/* all products */}

        {loading ? (
          <div className="mt-[4em]">
            <Spinner message="Fetching All Trades ..." />
          </div>
        ) : (
          <>
            <div className="">
              {/* {console.log(allPosts)} */}
              {searchTrading ? (
                <>
                  {searchedTradingResults?.length >= 1 ? (
                    <>
                      <div className="mb-[15px] text-zinc-400">
                        {searchTrading && (
                          <p>The Following Are Trading : {searchTrading}</p>
                        )}
                        {/* {searchedResults?.length} */}
                      </div>
                      {
                        <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="my-masonry-grid "
                          columnClassName="my-masonry-grid_column"
                        >
                          {searchedTradingResults?.map((item) => (
                            <div
                              key={item._id}
                              className="bg-slate-800 rounded-lg"
                            >
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
                                    <p className="text-emerald-500 cursor-pointer">
                                      #{item.category}
                                    </p>
                                    {item.isVerified == "nope" && (
                                      <div className="flex items-center gap-2">
                                        <p>
                                          <AiFillStar />
                                        </p>
                                        <p>verified</p>
                                      </div>
                                    )}

                                    {user && (
                                      <div>
                                        <p
                                          className="text-emerald-500 text-xl cursor-pointer"
                                          onClick={() =>
                                            handleAddFavorite(item)
                                          }
                                        >
                                          <AiFillHeart title="Add To Favorites" />
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Masonry>
                      }
                    </>
                  ) : (
                    <div className=" flex justify-center text-3xl mb-[20px] text-zinc-400">
                      <div className="flex flex-col text-center gap-3">
                        <p>oops 😥</p>
                        <p>
                          No one is Trading{" "}
                          <span className="text-orange-600">
                            {searchTrading}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>

            {/* search bidding */}
            <div className="">
              {/* {console.log(allPosts)} */}
              {searchBidding ? (
                <>
                  <div className="mb-[15px] text-zinc-400">
                    {searchTrading && <p>Results For : {searchTrading}</p>}
                    {/* {searchedResults?.length} */}
                  </div>

                  {searchedBiddingResults?.length >= 1 ? (
                    <>
                      {
                        <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="my-masonry-grid "
                          columnClassName="my-masonry-grid_column"
                        >
                          {searchedBiddingResults?.map((item) => (
                            <div
                              key={item._id}
                              className="bg-slate-800 rounded-lg"
                            >
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
                                    <p className="text-emerald-500 cursor-pointer">
                                      #{item.category}
                                    </p>
                                    {item.isVerified == "nope" && (
                                      <div className="flex items-center gap-2">
                                        <p>
                                          <AiFillStar />
                                        </p>
                                        <p>verified</p>
                                      </div>
                                    )}

                                    {user && (
                                      <div>
                                        <p
                                          className="text-emerald-500 text-xl cursor-pointer"
                                          onClick={() =>
                                            handleAddFavorite(item)
                                          }
                                        >
                                          <AiFillHeart title="Add To Favorites" />
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Masonry>
                      }
                    </>
                  ) : (
                    <div className=" flex justify-center text-3xl mb-[20px] text-zinc-400">
                      <div className="flex flex-col text-center gap-3">
                        <p>oops 😥</p>
                        <p>
                          No one is Asking For{" "}
                          <span className="text-orange-600">
                            {searchBidding}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
              {/* nav numbers */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Advanced;
