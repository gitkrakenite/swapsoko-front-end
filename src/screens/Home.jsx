import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className=" px-[10px] sm:px-[3em]">
      {/* wrapper */}
      <div>
        {/* navbar */}
        <div>
          <Navbar />
        </div>
        <div>
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Home;
