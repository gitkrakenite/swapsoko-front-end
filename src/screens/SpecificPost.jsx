import Navbar from "../components/Navbar";

import { useEffect, useState, useRef } from "react";
import "./ImageList.css";
import axios from "../axios";
import { toast } from "react-toastify";

import { Link, useParams } from "react-router-dom";

import moment from "moment";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import "./specificPost.css";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";

const SpecificPost = () => {
  const [activeImg, setActiveImg] = useState(null);

  const checkTheMainPhoto = (url) => {
    setActiveImg(url);
  };

  useEffect(() => {
    checkTheMainPhoto();
  }, []);

  const { user } = useSelector((state) => state.auth);

  // recommendation slider
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 2; // Adjust the speed of scrolling

    const startAnimation = () => {
      const animate = () => {
        scrollPosition += scrollSpeed;
        slider.scrollLeft = scrollPosition;

        if (scrollPosition >= slider.scrollWidth - slider.offsetWidth) {
          scrollPosition = 0;
        }

        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(animationId);
    };

    if (slider) {
      slider.addEventListener("mouseenter", stopAnimation);
      slider.addEventListener("mouseleave", startAnimation);

      startAnimation();
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (slider) {
        slider.removeEventListener("mouseenter", stopAnimation);
        slider.removeEventListener("mouseleave", startAnimation);
      }
    };
  }, []);

  // fetch the post
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPost = async (id) => {
    try {
      setLoading(true);

      let checkParam = id ? id : postId;
      const response = await axios.get("/post/" + checkParam);
      if (response) {
        setLoading(false);
        setSinglePost([response.data]);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Product.");
      toast.error("Network error or doesn't exist");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // comment
  const [comment, setComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);

  const handleComment = async (product) => {
    try {
      if (!comment) {
        toast.error("bid cannot be empty");
        return;
      }

      setLoadingComment(true);

      let username = user.username;
      let id = product._id;
      let commentData = { username, comment };

      await axios.post("/post/comment/" + id, commentData);
      setLoadingComment(false);
      setComment("");
      await fetchPost();

      //Now create notification
      let author = user.username;
      let productTitle = product.title;
      let productId = product._id;
      let content = comment;
      let recipient = product.creator;
      let notificationData = {
        author,
        productTitle,
        productId,
        content,
        recipient,
      };

      await axios.post("/notify", notificationData);
    } catch (error) {
      setLoadingComment(false);
      toast.error("Failed To Create Comment");
    }
  };

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

  // working on modal
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // what happens when we click on a post
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPopUpOpen(true);
  };

  const PopUpPage = ({ username, onClose }) => {
    const [fetchedUser, setFetchedUser] = useState("");
    const [loadingUser, setLoadingUser] = useState(false);
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const data = { username: selectedPost };
        // console.log(data);
        const response = await axios.post("/user", data);
        if (response) {
          setFetchedUser(response.data);
          setLoadingUser(false);
        }
        setLoadingUser(false);
      } catch (error) {
        toast.error("Could Not Get User Details");
        setLoadingUser(false);
      }
    };

    useEffect(() => {
      fetchUser();
    }, [selectedPost]);

    return (
      <div className="pop-up-page prompt">
        {/* close btn */}
        <div className="flex justify-center my-[20px] z-[999] ">
          <button onClick={onClose}>
            <AiOutlineClose
              className="text-5xl p-[10px] rounded-full "
              style={{
                border: "2px solid #188c56",
                position: "sticky",
                top: "20px",
              }}
              title="close"
            />
          </button>
        </div>
        {/* data */}
        <div className=" h-[70vh] sm:h-[60vh] overflow-y-scroll prompt">
          <div>
            <div className="text-center">
              {selectedPost == user?.username ? (
                <h2 className="my-[1em] text-2xl">
                  You are Viewing Your Profile
                </h2>
              ) : (
                <h2 className="my-[1em] text-2xl">
                  You are Viewing {selectedPost} Profile
                </h2>
              )}
              {loadingUser && (
                <p className="text-3xl my-[2em]">Fetching User ...</p>
              )}
              {selectedPost == user?.username ? (
                <h2 className="text-zinc-400" style={{ lineHeight: "1.8em" }}>
                  Anyone interested with your bid will call via the phone number
                  provided during registration.{" "}
                  <Link to="/my-profile" className="text-zinc-200 underline">
                    See Your Phone Number
                  </Link>
                </h2>
              ) : (
                <h2 className="text-emerald-500">
                  Click on the call button to call {selectedPost}
                </h2>
              )}
            </div>

            {user?.username !== selectedPost && (
              <div className="mt-[2em]">
                <p className="text-xl px-[15px]">
                  Call {fetchedUser?.username}
                </p>

                <p className="text-emerald-500 text-2xl flex items-center gap-[5px] my-[30px] ">
                  <span>
                    <AiOutlinePhone />
                  </span>
                  <span>
                    <a href={`tel:${fetchedUser?.phone}`}>
                      {fetchedUser?.phone}
                    </a>
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" px-[10px] sm:px-[3em]">
      {/* wrapper */}
      <div className="mb-[40px]">
        <Navbar />
      </div>
      <div>
        {loading && (
          <div className="my-[4em]">
            <Spinner message="Fetching Product" />
          </div>
        )}

        {singlePost?.map((product) => (
          <div key={product._id}>
            <div className="flex flex-col xl:flex-row gap-[20px] items-center xl:items-start">
              {/* image side */}
              <div className=" flex-[0.3] xl:flex-[0.5]">
                <img
                  src={activeImg ? activeImg : product.mainPhoto}
                  alt=""
                  className="w-full max-h-[500px] rounded-xl object-contain"
                />

                {/* small images */}
                <div className="mt-[20px] flex gap-[10px] justify-center">
                  <img
                    src={product.secPhoto}
                    alt=""
                    className=" h-[80px] w-[80px] sm:h-[200px] sm:w-[200px]  object-cover rounded-lg"
                    onClick={() => checkTheMainPhoto(product.secPhoto)}
                  />
                  <img
                    src={product.thirdPhoto}
                    alt=""
                    className="h-[80px] w-[80px] sm:h-[200px] sm:w-[200px] object-cover rounded-lg"
                    onClick={() => checkTheMainPhoto(product.thirdPhoto)}
                  />
                  <img
                    src={product.mainPhoto}
                    alt=""
                    className="h-[80px] w-[80px] sm:h-[200px] sm:w-[200px] object-cover rounded-lg"
                    onClick={() => checkTheMainPhoto(product.mainPhoto)}
                  />
                </div>
              </div>
              {/* text side */}
              <div className=" flex-[0.5]">
                <div>
                  <div className="flex justify-between md:gap-[25px] gap-[10px] flex-wrap mb-[15px]">
                    <p>{product.title}</p>
                    <p>category : {product.category}</p>
                  </div>
                  <div className="flex justify-between md:gap-[25px] gap-[10px] flex-wrap mb-[15px]">
                    <p>Current Location : {product.location}</p>
                    <p>Used For : {product.used}</p>
                  </div>
                  <p className="mb-[15px]">Desc : {product.description}</p>
                  <p className="mb-[15px]">Defects : {product.defects}</p>
                  <p className="mb-[15px]">
                    <span className="text-emerald-500">Exchange With</span> :{" "}
                    <span className="text-lg">{product.exchangeFor}</span>
                  </p>
                  <div className="flex justify-between md:gap-[25px] gap-[10px] flex-wrap mb-[15px]">
                    <p>Posted By : {product.creator}</p>
                    <p>
                      {" "}
                      <span className="text-lg text-orange-600">@</span>{" "}
                      {moment(product.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className="mt-[40px]">
                    <span className="text-lg text-zinc-400">Interested ?</span>{" "}
                    <span className=" text-lg">
                      {" "}
                      <span className="text-emerald-500">
                        {product.contactInfo}
                      </span>
                    </span>
                  </p>
                </div>

                {/* comments */}
                <div className="my-[20px]">
                  <h2 className="text-zinc-400 text-xl my-[10px]">
                    All Active Bids
                  </h2>
                  {/* create comment */}

                  {!user && (
                    <p className="text-orange-300 text-lg">
                      You need an account to create a bid
                    </p>
                  )}

                  {user && (
                    <>
                      <form onSubmit={() => handleComment(product)}>
                        <div>
                          <label htmlFor="comment" className="text-zinc-400">
                            {user?.username == product.creator ? (
                              <div className="text-orange-400 ">
                                Reply To Bids
                              </div>
                            ) : (
                              <>
                                Create a bid and add{" "}
                                <span className="text-orange-300">
                                  your number
                                </span>
                              </>
                            )}

                            {user?.username == product.creator ? (
                              <p className="mt-[10px]">
                                If You like a bid you can ask the bidder for
                                contact info
                              </p>
                            ) : (
                              <p className="mt-[10px]">
                                ** If you win, the owner will call you **
                              </p>
                            )}
                          </label>
                        </div>
                        <div className="flex items-center pt-[20px] w-[100%]  gap-[10px] ">
                          <p className=" hidden md:flex">
                            <span className="bg-orange-700 text-zinc-300 px-2 py-3 rounded-full text-2xl flex items-center justify-center w-10 h-10">
                              {user?.username.slice(0, 1)}
                            </span>
                          </p>
                          <input
                            type="text"
                            id="comment"
                            placeholder={
                              user?.username == product.creator
                                ? "reply to any bid"
                                : `create bid for ${product.title}`
                            }
                            className="w-[100%] bg-transparent p-[8px] outline-none border-none rounded-md"
                            style={{ border: "1px solid #5e5d5d" }}
                            required
                            maxLength={120}
                            minLength={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <p
                            className="cursor-pointer"
                            onClick={() => handleComment(product)}
                          >
                            {loadingComment ? (
                              <span className="bg-orange-800 p-[8px] rounded-lg">
                                bidding..
                              </span>
                            ) : (
                              <span className="bg-emerald-800 p-[8px] rounded-lg">
                                {user?.username == product.creator
                                  ? "reply"
                                  : `Bid`}
                              </span>
                            )}
                          </p>
                        </div>
                      </form>
                    </>
                  )}

                  {/* show all comments */}
                  <div className="mt-[30px] max-h-[40vh] overflow-y-scroll prompt bg-slate-800 p-[5px] rounded-lg">
                    {/* {console.log(product.comments)} */}

                    {/* fetch comments from latest to earliest */}
                    {product.comments.length >= 1 ? (
                      <>
                        {[...product.comments].reverse().map((item, index) => (
                          <div className="" key={index}>
                            <div
                              className=" block md:flex items-center gap-[20px] mb-[16px] pb-[10px]"
                              style={{ borderBottom: "1px solid #5c5b5b" }}
                            >
                              <p
                                className=""
                                onClick={() => handlePostClick(item.username)}
                              >
                                <span className="text-emerald-700 cursor-pointer underline">
                                  {item.username}
                                </span>
                              </p>
                              <p className="text-zinc-400">{item.comment}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="p-[10px] text-gray-400">
                        <p>
                          No Bids for{" "}
                          <span className="text-gray-200">
                            {product?.title}
                          </span>{" "}
                          Yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* pop up screen */}
            {isPopUpOpen && (
              <div className="pop-up-overlay">
                <PopUpPage
                  post={selectedPost}
                  onClose={() => setIsPopUpOpen(false)}
                />
              </div>
            )}

            {/* recommended */}

            <div className="mt-[20px] pb-[20px]">
              <h2 className="mb-[20px] text-xl text-zinc-400">
                Recommendation Section
              </h2>

              <div
                ref={sliderRef}
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "2000px",
                    transition: "0.5s ease",
                  }}
                >
                  {allPosts?.map((item) => (
                    <div key={item._id}>
                      {item.category == product.category && (
                        <>
                          {item.title !== product.title && (
                            <div onClick={() => fetchPost(item._id)}>
                              <img
                                src={item.mainPhoto}
                                style={{ flexShrink: 0, marginRight: "10px" }}
                                className="h-[200px] w-[200px] object-cover cursor-pointer"
                                onClick={() => {
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth", // Optional: Enables smooth scrolling
                                  });
                                }}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificPost;
