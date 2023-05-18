import Carousel from "react-bootstrap/Carousel";
const Hero = () => {
  return (
    <div className="mb-[30px]">
      <Carousel>
        <Carousel.Item interval={2000} className="h-[300px]">
          <img
            className="d-block w-100 h-[43vh] object-cover rounded-md"
            src="https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.6)]" />
          <Carousel.Caption>
            <h3 className="text-3xl mb-[20px]">Exchange Goods And Services</h3>
            <p className="text-xl mb-[10px]">
              Strapped For Cash ? No need to worry.
            </p>
            <p className="text-lg">
              Search For what you want and exchage your product or service
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* second */}
        {/* <Carousel.Item interval={2000}>
          <img
            className="d-block w-100 h-[43vh] object-cover rounded-md"
            src="https://images.pexels.com/photos/6567283/pexels-photo-6567283.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.6)]" />
          <Carousel.Caption>
            <h3 className="text-3xl mb-[20px]">
              Get Ridiculous Offers and Deals
            </h3>
            <p className="text-xl mb-[10px]">Find Amazing Exchange Deals.</p>
            <p className="text-lg">
              You can find an exchange outta this planet
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
        {/* third */}
        {/* <Carousel.Item interval={2000}>
          <img
            className="d-block w-100 h-[43vh] object-cover rounded-md"
            src="https://images.pexels.com/photos/943930/pexels-photo-943930.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.6)]" />
          <Carousel.Caption>
            <h3 className="text-3xl mb-[20px]">
              Exchange Junk For Amazing products
            </h3>
            <p className="text-xl mb-[10px]">
              Do you have a product you are not using ?
            </p>
            <p className="text-lg">Exchange it for anything you want today</p>
          </Carousel.Caption>
        </Carousel.Item> */}
        {/* fourth */}
        {/* <Carousel.Item interval={2000}>
          <img
            className="d-block w-100 h-[43vh] object-cover rounded-md"
            src="https://images.pexels.com/photos/4963437/pexels-photo-4963437.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="First slide"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.6)]" />
          <Carousel.Caption>
            <h3 className="text-3xl mb-[20px]">Exchange Services</h3>
            <p className="text-xl mb-[10px]">You can also exchange services</p>
            <p className="text-lg">
              Do a word Document for me in Exchange for JBL Headphones
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </div>
  );
};

export default Hero;
