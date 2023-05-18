import {
  AiFillStar,
  AiOutlineArrowUp,
  AiOutlineCar,
  AiOutlineSearch,
} from "react-icons/ai";
// import Hero from "./Hero";
import { GiKiwiFruit, GiMailShirt } from "react-icons/gi";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { RiComputerLine, RiHeadphoneLine, RiServiceLine } from "react-icons/ri";
import { BsPhone } from "react-icons/bs";
import { BiFridge } from "react-icons/bi";
import { MdOutlineSportsBaseball, MdOutlineSportsRugby } from "react-icons/md";
import { DummyProducts } from "../dummyData";
import Masonry from "react-masonry-css";
import "./feed.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import Spinner from "./Spinner";

const Feed = () => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  //   pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = DummyProducts?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(DummyProducts?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const handleClick = (number) => {
    setStart(number);
    setEnd(number + 3);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handleClick(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      handleClick(currentPage);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
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

  // search  states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // search user func
  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);
    // console.log(searchText);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = DummyProducts?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.location.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase()) ||
            item.creator.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // fetch all posts
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative pb-[2em]">
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
        {/* search form */}
        <div className=" w-[99%] sm:w-[94%] md:w-[85%] lg:w-[75%] xl:w-[60%] 2xl:w-[50%] flex justify-center m-auto pb-[30px]">
          <form className="w-full">
            <div
              className="flex items-center gap-[10px] w-[100%] rounded-lg"
              style={{ border: "1px solid #ccc", padding: "6px" }}
            >
              <AiOutlineSearch className="text-2xl text-zinc-300" />
              <input
                type="text"
                placeholder="Search products, trader and categories"
                className="bg-transparent w-full outline-none border-none"
                required
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
        {/* wrapper for hero and filters */}
        <div className="">
          {/* filters */}
          <div>
            <div>
              <h2 className="mb-[25px] text-2xl text-zinc-400">
                Apply Filters
              </h2>
            </div>
            <div className="mb-[10px] flex  gap-[20px] justify-between w-100 overflow-x-scroll pb-3 prompt">
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <MdOutlineSportsRugby />
                <p>All</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <GiKiwiFruit />
                <p>Beauty</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <RiServiceLine />
                <p>Services</p>
              </div>
              <div className="flex  items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <BsPhone />
                <p>Phones</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <BiFridge />
                <p>Appliances</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <RiComputerLine />
                <p>Computing</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <TbDeviceGamepad2 className="text-zinc-300" />
                <p>Gaming</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <GiMailShirt />
                <p>Fashion</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <RiHeadphoneLine />
                <p>Music</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <AiOutlineCar />
                <p>Automobile</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <MdOutlineSportsBaseball />
                <p>Sports</p>
              </div>
              <div className="flex items-center gap-[10px] cursor-pointer hover:text-emerald-400 active:text-emerald-500">
                <MdOutlineSportsRugby />
                <p>Others</p>
              </div>
            </div>
          </div>
          {/* hero */}
          <div>{/* <Hero /> */}</div>
        </div>

        {/* all products */}

        {loading ? (
          <div className="mt-[4em]">
            <Spinner message="Fetching All Trades ..." />
          </div>
        ) : (
          <>
            <div className="">
              {searchText ? (
                <>
                  <div className="mb-[15px] text-zinc-400">
                    {searchText && <p>Results For : {searchText}</p>}
                    {searchedResults?.length}
                  </div>

                  {searchedResults?.length >= 1 ? (
                    <>
                      {
                        <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="my-masonry-grid "
                          columnClassName="my-masonry-grid_column"
                        >
                          {searchedResults?.map((item) => (
                            <div
                              key={item.id}
                              className="bg-slate-800 rounded-lg"
                            >
                              <div className="image-item rounded-lg">
                                <Link to={`/post/${item.id}`}>
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
                                    <div className="flex items-center gap-2">
                                      <p>
                                        <AiFillStar />
                                      </p>
                                      <p>{item.isVerified && "verified"}</p>
                                    </div>
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
                          We cannot find{" "}
                          <span className="text-orange-600">{searchText}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                    columnClassName="my-masonry-grid_column"
                  >
                    {records.map((item) => (
                      <div key={item.id} className="bg-slate-800 rounded-lg">
                        <div className="image-item rounded-lg">
                          <Link to={`/post/${item.id}`}>
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
                              <div className="flex items-center gap-2">
                                <p>
                                  <AiFillStar />
                                </p>
                                <p>{item.isVerified && "verified"}</p>
                              </div>
                              <div>
                                <p className="text-emerald-500 text-xl cursor-pointer">
                                  <AiFillHeart title="Add To Favorites" />
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
              {/* nav numbers */}
              <nav className="flex justify-center">
                <ul className="flex gap-[2em] mt-[10px] px-[5px] py-[10px] items-center ">
                  {/* map */}

                  <>
                    <li>
                      <a href="#" onClick={prevPage} className="text-zinc-200">
                        <p className="text-zinc-200">Prev</p>
                      </a>
                    </li>
                    <li className="flex gap-[10px] ">
                      {numbers.slice(start - 1, end).map((item, index) => (
                        <li
                          key={index}
                          className={`normal-nav ${
                            currentPage === item && "active-nav"
                          }`}
                        >
                          <a
                            href="#"
                            onClick={() => {
                              handleClick(item);
                              changeCurrentPage(item);
                            }}
                          >
                            <p className="text-zinc-200">{item}</p>
                          </a>
                        </li>
                      ))}
                    </li>

                    <li>
                      <a href="#" onClick={nextPage}>
                        <p className="text-zinc-200">Next</p>
                      </a>
                    </li>
                  </>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
