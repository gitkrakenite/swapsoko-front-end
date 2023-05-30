import { useState, useEffect } from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "./Notify.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineArrowLeft, AiOutlineArrowUp } from "react-icons/ai";
import { toast } from "react-toastify";

const Notification = () => {
  // fetch all posts
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const [allNotifications, setAllNotifications] = useState([]);
  const fetchAllNotifications = async () => {
    try {
      setLoading(true);
      let username = user.username;
      let dataToSend = { username };

      const response = await axios.post("/notify/fetch", dataToSend);
      if (response) {
        setAllNotifications(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("You Need An Account For This");
    }
  }, [user]);

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  // delete
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete("/notify/" + id);
    } catch (error) {
      toast.error("Please Check Network");
    }
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

  return (
    <div className=" px-[10px] sm:px-[3em] py-[14px]">
      <div className="">
        <h1 className="my-[20px]">
          <Link to="/">
            <AiOutlineArrowLeft className="text-4xl text-emerald-600" />
          </Link>
        </h1>
        {showArrow && (
          <div
            className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-orange-700 text-zinc-50 rounded-full p-[5px]"
            onClick={handleScrollTop}
          >
            <AiOutlineArrowUp />
          </div>
        )}
        <h1 className="my-[20px]">Hello {user?.username}</h1>
        <h2>All Notifications and Replies Will Be Displayed Here.</h2>
        <div>
          {loading ? (
            <div>
              <Spinner message="Attempting To Fetch Notifications" />
            </div>
          ) : (
            <>
              {allNotifications?.length >= 1 ? (
                <div>
                  {allNotifications?.map((item) => (
                    <>
                      <>
                        <div
                          key={item._id}
                          onClick={() => handleDeleteNotification(item._id)}
                        >
                          <Link to={`/post/${item.productId}`}>
                            <div className="text-zinc-200 notifyWrapper my-[28px] p-[15px]">
                              <div className="mb-[20px]">
                                {item.author == user?.username ? (
                                  <p>You Replied </p>
                                ) : (
                                  <p>Notification from: {item.author} </p>
                                )}
                              </div>
                              <div className="mb-[20px]">
                                <p className="text-zinc-400 text-sm mb-[9px]">
                                  Product / Service: {item.productTitle}
                                </p>
                                <p className="text-zinc-300">
                                  Message:{" "}
                                  <span className="text-orange-200">
                                    {item.content}
                                  </span>
                                </p>
                              </div>
                              <div className="flex justify-between items-start gap-[20px] flex-wrap">
                                {item.author == user?.username ? (
                                  <p>
                                    You Replied{" "}
                                    {moment(item.createdAt).fromNow()}
                                  </p>
                                ) : (
                                  <p>
                                    Received {moment(item.createdAt).fromNow()}
                                  </p>
                                )}

                                <p
                                  onClick={() =>
                                    handleDeleteNotification(item._id)
                                  }
                                  className="z-[999]"
                                >
                                  <BsTrash className="text-2xl cursor-pointer text-orange-600" />
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </>
                    </>
                  ))}
                </div>
              ) : (
                <div className="mt-[4em] flex justify-center">
                  <h2 className="text-3xl text-zinc-400">
                    You&apos;re all Caught Up. No New Notifications
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
