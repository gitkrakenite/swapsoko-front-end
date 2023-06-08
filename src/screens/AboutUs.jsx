import { Link } from "react-router-dom";
import "./about.css";

const AboutUs = () => {
  return (
    <div className=" pt-[20px] px-[10px] sm:px-[3em]">
      <div className=" w-[95%] sm:w-[90%] 2xl:w-[85%] m-auto">
        {/* topbar */}
        <div>
          <div>
            <Link to="/">
              <h2
                className="text-emerald-500 text-2xl"
                style={{ fontWeight: 700 }}
              >
                SWAPSOKO
              </h2>
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="pt-[3em] px-[1em] xl:px-[4em] 2xl:px-[12em]">
          <div className=" flex justify-between items-center gap-[20px] flex-wrap">
            <div>
              <h2 className="text-2xl mb-[10px]">Exchange Of Goods</h2>
              <h2 className="text-2xl mb-[10px]">And Services</h2>
            </div>
            <div className="flex  gap-[20px] w-[full] overflow-x-scroll sm:overflow-x-hidden">
              <img
                src="https://global-uploads.webflow.com/618ac079e7dd392826f282d6/61d2ead912b5848e0d4c9693_2Untitled-2.jpg"
                alt=""
                className="w-[210px] h-[210px] object-cover rounded-lg"
              />
              <img
                src="https://global-uploads.webflow.com/618ac079e7dd392826f282d6/61ea997a8e25a200278f8014_61d2ead9f463973775dda037_1Untitled-1.jpg"
                alt=""
                className="w-[210px] h-[210px] object-cover rounded-lg"
              />
            </div>
          </div>
          {/*  */}
          <div className="mt-[1em] flex flex-col lg:flex-row justify-between items-center gap-[20px] flex-wrap">
            <div className=" flex-[0.4] 2xl:flex-[0.6]">
              <p className="text-lg mb-[10px]">
                Exchange goods and services without the need for cold hard cash
              </p>
              <p className="text-lg">Shop Cashless Today</p>
            </div>
            <div className="flex flex-col md:flex-row gap-[20px] flex-[0.6] 2xl:flex-[0.4]">
              <img
                src="https://global-uploads.webflow.com/618ac079e7dd392826f282d6/61d2ead90a037e3acd8a8938_3Untitled-3.jpg"
                alt=""
                className=" w-full md:w-[280px] md:h-[178px] object-cover rounded-lg"
              />
              <img
                src="https://global-uploads.webflow.com/618ac079e7dd392826f282d6/61d2ead8711659271d552213_4Untitled-3.jpg"
                alt=""
                className=" w-full md:w-[280px] md:h-[178px] object-cover rounded-lg"
              />
            </div>
          </div>
          {/*  */}
          <div className="my-[4em] text-center">
            <h2
              className="text-emerald-400 mb-[15px] text-lg"
              style={{ fontWeight: 600 }}
            >
              Our Environment Is Our Responsibility
            </h2>
            <p className="text-zinc-400">Exchange Junk For Valuables</p>
          </div>
          <div className="mt-[3em] flex flex-col xl:flex-row p-[20px] justify-between items-center gap-[10px]">
            <div className="flex flex-col md:flex-row gap-[20px]">
              <img
                src="https://images.pexels.com/photos/761297/pexels-photo-761297.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="w-full md:w-[280px] md:h-[250px] object-cover rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/7048255/pexels-photo-7048255.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="w-full md:w-[280px] h-[300px] md:h-[250px] object-cover rounded-lg"
              />
            </div>
            <div>
              <p className=" text-xl sm:text-2xl mb-[10px]">
                Conserve The Environment Through Trade
              </p>
              <p className="text-lg text-emerald-500 flex justify-start">
                Your Trash May be My Gold
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="py-[2em] sm:px-[2em] lg:px-[5em]">
          <p
            className="text-center my-[1em] text-2xl"
            style={{ fontWeight: 600 }}
          >
            WHO WE ARE
          </p>
          <p className="text-lg mb-[10px]">
            We understand that times are tough. Inflation is high and needs are
            ever increasing. At swapsoko we got your back.
          </p>
          <p className="text-lg mb-[10px]">
            We are a platform that seeks to provide a space where people can
            meet (soko) and exchange what they are not using for what they need.
          </p>
          <p className="text-lg mb-[10px]">
            Normally you would exchange something with cash. That is what we
            call buying a product. On this platfrom you do not need cash to
            shop. Simply look for a product / service you want and create a bid
            for the product. (shop cashless).
          </p>
          <p className="text-lg mb-[10px]">
            You no longer need to throw away that dusty microwave. Simply put it
            on the site and exchange it with whatever you want. Get
            notifications when someone bids on your product. Let us conserve the
            environment through trade.
          </p>
        </div>

        {/*  */}
        <div className="py-[2em] sm:px-[2em] lg:px-[5em]">
          <p
            className="text-center my-[1em] text-2xl"
            style={{ fontWeight: 600 }}
          >
            HOW TO USE
          </p>
          <p className="text-lg mb-[10px]">
            You DO NOT need an account to see the products / services on the
            platform.
          </p>
          <p className="text-lg mb-[10px]">
            You NEED an account to create an exchange, get notifications, add to
            favorites and bid on any product / service on the platform.
          </p>
          <p className="text-lg mb-[10px]">
            Our platform is easy to use. With a dark theme that spares the eyes
            from ache and a flexible layout that works on a laptop, tablet and
            mobile phone, be it iphone or android.
          </p>
          <p className="text-lg mb-[10px]">
            You can search for a product, filter through our categories or use
            our advanced search engine. Once you identify a product / service
            you want, click on it and you should see the item&apos;s details.
            You can see live bids on the product and if you have an account,
            creat a bid yourself.
          </p>
          <p className="text-lg mb-[10px]">
            Once you create a bid and the owner likes it, the owner will call
            you through the phone number you provided when registering.
          </p>
          <p className="text-lg mb-[10px]">
            You can create an exchange. Simply click on the exchange button at
            the top of the screen. Enter all the details needed and then click
            on the create button at the end. You will be prompted to click it
            again to confirm. Your exchange will appear first.
          </p>
          <p className="text-lg mb-[10px]">
            If you like a product / service and you would like to get back to it
            later, you can click on the heart shaped icon to add to favorites.
            At the top of the screen, pressing the heart shaped icon will take
            you to favorites.
          </p>
          <p className="text-lg mb-[10px]">
            If you and another user agree to exchange products, you are required
            to : <br />{" "}
            <span className="mt-[20px] text-xl">
              1. Package and Box your product nicely. <br />
              2. Attach the other user&apos;s admission number / national ID
              number, phone number and delivery address. <br />
              3. Then bring your product to our store so that check the product
              for any damages before we deliver. <br />
              4. When your package arrives at our store we will call you to
              notify you.
            </span>
          </p>
        </div>
        {/*  */}
        <div className="py-[2em] sm:px-[2em] lg:px-[5em]">
          <p
            className="text-center my-[1em] text-2xl"
            style={{ fontWeight: 600 }}
          >
            PRICING
          </p>
          <p className="text-lg mb-[18px] text-center text-em">
            We have to pay the bills somehow.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-[20px] mt-[1em]">
            {/* item 1 */}
            <div className="flex-[0.5]">
              <img
                src="https://images.pexels.com/photos/6994119/pexels-photo-6994119.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="w-[500px] h-[400px] object-cover rounded-lg"
              />
              <div>
                <p className="py-[15px] text-xl" style={{ fontWeight: 600 }}>
                  DELIVERY
                </p>
                <p className="sm:w-[75%]">
                  When your product arrives at our store, we will call you to
                  notify you. If you choose delivery, we will ask for ksh.50 on
                  delivery.
                </p>
              </div>
            </div>
            {/* item 2 */}
            <div className="flex-[0.5]">
              <img
                src="https://images.pexels.com/photos/7430701/pexels-photo-7430701.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="w-[500px] h-[400px] object-cover rounded-lg"
              />
              <div>
                <p className="py-[15px] text-xl" style={{ fontWeight: 600 }}>
                  MONTHLY SUBSCRIPTION
                </p>
                <p className="sm:w-[75%]">
                  We will be asking for ksh.20 at the end of every month so that
                  you can continue using our platform. We have decided to be
                  open and honest about this rather than use shady ads and
                  deals.
                </p>
              </div>
            </div>
          </div>
          <div className="pt-[1em]">
            <h2 className="py-[15px] text-xl" style={{ fontWeight: 600 }}>
              How To Pay
            </h2>
            <ul className="text-lg">
              <li>1. Jump into your M-Pesa</li>
              <li>2. Send Money</li>
              <li>3. Please Enter 0798 556471</li>
              <li>4. Amount ksh.20</li>
              <li>5. Confirm Payment</li>
              <li>
                6.{" "}
                <a
                  href="mailto:daysseller@gmail.com"
                  className="text-emerald-500 hover:text-emerald-300 underline"
                >
                  Email Us Confirmation Message and add your username
                </a>
              </li>
            </ul>
            <p className="mt-[2em] text-lg">
              ** Disclaimer ** Account Activation range, 1min - 2hrs **. If you
              account is not re-activated within this range please{" "}
              <a href="tel:0798556471" className="text-emerald-500">
                call us (0798 556471)
              </a>{" "}
              immediately.
            </p>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default AboutUs;
