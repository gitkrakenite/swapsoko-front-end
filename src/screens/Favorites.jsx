import { Link } from "react-router-dom";
import { DummyProducts } from "../dummyData";

import { AiFillStar, AiOutlineArrowUp, AiOutlineDelete } from "react-icons/ai";

import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";

const Favorites = () => {
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

  const handleRemoveFromFavorite = (id) => {
    alert(`removed id ${id}`);
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
        <div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column"
          >
            {DummyProducts.map((item) => (
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
                          onClick={() => handleRemoveFromFavorite(item.id)}
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
        </div>
      </div>
    </div>
  );
};

export default Favorites;
