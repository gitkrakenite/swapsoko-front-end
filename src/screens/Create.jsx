import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "../axios";

const Create = () => {
  // create product states
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [mainPhoto, setMainPhoto] = useState("");
  const [secPhoto, setSecPhoto] = useState("");
  const [thirdPhoto, setThirdPhoto] = useState("");

  const [loadingmainPhoto, setLoadingMainPhoto] = useState("");
  const [loadingsecPhoto, setLoadingSecPhoto] = useState("");
  const [loadingthirdPhoto, setLoadingThirdPhoto] = useState("");

  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [defects, setDefects] = useState("");
  const [used, setUsed] = useState("");
  const [category, setCategory] = useState("");
  const [exchangeFor, setExchangeFor] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const { user } = useSelector((state) => state.auth);

  // uploading mainPhoto
  const postMainPhoto = async (pic) => {
    setLoadingMainPhoto(true);
    if (pic === null || undefined) {
      toast.error("Please select main photo");
      setLoading(false);
      return;
    }

    setImagePreview(URL.createObjectURL(pic));

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "p2jnu3t2");
    try {
      setLoadingMainPhoto(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingMainPhoto(false);
      setMainPhoto(urlData.url);
      toast.success("Uploaded Main Photo");
      console.log(`mainPhoto: ${mainPhoto}`);
    } catch (error) {
      setLoading(false);
      setLoadingMainPhoto(false);
      toast.error("Error uploading Main Photo");
    }
  };

  // uploading secPhoto
  const postSecPhoto = async (pic) => {
    setLoadingSecPhoto(true);
    if (pic === null || undefined) {
      toast.error("Please select second photo");
      setLoading(false);
      return;
    }

    setImagePreview(URL.createObjectURL(pic));

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "p2jnu3t2");
    try {
      setLoadingSecPhoto(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingSecPhoto(false);
      setSecPhoto(urlData.url);
      toast.success("Uploaded Second Photo");
      console.log(`secPhoto: ${secPhoto}`);
    } catch (error) {
      setLoadingSecPhoto(false);
      setLoading(false);
      toast.error("Error Uploading Second Photo");
    }
  };

  // uploading thirdPhoto
  const postThirdPhoto = async (pic) => {
    setLoadingThirdPhoto(true);
    if (pic === null || undefined) {
      toast.error("Please select second photo");
      setLoading(false);
      return;
    }

    setImagePreview(URL.createObjectURL(pic));

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "p2jnu3t2");
    try {
      setLoadingThirdPhoto(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingThirdPhoto(false);
      setThirdPhoto(urlData.url);
      toast.success("Uploaded Third Photo");
      console.log(`thirdPhoto: ${thirdPhoto}`);
    } catch (error) {
      setLoadingThirdPhoto(false);
      setLoading(false);
      toast.error("Error Uploading Third Photo");
    }
  };

  const navigate = useNavigate();

  const handleCreateTrade = async (e) => {
    e.preventDefault();
    if (!title) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Enables smooth scrolling
      });
      return toast.error("Title of Product missing");
    } else if (!description) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Enables smooth scrolling
      });
      return toast.error("Description Needed");
    } else if (!location) {
      return toast.error("Location Needed");
    } else if (!exchangeFor) {
      return toast.error("You Must indicate what you want");
    } else if (!defects) {
      return toast.error("State whethere there are defects");
    } else if (!category) {
      return toast.error("Category of product or service needed");
    } else if (!used || !contactInfo) {
      return toast.error("either duration or contact info missing");
    } else if (!mainPhoto) {
      return toast.error("Main Photo is missing");
    } else if (!secPhoto) {
      return toast.error("Second Photo is missing");
    } else if (!thirdPhoto) {
      return toast.error("Third Photo Missing");
    } else {
      try {
        setLoading(true);
        setCreator(user.username);

        const postData = {
          creator,
          title,
          location,
          description,
          defects,
          used,
          category,
          exchangeFor,
          mainPhoto,
          secPhoto,
          thirdPhoto,
          contactInfo,
        };
        const response = await axios.post("/post", postData);
        setLoading(false);
        toast.success(`Trade for ${title} created`);
        navigate("/");
      } catch (error) {
        setLoading(false);
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
      {/* form to create trade */}
      <div>
        {/* choose between service or product */}
        {/* <div className="mb-[30px]">
          <h2 className="text-3xl text-zinc-400">Create A New Trade ? </h2>
        </div> */}

        <form
          className=" w-[98%] lg:w-[90%] xl:w-[70%] bg-slate-800 rounded-xl m-auto p-[15px] "
          onSubmit={handleCreateTrade}
        >
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label htmlFor="title" className="text-lg text-zinc-400" style={{}}>
              Enter Title Of Product or Service
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** What You Want To Trade **
              </p>
            </label>
            <input
              type="text"
              placeholder="Title i.e iphone 12 or online typing"
              id="title"
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              maxLength={20}
              minLength={5}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label
              htmlFor="description"
              className="text-lg text-zinc-400"
              style={{}}
            >
              Enter a short description
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** Desc Of what You Want To Trade **
              </p>
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="2"
              placeholder="i.e The handset's hardware include a 6.1-inch OLED display, 5nm Apple A14 Bionic processor, and a dual-camera setup with a large sensor. 5G and Face ID are on board, too. The Apple iPhone 12 starting price is $829."
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              minLength={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label
              htmlFor="location"
              className="text-md text-zinc-400"
              style={{}}
            >
              Enter Location Of Product or Service
            </label>
            <input
              type="text"
              placeholder="i.e Kitengela or online"
              id="location"
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              maxLength={25}
              minLength={5}
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label
              htmlFor="defects"
              className="text-md text-zinc-400"
              style={{}}
            >
              Any Defects in the Product ?
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** If it's a service, just say no defects **
              </p>
            </label>
            <input
              type="text"
              placeholder="i.e The charging port is broken "
              id="defects"
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              maxLength={80}
              minLength={4}
              required
              value={defects}
              onChange={(e) => setDefects(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label htmlFor="used" className="text-md text-zinc-400" style={{}}>
              How Long the Product Has been Used ?
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** If it's a service, just say new **
              </p>
            </label>
            <input
              type="text"
              placeholder="i.e. 3 months "
              id="used"
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              maxLength={18}
              minLength={5}
              required
              value={used}
              onChange={(e) => setUsed(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label
              htmlFor="category"
              className="text-md text-zinc-400"
              style={{}}
            >
              Best Category
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** If it's a service, just say service **
              </p>
            </label>
            <select
              name="category"
              id="category"
              className=" bg-slate-800 outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="beauty">Beauty And Health</option>
              <option value="service">Service</option>
              <option value="phones">Phones & Tablet</option>
              <option value="appliances">Appliances</option>
              <option value="computing">Computers</option>
              <option value="gaming">Gaming</option>
              <option value="fashion">Fashion & Design</option>
              <option value="music">Music & Entertainment</option>
              <option value="automobile">Automobile</option>
              <option value="sports">Sports & Wear</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label
              htmlFor="exchange"
              className="text-md text-zinc-400"
              style={{}}
            >
              What Do you Want in Exchange ??
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** Be Specific on what you want **
              </p>
            </label>
            <textarea
              name="exchange"
              id="exchange"
              cols="30"
              rows="2"
              placeholder="i.e I want a JBL bass boosted headphone with theme lights. I prefer black as the color"
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              minLength={5}
              required
              value={exchangeFor}
              onChange={(e) => setExchangeFor(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-[14px] mb-[20px]">
            <label
              htmlFor="contact"
              className="text-md text-zinc-400"
              style={{}}
            >
              Contact Information ?
              <p className="text-zinc-300 text-sm mt-[8px]">
                ** how can I reach you if interested ? **
              </p>
            </label>
            <input
              type="text"
              placeholder="i.e. email me at johndoe@gmail.com or call 011 766 xxxx "
              id="contact"
              className="bg-transparent outline-none p-[5px] rounded-lg"
              style={{ border: "1px solid #8a8888" }}
              maxLength={80}
              minLength={5}
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          {/* images section */}
          <div>
            <h2 className="text-xl">Please Upload the Following images</h2>
            {/* mainPhoto */}
            <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px] bg-slate-700 px-[5px] rounded-lg">
              <div className="flex flex-col gap-2 mt-[20px]">
                <label
                  htmlFor="mainPhoto"
                  className="flex items-center gap-[20px] flex-wrap"
                >
                  <p>Please Select The Main Photo</p>
                  <div className="flex flex-col items-center">
                    {loadingmainPhoto ? (
                      <Spinner message="uploading ..." />
                    ) : (
                      <img
                        src={
                          mainPhoto
                            ? mainPhoto
                            : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                        }
                        alt=""
                        className="w-[100px] h-[100px] object-cover"
                      />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  placeholder="Add Image"
                  accept="image/*"
                  onChange={(e) => postMainPhoto(e.target.files[0])}
                  required
                  id="mainPhoto"
                  className="hidden"
                />
              </div>
            </div>
            {/* secPhoto */}
            <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px] bg-slate-700 px-[5px] rounded-lg">
              <div className="flex flex-col gap-2 mt-[20px]">
                <label
                  htmlFor="secPhoto"
                  className="flex items-center gap-[20px] flex-wrap"
                >
                  <p>Please Select The Second Photo</p>
                  <div className="flex flex-col items-center">
                    {loadingsecPhoto ? (
                      <Spinner message="uploading ..." />
                    ) : (
                      <img
                        src={
                          secPhoto
                            ? secPhoto
                            : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                        }
                        alt=""
                        className="w-[100px] h-[100px] object-cover"
                      />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  placeholder="Add Image"
                  accept="image/*"
                  onChange={(e) => postSecPhoto(e.target.files[0])}
                  required
                  id="secPhoto"
                  className="hidden"
                />
              </div>
            </div>
            {/* thirdPhoto */}
            <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px] bg-slate-700 px-[5px] rounded-lg">
              <div className="flex flex-col gap-2 mt-[20px]">
                <label
                  htmlFor="thirdPhoto"
                  className="flex items-center gap-[20px] flex-wrap"
                >
                  <p>Please Select The Third Photo</p>
                  <div className="flex flex-col items-center">
                    {loadingthirdPhoto ? (
                      <Spinner message="uploading ..." />
                    ) : (
                      <img
                        src={
                          thirdPhoto
                            ? thirdPhoto
                            : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                        }
                        alt=""
                        className="w-[100px] h-[100px] object-cover"
                      />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  placeholder="Add Image"
                  accept="image/*"
                  onChange={(e) => postThirdPhoto(e.target.files[0])}
                  required
                  id="thirdPhoto"
                  className="hidden"
                />
              </div>
            </div>
            {/*  */}
            <div className="mb-[20px]">
              {loading ? (
                <Spinner message="Please Wait ..." />
              ) : (
                <button
                  className="w-full bg-emerald-700 text-zinc-300 rounded-lg p-[10px] text-lg"
                  type="submit"
                  onClick={handleCreateTrade}
                >
                  Create Trade
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
