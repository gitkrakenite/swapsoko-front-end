import Feed from "../components/Feed";
// import Hero from "../components/Hero";
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
        <div></div>
        <div>
          <Feed setCartItemCount={setCartItemCount} />
        </div>
      </div>
    </div>
  );
};

export default Home;
