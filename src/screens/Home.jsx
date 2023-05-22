import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const Home = ({ cartItemCount, setCartItemCount }) => {
  return (
    <div className=" px-[10px] sm:px-[3em]">
      {/* wrapper */}
      <div>
        {/* navbar */}
        <div>
          <Navbar cartItemCount={cartItemCount} />
        </div>
        <div>
          <Feed setCartItemCount={setCartItemCount} />
        </div>
      </div>
    </div>
  );
};

export default Home;
