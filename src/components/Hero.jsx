import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import "./hero.css";
import { toast } from "react-toastify";
import mobile1 from "../assets/images/pic1.png";
// import mobile2 from "../assets/images/exchange.png";
import mobile3 from "../assets/images/pic3.png";
import mobile4 from "../assets/images/pic2.png";

const Hero = () => {
  const textRef = useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      // You can also display a success message or perform any other action after copying.
      toast.success("Copied To Clipboard");
    }
  };

  // mobile stuff

  const heroData = [
    {
      id: 1,
      image: `${mobile1}`,
      text: "Conserve The Environment By Trading",
      url: "create",
    },
    {
      id: 2,
      image: `${mobile4}`,
      text: "Exchange Goods And Services",
      url: "create",
    },
    {
      id: 3,
      image: `${mobile3}`,
      text: "Exchange Junk For Valuable Stuff",
      url: "create",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const handleAutoTransition = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData?.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleAutoTransition, 8000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const handleInteraction = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    // Clear the timer and start a new one when currentIndex changes
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleAutoTransition, 8000);

    // Clean up the timer when the component unmounts or currentIndex changes
    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="mb-[30px]">
      {/* desktop Caraousel */}
      <div className="hidden md:block">
        <Carousel indicators={false}>
          <Carousel.Item interval={7000} className="h-[50vh]">
            <img
              className="d-block w-100 h-[50vh] object-cover rounded-xl"
              src="https://images.pexels.com/photos/761297/pexels-photo-761297.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="First slide"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)] rounded-xl" />
            <Carousel.Caption className=" h-full flex justify-center items-center">
              <Link to="/create">
                <div>
                  <h3
                    className="text-emerald-400 text-4xl lg:text-6xl mb-[30px]"
                    style={{ fontWeight: 700 }}
                  >
                    Your Junk is My Gold
                  </h3>
                  <p className=" text-zinc-300 tracking-wider text-xl  lg:text-2xl mb-[15px]">
                    Preserve the environment By Trading.
                  </p>
                  <p className=" text-zinc-300 tracking-wider text-lg md:text-xl pb-2">
                    Don&#39;t throw away junk. Exchange junk for amazing offers
                  </p>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          {/* second */}
          <Carousel.Item interval={7000} className="h-[50vh]">
            <img
              className="d-block w-100 h-[50vh] object-cover rounded-xl"
              src="https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="First slide"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)] rounded-xl" />
            <Carousel.Caption className=" h-full flex justify-center items-center">
              <div>
                <h3
                  className="text-emerald-400 text-4xl lg:text-6xl mb-[30px]"
                  style={{ fontWeight: 700, lineHeight: "1.3em" }}
                >
                  Exchange Goods And Services
                </h3>
                <p className=" text-zinc-300 tracking-wider text-xl  lg:text-2xl mb-[15px]">
                  Strapped For Cash ? No need to worry.
                </p>
                <p className=" text-zinc-300 tracking-wider text-lg md:text-xl pb-2">
                  Shop cashless and enjoy amazing trades.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          {/* third */}

          <Carousel.Item interval={7000} className="h-[50vh]">
            <div
              className="d-block w-100 h-[50vh] object-cover rounded-xl bg-emerald-600"
              // src="https://images.pexels.com/photos/3174350/pexels-photo-3174350.jpeg?auto=compress&cs=tinysrgb&w=1600"
              // alt="First slide"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] rounded-xl" />
            <Carousel.Caption className=" h-full flex justify-center items-center">
              <div>
                <h3
                  className="text-zinc-300 text-4xl lg:text-6xl mb-[30px]"
                  style={{ fontWeight: 700, lineHeight: "1.3em" }}
                >
                  Exchange Anything You Want
                </h3>
                <p className=" text-zinc-300 tracking-wider text-xl  lg:text-2xl mb-[15px]">
                  It does not have to be big & flashy.
                </p>
                <p className=" text-zinc-300 tracking-wider text-lg md:text-xl pb-2">
                  Trade in any category and get bids for your product.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          {/* fourth */}
          <Carousel.Item interval={7000} className="h-[50vh]">
            <div className="d-block w-100 h-[50vh] object-cover rounded-xl bg-pink-600" />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)] rounded-xl" />
            <Carousel.Caption className=" h-full flex justify-center items-center">
              <div>
                <h3
                  className="text-zinc-300 text-4xl lg:text-6xl mb-[30px]"
                  style={{ fontWeight: 700, lineHeight: "1.3em" }}
                >
                  Conserve The Environment
                </h3>
                <p className=" text-zinc-300 tracking-wider text-xl  lg:text-2xl mb-[15px]">
                  Spread The word Of conserving The Environment.
                </p>

                <p className=" text-zinc-300 tracking-wider text-md mb-[15px]">
                  Copy The Link Below And Share
                </p>

                <div className="flex justify-center gap-[20px] mt-[20px] bg-pink-700 rounded-2xl p-[9px]">
                  <input
                    type="text"
                    ref={textRef}
                    value={`Conserve The environment Through Trading 😊 : https://swap-soko.web.app`}
                    readOnly
                    className="bg-transparent outline-none text-zinc-300"
                  />
                  <button onClick={handleCopy}>
                    <MdOutlineContentCopy
                      className="text-3xl"
                      title="Click To Copy"
                    />
                  </button>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          {/* fifth */}
          <Carousel.Item interval={7000} className="h-[50vh]">
            <div className="d-block w-100 h-[50vh] object-cover rounded-xl bg-pink-600" />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)] rounded-xl" />
            <Carousel.Caption className=" h-full flex justify-center items-center">
              <Link to="/advanced">
                <div>
                  <h3
                    className="text-zinc-300 text-4xl lg:text-6xl mb-[30px]"
                    style={{ fontWeight: 700, lineHeight: "1.3em" }}
                  >
                    Let Us Help You Find It
                  </h3>
                  <p className=" text-pink-300 tracking-wider text-xl  lg:text-2xl mb-[15px]">
                    Access Our Advanced Search Now
                  </p>

                  <p className=" text-zinc-300 tracking-wider text-md mb-[15px]"></p>
                </div>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* mobile carousel */}
      <div className=" md:hidden ">
        {/* <div className="bg-emerald-600 text-zinc-200 flex justify-center py-[2em] rounded-md">
          <div>
            <h2 className="text-2xl">Your Junk is My Gold</h2>
            <p className="text-sm mt-[15px]">
              Exchange junk for amazing products
            </p>
          </div>
        </div> */}
        {/* ==================================== */}
        <div
          className="image-scroller hide-scrollbar"
          onMouseEnter={handleInteraction}
          onMouseLeave={() => {
            timerRef.current = setInterval(handleAutoTransition, 4000);
          }}
        >
          <div
            className="image-scroller-wrapper"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {heroData?.map((item, index) => (
              <div key={index} className="image-scroller-item">
                <Link to={`/${item.url}`}>
                  <img
                    src={item.image}
                    alt={`Image ${index}`}
                    className="rounded-xl"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* ======================================== */}
        {/* <img src={mobile1} alt="" /> */}
      </div>
    </div>
  );
};

export default Hero;
