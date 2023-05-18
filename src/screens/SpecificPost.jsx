import Navbar from "../components/Navbar";
import { singleProduct } from "../dummyData";
import { useEffect, useState, useRef } from "react";
import "./ImageList.css";

// all products
import { DummyProducts } from "../dummyData";
import { Link } from "react-router-dom";

const SpecificPost = () => {
  const [activeImg, setActiveImg] = useState(null);

  const checkTheMainPhoto = (url) => {
    setActiveImg(url);
  };

  useEffect(() => {
    checkTheMainPhoto();
  }, []);

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

    slider.addEventListener("mouseenter", stopAnimation);
    slider.addEventListener("mouseleave", startAnimation);

    startAnimation();

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener("mouseenter", stopAnimation);
      slider.removeEventListener("mouseleave", startAnimation);
    };
  }, []);

  return (
    <div className=" px-[10px] sm:px-[3em]">
      {/* wrapper */}
      <div className="mb-[40px]">
        <Navbar />
      </div>
      <div>
        {singleProduct.map((product) => (
          <div key={product.id}>
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
                      {product.posted}
                    </p>
                  </div>
                  <p className="mt-[40px]">
                    <span className="text-lg text-zinc-400">Interested ?</span>{" "}
                    :{" "}
                    <span className=" text-lg">
                      Contact me at{" "}
                      <span className="text-emerald-500">
                        {product.contactInfo}
                      </span>
                    </span>
                  </p>
                </div>

                {/* comments */}
                <div className="my-[20px]">
                  <h2 className="text-zinc-400 text-xl my-[10px]">Comments</h2>
                  {/* create comment */}
                  <form className="">
                    <div>
                      <label htmlFor="comment" className="text-zinc-400">
                        Comment as johndoe
                      </label>
                    </div>
                    <div className="flex items-center pt-[20px] w-[100%]  gap-[10px] ">
                      <p className=" hidden md:flex">
                        <span className="bg-orange-700 text-zinc-300 px-[10px] py-[2px] rounded-full text-2xl">
                          J
                        </span>
                      </p>
                      <input
                        type="text"
                        id="comment"
                        placeholder="Enter your comment"
                        className="w-[100%] bg-transparent p-[8px] outline-none border-none rounded-md"
                        style={{ border: "1px solid #5e5d5d" }}
                        required
                        maxLength={60}
                      />
                      <p className="cursor-pointer">
                        <span className="bg-emerald-600 p-[8px] rounded-lg">
                          Comment
                        </span>
                      </p>
                    </div>
                  </form>
                  {/* show all comments */}
                  <div className="mt-[30px] h-[20vh] overflow-y-scroll prompt bg-slate-800 p-[5px] rounded-lg">
                    <div
                      className="flex items-center gap-[20px] mb-[16px] pb-[10px]"
                      style={{ borderBottom: "1px solid #5c5b5b" }}
                    >
                      <p className="">
                        <span className="bg-orange-700 text-zinc-300 px-[10px] py-[2px] rounded-full text-md">
                          J
                        </span>
                      </p>
                      <p className="text-zinc-400">This is an awesome offer</p>
                    </div>
                    <div
                      className="flex items-center gap-[20px] mb-[16px] pb-[10px]"
                      style={{ borderBottom: "1px solid #5c5b5b" }}
                    >
                      <p className="">
                        <span className="bg-orange-700 text-zinc-300 px-[10px] py-[2px] rounded-full text-md">
                          J
                        </span>
                      </p>
                      <p className="text-zinc-400">This is an awesome offer</p>
                    </div>
                    <div
                      className="flex items-center gap-[20px] mb-[16px] pb-[10px]"
                      style={{ borderBottom: "1px solid #5c5b5b" }}
                    >
                      <p className="">
                        <span className="bg-orange-700 text-zinc-300 px-[10px] py-[2px] rounded-full text-md">
                          J
                        </span>
                      </p>
                      <p className="text-zinc-400">This is an awesome offer</p>
                    </div>
                    <div
                      className="flex items-center gap-[20px] mb-[16px] pb-[10px]"
                      style={{ borderBottom: "1px solid #5c5b5b" }}
                    >
                      <p className="">
                        <span className="bg-orange-700 text-zinc-300 px-[10px] py-[2px] rounded-full text-md">
                          J
                        </span>
                      </p>
                      <p className="text-zinc-400">This is an awesome offer</p>
                    </div>
                    <div
                      className="flex items-center gap-[20px] mb-[16px] pb-[10px]"
                      style={{ borderBottom: "1px solid #5c5b5b" }}
                    >
                      <p className="">
                        <span className="bg-orange-700 text-zinc-300 px-[10px] py-[2px] rounded-full text-md">
                          J
                        </span>
                      </p>
                      <p className="text-zinc-400">This is an awesome offer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* recommended */}

            <div className="mt-[20px] pb-[20px]">
              <h2 className="mb-[20px] text-xl">Recommended</h2>

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
                  {DummyProducts.map((item) => (
                    <div key={item.id}>
                      {item.category == product.category && (
                        <div>
                          <Link to={`/post/${item.id}`}>
                            <img
                              src={item.mainPhoto}
                              style={{ flexShrink: 0, marginRight: "10px" }}
                              className="h-[200px] w-[200px] object-cover cursor-pointer"
                            />
                          </Link>
                        </div>
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
