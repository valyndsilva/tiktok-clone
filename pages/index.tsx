import type { NextPage } from "next";
import axios from "axios";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline"></h1>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // fetch new videos each time we load the page
  const res = await axios.get(`http://localhost:3000/api/post`);
  console.log(res.data.name);
  return {
    props: {},
  };
};
