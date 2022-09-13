import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "../typings";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  // console.log(post.caption);
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-[1px] border-gray-200 pb-6 ">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center">
          <div className="md:w-16 md:h-16 w-10 h-10">
            {/* We cannot add an Image as a child component of a Link directly so add between <> </> */}
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                  objectFit="cover"
                />
              </>
            </Link>
          </div>
          <div>
          <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex flex-col gap-4 relative">
      <p>{post.caption}</p>
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            />
          </Link>
          {isHover && (
            <div className="flex absolute bottom-6 cursor-pointer left-0 justify-between px-5 lg:w-[600px] w-[200px] items-center">
              {playing ? (
                <button onClick={handleVideoClick}>
                  <BsFillPauseFill className="h-8 w-8" />
                </button>
              ) : (
                <button onClick={handleVideoClick}>
                  <BsFillPlayFill className="h-8 w-8" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="h-7 w-7" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="h-7 w-7" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
