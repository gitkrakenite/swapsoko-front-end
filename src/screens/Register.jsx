import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiExchangeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import axios from "../axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (navigator.onLine) {
      console.log("online");
    } else {
      toast.error("Network Error");
    }

    if (isError) {
      // toast.error("Please Check Login Details");
      toast.error("Please Check Network");
    }

    if (isSuccess || user) {
      toast.success("Welcome to swapsoko!");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) {
      return toast.error("username missing");
    } else if (!phone) {
      return toast.error("phone number missing");
    } else if (!password) {
      return toast.error("password missing");
    } else if (password !== cpassword) {
      return toast.error("passwords don't match");
    } else {
      setLoading(true);
      // check whether username already exists
      const nameToCheck = { username };
      const { data } = await axios.post("/user/check", nameToCheck);

      if (data == "not exist") {
        // alert("proceed");
        const userData = { username, phone, password };
        dispatch(register(userData));
        setLoading(false);
        return;
      } else {
        toast.error(`username ${username} exists.`);
        setLoading(false);
        return;
      }

      // if not proceed to register
    }
  };

  return (
    <div className=" px-[10px] sm:px-[3em]">
      <div className=" flex items-start pt-[20px] sm:pt-0 sm:items-center w-full h-[100vh] overflow-y-scroll prompt ">
        <div className=" w-[100%]">
          <form
            className=" w-[98%] sm:w-[90%] lg:w-[80%] xl:w-[60%] m-auto bg-slate-800 p-[10px] rounded-xl"
            onSubmit={handleRegister}
          >
            <div className="mt-[20px] text-2xl  mb-[20px]  flex justify-center items-center gap-[10px]">
              <h2
                className=" text-emerald-600 pt-[10px]"
                style={{ fontWeight: 700 }}
              >
                SWAPSOKO
              </h2>
              <p>
                <RiExchangeLine className="text-orange-600 text-3xl" />
              </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-[15px] mb-[22px]">
              <label htmlFor="username" className="text-zinc-400 text-lg">
                Create A Unique Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Create Username"
                className="bg-transparent p-[8px] rounded-lg"
                style={{ border: "1px solid #4d4c4c" }}
                required
                minLength={5}
                maxLength={15}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/*  */}
            <div className="flex flex-col gap-[15px] mb-[22px]">
              <label htmlFor="phone" className="text-zinc-400 text-lg">
                Enter Your Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="i.e 0798 45xxxx"
                className="bg-transparent p-[8px] rounded-lg"
                style={{ border: "1px solid #4d4c4c" }}
                required
                minLength={5}
                maxLength={15}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/*  */}
            <div className=" mb-[22px]">
              <label
                htmlFor="password"
                className="text-zinc-400 text-lg mb-[10px]"
              >
                Create Secure Password
                <p className="text-sm text-zinc-400">
                  ** range 8 - 20 characters **
                </p>
              </label>

              <div className="flex gap-[15px]">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="i.e ghTvhsYc7845R"
                  className="bg-transparent p-[8px] rounded-lg flex-[0.9]"
                  style={{ border: "1px solid #4d4c4c" }}
                  required
                  minLength={8}
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex-[0.1]">
                  {showPass ? (
                    <AiOutlineEyeInvisible
                      className="text-2xl mt-[8px]"
                      onClick={() => setShowPass(false)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="text-2xl mt-[8px]"
                      onClick={() => setShowPass(true)}
                    />
                  )}
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" mb-[22px]">
              <label
                htmlFor="cpassword"
                className="text-zinc-400 text-lg mb-[10px]"
              >
                Confirm Your Password
              </label>

              <div className="flex gap-[15px]">
                <input
                  type={showPass ? "text" : "password"}
                  id="cpassword"
                  placeholder="i.e ghTvhsYc7845R"
                  className="bg-transparent p-[8px] rounded-lg flex-[0.9]"
                  style={{ border: "1px solid #4d4c4c" }}
                  required
                  minLength={8}
                  maxLength={20}
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
                <div className="flex-[0.1]">
                  {showPass ? (
                    <AiOutlineEyeInvisible
                      className="text-2xl mt-[8px]"
                      onClick={() => setShowPass(false)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="text-2xl mt-[8px]"
                      onClick={() => setShowPass(true)}
                    />
                  )}
                </div>
              </div>
            </div>

            {loading ? (
              <Spinner message="Creating Account ..." />
            ) : (
              <button
                className="mb-[20px] w-full bg-emerald-700 text-zinc-300 p-[10px] rounded-xl"
                onClick={handleRegister}
                type="submit"
              >
                Create Account
              </button>
            )}
            <div className="block md:flex justify-between">
              <p className="mt-[15px] text-zinc-400">
                Not New Here ?{" "}
                <Link to="/login">
                  <span className="text-emerald-600 underline">Sign in</span>
                </Link>{" "}
              </p>
              <p className="mt-[15px] text-zinc-400">
                Contact Admin ?{" "}
                <a href="mailto:daysseller@gmail.com">
                  <span className="text-emerald-600 underline">Click Here</span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
