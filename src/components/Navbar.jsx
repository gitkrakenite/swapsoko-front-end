import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mb-[20px]">
      {/* desktop wrapper */}
      <div className="flex justify-between items-center pt-[10px] gap-[20px] flex-wrap">
        {/* logo */}
        <div>
          <Link to="/" className="no-underline">
            <h2 className="text-zinc-300 text-xl">SWAPSOKO</h2>
          </Link>
        </div>
        {/* links */}
        {user ? (
          <div>
            <ul className="flex gap-[40px] items-center ">
              <Link to="/create" className="no-underline">
                <li className="text-zinc-400 hover:text-zinc-300">
                  <p>EXCHANGE</p>
                </li>
              </Link>
              <li className="relative">
                <Link to="/fav" className="no-underline">
                  <AiOutlineHeart className="text-emerald-500 text-2xl cursor-pointer" />
                  <p className="absolute bottom-3 left-7 text-sm text-zinc-300">
                    2
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="no-underline">
                  <p className="bg-orange-700 text-zinc-300 rounded-full p-[8px]">
                    {user?.username.slice(0, 2)}
                    {/* JN */}
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <p>
                <span className="bg-orange-800 text-zinc-300 p-[5px] rounded-md">
                  LOGIN NOW
                </span>
              </p>
            </Link>
          </div>
        )}
      </div>
      {/* mobile wrapper */}
      <div>
        {/* logo */}
        {/* links */}
      </div>
    </div>
  );
};

export default Navbar;
