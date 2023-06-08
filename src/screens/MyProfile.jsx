import { Link, useNavigate } from "react-router-dom";
// import { DummyProducts } from "../dummyData";
import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowUp,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPenFill } from "react-icons/bs";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { logout } from "../features/auth/authSlice";

const MyProfile = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("You Need An Account For This");
    }
  }, [user]);

  const [phone, setPhone] = useState("");

  // update fields
  const [updatePhone, setUpdatePhone] = useState("");

  useEffect(() => {
    setPhone(updatePhone);
  }, [updatePhone]);

  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  {
    /* arrow to scroll to top */
  }

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

  //

  // fetch my products
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      let myUser = user.username;
      let userToSend = { username: myUser };
      const { data } = await axios.post("/post/mine", userToSend);
      if (data) {
        setMyProducts(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed To Fetch. Please logout then login");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleUpdateOther = async (e) => {
    e.preventDefault();

    if (!phone) {
      return toast.error("Phone number needed");
    }

    let isConfirm = confirm("Are you sure you want to update phone ?");
    if (isConfirm) {
      try {
        let dataToSend = { phone: phone };
        let myId = user?._id;
        const response = await axios.put("/user/update/" + myId, dataToSend);
        if (response) {
          toast.success("Updated Phone Number");
          await handleLogout();
          console.log(response.data);
        }
      } catch (error) {
        toast.error("Failed To Update Account");
      }
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleDeleteTrade = async (id) => {
    // alert(`deleted id ${id}`);
    let isDelete = confirm("Are You sure you want to delete ? ");
    if (isDelete) {
      try {
        await axios.delete("/post/" + id);
        toast.success("deleted trade");
        await fetchMyProducts();
      } catch (error) {
        toast.error("Action Failed. Check Network");
      }
    }
  };

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

      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-orange-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* your credentials */}

      {showUpdate ? (
        <>
          <div className="mb-[20px]">
            <AiOutlineArrowLeft
              className="text-3xl text-orange-700 cursor-pointer"
              onClick={() => setShowUpdate(false)}
            />
          </div>

          <form className=" w-[98%] md:w-[60%] m-auto">
            <div className="flex flex-col gap-[15px] mb-[15px]">
              <label htmlFor="phone" className="text-zinc-500">
                Update Phone
                <p className="text-orange-200">
                  ** This is the number traders will use to reach out **
                </p>
              </label>
              <input
                type="phone"
                placeholder="New Phone Number"
                minLength={4}
                maxLength={20}
                id="email"
                className="bg-transparent p-[5px] rounded-md outline-none"
                style={{ border: "1px solid #4e4d4d" }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-[35px]">
              <div>
                <button
                  className="bg-emerald-900 text-zinc-300 px-[20px] py-[15px] rounded-xl"
                  onClick={handleUpdateOther}
                >
                  Update Phone ?
                </button>
                <p
                  className="text-orange-200 my-[1em] text-lg cursor-pointer"
                  onClick={() => setShowUpdate(false)}
                >
                  Close Update Form
                </p>
              </div>
            </div>
          </form>
        </>
      ) : (
        <section className=" w-[98%] md:w-[70%] bg-slate-700 px-[2em] py-[2em] m-auto rounded-md">
          <div key={user?.username}>
            <p className="mb-[10px]">username : {user?.username}</p>
            <p>phone : {user?.phone} </p>

            <div className="mt-[30px] flex justify-end">
              <BsPenFill
                className="text-emerald-400 text-2xl cursor-pointer"
                onClick={() => {
                  setShowUpdate(true);
                  setUpdatePhone(user?.phone);
                }}
                title="Update Phone"
              />
            </div>
            {/* logout */}
            <div className="mt-[20px]">
              <button
                className="bg-orange-800 text-zinc-300 p-[10px] rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      )}

      {/* show my posts */}
      <div className="mt-[30px]">
        {/* compare posts.creator to the logged in username. If true */}
        <p className="mb-[20px] text-lg text-zinc-400">
          All your Posts To Trade
        </p>
        <div>
          {loading ? (
            <div className="mt-[2em]">
              <Spinner message="Fetching Your Trades" />
            </div>
          ) : (
            <>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid "
                columnClassName="my-masonry-grid_column"
              >
                {myProducts.map((item) => (
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
                        <div className="flex justify-between mb-3 items-center">
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
                          <div className="flex items-center gap-2">
                            <p>
                              <AiFillStar />
                            </p>
                            <p>{item.isVerified && "verified"}</p>
                          </div>
                          <div>
                            <p
                              className="text-emerald-500 text-2xl cursor-pointer"
                              onClick={() => handleDeleteTrade(item._id)}
                            >
                              <AiOutlineDelete title="Delete Trade" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
