import axios from "axios";
import { NextPage } from "next";
import { NoResults, VideoCard } from "../components";
import { Video } from "../typings";
interface IProps {
  videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div className="flex flex-col gap-10 h-full videos">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // const res = await axios.get(`http://localhost:3000/api/post`);
  // console.log(res.data.name);

  // fetch new videos each time we load the page
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  console.log(data);
  return {
    props: {
      videos: data,
    },
  };
};
