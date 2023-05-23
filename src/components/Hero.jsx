import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="mb-[30px]">
      <Carousel>
        <Carousel.Item interval={6000} className="h-[300px]">
          <img
            className="d-block w-100 h-[43vh] object-cover rounded-md"
            src="https://images.pexels.com/photos/2625896/pexels-photo-2625896.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-[43vh] bg-[rgba(0,0,0,.8)]" />
          <Carousel.Caption>
            <h3 className="text-xl text-zinc-300 md:text-3xl mb-[30px]">
              Your Junk is My Gold
            </h3>
            <p className=" tracking-wider text-md  md:text-xl mb-[10px]">
              Preserve the environment By Trading.
            </p>
            <p className=" tracking-wider text-md md:text-lg pb-2">
              Don&#39;t throw away junk. Exchange junk for amazing offers
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* second */}
        <Carousel.Item interval={6000} className="h-[300px]">
          <img
            className="d-block w-100 h-[43vh] object-cover rounded-md"
            src="https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-[43vh] bg-[rgba(0,0,0,.6)]" />
          <Carousel.Caption>
            <h3 className="text-xl text-zinc-300 md:text-3xl mb-[30px]">
              Exchange Goods And Services
            </h3>
            <p className="tracking-wider text-md  md:text-xl mb-[10px]">
              Strapped For Cash ? No need to worry.
            </p>
            <p className=" tracking-wider text-md md:text-lg pb-2">
              Search For what you want and exchage your product or service
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* third */}
        <Carousel.Item interval={6000} className="h-[300px]">
          <div
            className="d-block w-100 h-[43vh] object-cover rounded-md bg-emerald-300"
            // src="https://images.pexels.com/photos/3174350/pexels-photo-3174350.jpeg?auto=compress&cs=tinysrgb&w=1600"
            // alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-[43vh] bg-[rgba(0,0,0,.8)]" />
          <Carousel.Caption>
            <h3 className="text-xl text-zinc-300 md:text-3xl mb-[30px]">
              Be environmental Friendly
            </h3>
            <p className="tracking-wider text-md  md:text-xl mb-[10px]">
              Our environment is our responsibility
            </p>
            <p className=" tracking-wider text-md md:text-lg pb-2">
              Exchange junk and scrap For Products That You Want
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* fourth */}
        <Carousel.Item interval={6000} className="h-[300px]">
          <div
            className="d-block w-100 h-[43vh] object-cover rounded-md bg-orange-300"
            // src="https://images.pexels.com/photos/3174350/pexels-photo-3174350.jpeg?auto=compress&cs=tinysrgb&w=1600"
            // alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-[43vh] bg-[rgba(0,0,0,.8)]" />
          <Carousel.Caption>
            <h3 className="text-xl text-zinc-300 md:text-3xl mb-[30px]">
              Let Us Help You Find It
            </h3>
            <p className="tracking-wider text-md  md:text-xl mb-[10px]">
              Use Advanced To Find The best Deal
            </p>
            <p className=" tracking-wider text-md md:text-lg pb-2">
              Simply Type What You Want Leave The rest To Us
            </p>
            <Link className="my-3" to="/advanced">
              <span className="underline tracking-wider text-lg text-emerald-600 p-[9px] rounded-md">
                Advanced
              </span>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
