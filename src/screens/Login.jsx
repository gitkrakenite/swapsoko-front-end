import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiExchangeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Action Failed");
    }

    if (user || isSuccess) {
      navigate("/");
      toast.success("Welcome Back");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, isLoading, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) {
      return toast.error("username missing");
    } else if (!password) {
      return toast.error("password missing");
    } else {
      const userData = { username, password };
      dispatch(login(userData));
    }
  };

  return (
    <div className=" px-[10px] sm:px-[3em]">
      <div className=" flex  items-center w-full h-[100vh] overflow-y-scroll prompt ">
        <div className=" w-[100%]">
          <form
            className=" w-[98%] sm:w-[90%] lg:w-[80%] xl:w-[60%] m-auto bg-slate-800 p-[10px] rounded-xl"
            onSubmit={handleLogin}
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
                Enter Your Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="i.e johndoe"
                className="bg-transparent p-[8px] rounded-lg outline-none"
                style={{ border: "1px solid #4d4c4c" }}
                required
                minLength={5}
                maxLength={15}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/*  */}
            <div className=" mb-[22px]">
              <label
                htmlFor="password"
                className="text-zinc-400 text-lg mb-[10px]"
              >
                Enter Your Password
              </label>

              <div className="flex gap-[15px]">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="i.e ghTvhsYc7845R"
                  className="bg-transparent p-[8px] rounded-lg flex-[0.9] outline-none"
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

            {isLoading ? (
              <Spinner message="Signin you in .." />
            ) : (
              <button
                className="mb-[20px] w-full bg-emerald-700 text-zinc-300 p-[10px] rounded-xl"
                onClick={handleLogin}
                type="submit"
              >
                Sign In
              </button>
            )}
            <p className="mt-[15px] text-zinc-400">
              Are You New Here ?{" "}
              <Link to="/register">
                <span className="text-emerald-600 underline">
                  Create Account
                </span>
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
