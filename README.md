# TikTok Clone:

## Tech Stack Used:

- React
- Next.js
- Tailwind CSS
- TypeScript
- Server Side Rendering
- Sanity CMS
- GoogleAuth
- React icons

## Scripts Used:

```
npx create-next-app tiktok-clone --typescript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd tiktok-clone
```

### Install Project Dependencies:

```
npm install axios @react-oauth/google react-icons uuidv4 zustand
npm install --legacy-peer-deps
```

### In the project root folder:

Edit the .gitignore file. Change /node_modules to node_modules
This targets all modules within the project folder
Next, delete .babelrc, yarn.lock files

# Setup Components Structure:

In components folder create index.tsx and Layout.tsx:

In Layout.tsx:

```
import Head from "next/head";
import React from "react";

type LayoutProps = React.PropsWithChildren<{}>;
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>TikTok Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="TikTok Clone" />
      </Head>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;

```

In index.tsx:

```
export { default as Layout } from "./Layout";
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as FooterList } from "./FooterList";
export { default as Sidebar } from "./Sidebar";
export { default as Discover } from "./Discover";
export { default as SuggestedAccounts } from "./SuggestedAccounts";
export { default as VideoCard } from "./VideoCard";
export { default as NoResults } from "./NoResults";
export { default as Comments } from "./Comments";
export { default as LikeButton } from "./LikeButton";
export { default as SearchInput } from "./SearchInput";
export { default as ProfileInfo } from "./ProfileInfo";

```

In pages folder create 404.tsx, \_document.tsx:

In 404.tsx:

```
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div className="text-center text-gray-600 font-semibold mt-20 text-2xl">
      Oops! page not found 😢
    </div>
  );
};

export default NotFound;

```

In \_document.tsx:

```
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

```

Open \_app.tsx:

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

```

In pages/index.tsx clear the unwanted bits:

```
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      TikTok
    </div>
  );
};

export default Home;

```

Also, create a utils folder in the root and in it index.ts:

```
import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export const createOrGetUser = async (response: any) => {
export const createOrGetUser = async (response: any, addUser: any) => {
  console.log(response.credential); // returns a json web token
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  ); // sub is a unique identifier for every user
  console.log(decoded); // returns a json object
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`, user);
};

```

In utils folder also create a constants.tsx:

```
import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";

export const topics = [
  {
    name: "development",
    icon: <BsCode className="w-6 h-6" />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses className="w-6 h-6" />,
  },
  {
    name: "gaming",
    icon: <FaGamepad className="w-6 h-6" />,
  },
  {
    name: "food",
    icon: <GiCakeSlice className="w-6 h-6" />,
  },
  {
    name: "dance",
    icon: <GiGalaxy className="w-6 h-6" />,
  },
  {
    name: "beauty",
    icon: <GiLipstick className="w-6 h-6" />,
  },
  {
    name: "animals",
    icon: <FaPaw className="w-6 h-6" />,
  },
  {
    name: "sports",
    icon: <FaMedal className="w-6 h-6" />,
  },
];

export const footerList1 = [
  "About",
  "TikTok Browse",
  "Newsroom",
  "TikTok Shop",
  "Contact",
  "Careers",
  "ByteDance",
];
export const footerList2 = [
  "TikTik for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "TikTik Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];

```

### Tailwind CSS

Open styles/global.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.videos::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(237, 237, 237);
  border-radius: 40px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

```

Next open tailwind.config.js:

In tailwind.config.js add the twitter hex color to use in SidebarRow.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        1600: "1600px",
        400: "400px",
        450: "450px",
        210: "210px",
        550: "550px",
        260: "260px",
        650: "650px",
      },
      height: {
        600: "600px",
        280: "280px",
        900: "900px",
        458: "458px",
      },
      top: {
        " 50%": "50%",
      },
      backgroundColor: {
        primary: "#F1F1F2",
        blur: "#030303",
      },
      colors: {
        primary: "rgb(22, 24, 35)",
        tiktok: "#F52C56",
      },
      height: {
        "88vh": "88vh",
      },
      backgroundImage: {
        "blurred-img":
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
      },
    },
  },
  plugins: [],
};

```

Next test your app if tailwind works properly:
In index.tsx:

```
 <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
```

## Install Sanity Studio:

```
sudo npm install -g @sanity/cli
sanity login
sanity init --coupon sonny2022
Create dataset: Yes
Project output path: sanity-studio
Select project template:
cd sanity-studio
npm install @portabletext/react @sanity/image-url
sanity start
Go to http://localhost:3333
```

Next, create a folder called lib in root directory and 2 files in it called config.js and sanity.js.

In lib/config.js:

```
export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: 'v1', // or today's date for latest
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

```

In lib/sanity.js

```
import { createClient } from 'next-sanity';
import { config } from './config';

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}

// Set up client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

```

Create a file called .env.local in the root of your project.

```
NEXT_PUBLIC_SANITY_DATASET=value
NEXT_PUBLIC_SANITY_PROJECT_ID=value
NEXT_PUBLIC_SANITY_TOKEN=value
```

Open sanity.io/manage:

```
Click on Datasets to get the NEXT_PUBLIC_SANITY_DATASET value
Copy Project Id and paste into NEXT_PUBLIC_SANITY_PROJECT_ID
Settings => API settings => Tokens => Create Tokens
Name: twitter-clone
Permissions Option: Editor
Create Token.
Copy the token value and paste into NEXT_PUBLIC_SANITY_TOKEN in env.local
Next go to Settings => API settings => CORS Origins => Add CORS origin
Origin: http://localhost:3000
Check Allow Credentials
Save
```

If you don't set the CORS origin you won't be able to access the data from your app.

After updating the .env.local restart in root directory:

```
npm run dev
```

### Create new schemas:

In sanity-studio/schemas folder create the different schema files:

In sanity-studio/schemas/user.js

```
export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string", // we will use a image url so we set type to string
    },
  ],
};

```

In sanity-studio/schemas/comment.js

```
export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "postedBy",
      title: "Posted By",
      type: "postedBy",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string", // we will use a image url so we set type to string
    },
  ],
};

```

In sanity-studio/schemas/postedBy.js

```
export default {
  name: "postedBy",
  title: "Posted By",
  type: "reference", // reference type connects 2 different documents
  to: [{ type: "user" }], // reference to an array of users
};

```

In sanity-studio/schemas/post.js

```
export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        hotspot: true,
      },
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
    {
      name: "topic",
      title: "Topic",
      type: "string",
    },
  ],
};

```

Next, import all the schemas in the sanity-studio/schemas/schema.js:

```
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import user from "./user";
import postedBy from "./postedBy";
import comment from "./comment";
import post from "./post";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    user,
    comment,
    postedBy,
    post,
  ]),
});

```

Add a new user and post in the sanity studio interface.

### Prepare GROQ queries:

Install a package in the root directory folder:

```
npm install --dev next-sanity
npm install --save groq
```

Next in "utils" in the root directory create a file called "queries.ts":

In utils/queries.ts:

```
import { groq } from "next-sanity";
export const allPostsQuery = () => {
  const query = groq`*[_type == "post"] | order(_createdAt desc){
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
        postedBy->{
          _id,
          userName,
          image
        },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

export const postDetailQuery = (postId: string | string[] | undefined) => {
  const query = groq`*[_type == "post" && _id == '${postId}']{
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
       likes,
      comments[]{
        comment,
        _key,
        postedBy->{
          _ref,
        _id,
      },
      }
    }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[] | undefined) => {
  const query = groq`*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
  likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;
  return query;
};

export const singleUserQuery = (userId: string | string[] | undefined) => {
  const query = groq`*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = groq`*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (
  userId: string | string[] | undefined
) => {
  const query = groq`*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,

      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[] | undefined) => {
  const query = groq`*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,

      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[] | undefined) => {
  const query = groq`*[_type == "post" && topic match '${topic}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,

      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;

  return query;
};

```

## Implementing Server-Side Rendering:

React loads the entire bundle on the users browser which takes long. Therefore SSR is recommended.
In SSR all the JS is handled on the server and the user gets the output of the response.
NextJS gives us API endpoints out of the box.
We will create an endpoint for fetching posts and then fetch from our own server.
Instead of contacting sanity directly from our browser we will create npm endpoints and connect to these endpoints which then on our server makes communication to sanity. This is also a safer alternative.

### Create a new backend API endpoint in pages/api/post/index.ts:

In pages/api/post/index.ts:

```
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";
import { allPostsQuery } from "../../../utils/queries";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "GET") {
    const query = allPostsQuery();
    const data = await sanityClient.fetch(query);
    res.status(200).json(data);
  }
}
```

### Implement getServerSideProps:

Open pages/index.tsx and add the special function called getServerSideProps

```
import type { NextPage } from "next";
import axios from "axios";
import { BASE_URL } from "../utils";

// interface IProps{
// videos:
// }

const Home: NextPage = ({ videos }) => {
  console.log(videos);
  return (
    <div>
      <h1 className="text-3xl font-bold underline"></h1>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // const res = await axios.get(`http://localhost:3000/api/post`);
  // console.log(res.data.name);

  // fetch new videos each time we load the page
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  console.log(data);
  return {
    props: {
      videos: data,
    },
  };
};

```

### Create a custom TypeScript type by creating a typings.d.ts in the root directory:

You can create types for anything in your application, including prop types, API responses, arguments for your utility functions, and even properties of your global state!
We first create a type for our Video and IUser. The interface below reflects the shape of a Video object and IUser.
typings.d.ts or types.d.ts:

Refer to pages/index.tsx videos props structure in the browser console and create a typings.d.ts in the root directory accordingly.

```
export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

```

Now update pages/index.tsx with the custom typings.d.ts and create the interface:

```
import { NextPage } from "next";
import axios from "axios";
import { BASE_URL } from "../utils";
import { Video } from "../typings";

interface IProps {
  videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div>
      <h1 className="text-3xl font-bold underline"></h1>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // const res = await axios.get(`http://localhost:3000/api/post`);
  // console.log(res.data.name);

  // fetch new videos each time we load the page
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  console.log(data);
  return {
    props: {
      videos: data,
    },
  };
};

```

In VideoCard.tsx:
Create 2 new components VideoCard.tsx and NoResults.tsx:

```
import { NextPage } from "next";
import React from "react";
import { Video } from "../typings";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  console.log(post.caption);
  return <div>VideoCard</div>;
};

export default VideoCard;

```

In NoResults.tsx:

```
import { NextPage } from "next";
import React from "react";

interface IProps {
  text: string;
}

const NoResults: NextPage<IProps> = ({ text }) => {
  return <div>NoResults</div>;
};

export default NoResults;

```

Next update pages/index.tsx with VideoCard and NoResults components:

```
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


```

Now let's update the look and feel of components/VideoCard.tsx:

```
import { NextPage } from "next";
import React, { useRef, useState } from "react";
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
    <div className="flex flex-col border-b-[1px] border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            {/* We cannot add an Image as a child component of a Link directly so add between <> </> */}
            <Link href="/">
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
            <Link href="/">
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
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href="/">
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

```

## Implement the Upload Videos Page:

### Google Identity Services:

To upload a video we need to be authenticated users.
Refer https://developers.google.com/identity/sign-in/web
Use npm package: https://www.npmjs.com/package/@react-oauth/google

Google Identity Services only allows you to login but doesn't allow you to get profile image or username. So we can decode the JSON Web Token that we get back with the login using jwt-decode.

```
 npm install @react-oauth/google@latest jwt-decode
```

To get the clientId we need to https://console.cloud.google.com
Create New Project
name: tiktok-clone
organization: No organization
Create
Select Project

Open the Sidebar -> More Products -> APIs & Services -> Credentials
Click on Configure Consent Screen -> External -> Create
Under App information
App name: tiktok-clone
User support email: your email address
Under Developer contact information
Email address: your email address
Save and Continue
Scope: no changes
Save and Continue
Test Users: no changes
Back To Dashboard

Open the Sidebar -> More Products -> APIs & Services -> Credentials
Create Credentials -> OAuth Client ID
Application type: Web application
Name: tiktok-clone
Under Authorized JavaScript origins:
Add URI:
http://localhost
http://localhost:3000
Under Authorized redirect URIs:
Add URI:
http://localhost
Save

This creates the OAuth client ID. Copy the clientID and add it to the .env.local file:

```
NEXT_PUBLIC_GOOGLE_API_TOKEN=your clientID
```

Now, go to pages/\_app.tsx and wrap the whole component between <GoogleOAuthProvider clientId=""></GoogleOAuthProvider>:

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }: AppProps) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoogleOAuthProvider>
  );
}

export default MyApp;

```

## Create a Global state

We need to create a global state that will be persistent.
In .env.local create

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

In utils folder create index.ts:

```
import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any) => {
  console.log(response.credential); // returns a json web token
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  ); // sub is a unique identifier for every user
  console.log(decoded); // returns a json object
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  // addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);

};

```

Create a new api endpoint pages/api/auth.ts:

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "POST") {
    const user = req.body;

    // Creates a new user inside sanity db
    sanityClient
      .createIfNotExists(user)
      .then(() => res.status(200).json("Login Success"));
  }
}

```

Go to components/Header.tsx and import the GooglLogin and googleLogout:

```
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SiTiktok } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { IUser } from "../typings";
// import useAuthStore from '../store/authStore';

function Header() {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  // const { userProfile, addUser, removeUser } = useAuthStore();

  // useEffect(() => {
  //   setUser(userProfile);
  // }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="w-full max-w-7xl flex justify-between items-center border-b-[1px] border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="flex  items-center justify-center">
          <SiTiktok className="text-black w-7 h-7" />
          <span className="text-black text-2xl md:text-3xl font-bold">
            TikTok
          </span>
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white flex items-center justify-center"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 text-sm font-medium border-[1px] border-gray-100 focus:outline-none focus:border-[1px] focus:border-gray-400 w-[300px] md:w-[350px] rounded-full  md:top-0 placeholder:font-light placeholder:text-sm"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-3 right-4 border-l-2 border-gray-300 pl-3 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                // removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            // onSuccess={(response) =>  console.log(response)}
            onSuccess={(response) => createOrGetUser(response)}
            // onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </div>
  );
}

export default Header;


```

Now if you try to SignIn it creates a new user in the Sanity dashboard.

We need to save the state somewhere and we use Zustand for this project.

## Create a Store:

Create a store folder in the root directoy. In it authStore.ts:

```

import create from "zustand";
import { persist } from "zustand/middleware"; // persists lets the state remains active even after the page reload.
import axios from "axios";

import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;

```

Use the store state in Header.tsx:

```
...
import useAuthStore from '../store/authStore';

function Header() {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

...
 <GoogleLogin
            // onSuccess={(response) =>  console.log(response)}
            // onSuccess={(response) => createOrGetUser(response)}
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />

```

Now in utils/index.ts:
Include addUser as the 2nd parameter in createOrGetUser:

```
import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export const createOrGetUser = async (response: any) => {
  export const createOrGetUser = async (response: any, addUser: any) => {
  console.log(response.credential); // returns a json web token
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  ); // sub is a unique identifier for every user
  console.log(decoded); // returns a json object
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`, user);

};

```

The user state is now persistent.

In Header.tsx:

```
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SiTiktok } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { IUser } from "../typings";
import useAuthStore from '../store/authStore';

function Header() {
  // const user= false;
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
console.log(userProfile);
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="w-full max-w-7xl flex justify-between items-center border-b-[1px] border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="flex  items-center justify-center">
          <SiTiktok className="text-black w-7 h-7" />
          <span className="text-black text-2xl md:text-3xl font-bold">
            TikTok
          </span>
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white flex items-center justify-center"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 text-sm font-medium border-[1px] border-gray-100 focus:outline-none focus:border-[1px] focus:border-gray-400 w-[300px] md:w-[350px] rounded-full  md:top-0 placeholder:font-light placeholder:text-sm"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-3 right-4 border-l-2 border-gray-300 pl-3 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-[1px] px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className=" border-[1px] p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                removeUser(); // remove from local storage
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            // onSuccess={(response) =>  console.log(response)}
            // onSuccess={(response) => createOrGetUser(response)}
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </div>
  );
}

export default Header;

```

If you click on the upload button it takes you to the http://localhost:3000/upload. Create pages/upload.tsx:
In upload.tsx"

```
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { sanityClient } from "../lib/sanity";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [loading, setLoading] = useState<Boolean>(false);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  useEffect(() => {
    if (!userProfile) router.push("/");
  }, [userProfile, router]);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      sanityClient.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);

      const doc = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, doc);

      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption("");
    setTopic("");
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className=" bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {loading ? (
              <p className="text-center text-3xl text-red-400 font-semibold">
                Uploading...
              </p>
            ) : (
              <div>
                {!videoAsset ? (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Select video to upload
                        </p>
                      </div>

                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={(e) => uploadVideo(e)}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                    <video
                      className="rounded-xl h-[462px] mt-16 bg-black"
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                    <div className=" flex justify-between gap-20">
                      <p className="text-lg">{videoAsset.originalFilename}</p>
                      <button
                        type="button"
                        className=" rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
              Please select an video file (mp4 or webm or ogg)
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium ">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium ">Choose a topic</label>

          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={handleDiscard}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type="button"
              className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              {savingPost ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

```

Next in pages/ap/post/index.ts write the POST method:

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../../lib/sanity";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "GET") {
    const query = allPostsQuery();
    const data = await sanityClient.fetch(query);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const document = req.body;
    sanityClient
      .create(document)
      .then(() => res.status(201).json("Video Created!"));
  }
}
```

Now try upload a new video. It should be added to the sanity dashboard.

Next let's create the video detail page. In pages/create a new folder detail and in it [id].tsx:

```
import React from "react";

const Detail = () => {
  return <div>Detail</div>;
};

export default Detail;

```

In VideoCard.tsx component update this:

```
 <Link href="/">
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            />
          </Link>
```

to this:

```
<Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            />
          </Link>
```

Creating the pages/detail/[id].tsx.
As the url has /detail/id we will use getServerSideProps function to pre-fetch the server side details.

In pages/api/post create [id].tsx:

```
import type { NextApiRequest, NextApiResponse } from "next";

import { postDetailQuery } from "./../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await sanityClient.fetch(query);

    res.status(200).json(data[0]);
  } else if (req.method === "PUT") {
    const { comment, userId } = req.body;

    const { id }: any = req.query;

    const data = await sanityClient
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}

```

In pages/detail/[id].tsx:

```
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import Comments from "../../components/Comments";
import { BASE_URL } from "../../utils";
import LikeButton from "../../components/LikeButton";
import useAuthStore from "../../store/authStore";
import { Video } from "../../typings";
import axios from "axios";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  return (
    <>
      {post && (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p className="cursor-pointer " onClick={() => router.back()}>
                <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
              </p>
            </div>
            <div className="relative">
              <div className="lg:h-[100vh] h-[60vh]">
                <video
                  ref={videoRef}
                  onClick={handleVideoClick}
                  loop
                  src={post?.video?.asset.url}
                  className=" h-full cursor-pointer"
                ></video>
              </div>

              <div className="absolute top-[45%] left-[40%]  cursor-pointer">
                {!isPlaying && (
                  <button onClick={handleVideoClick}>
                    <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                  </button>
                )}
              </div>
            </div>
            <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
                </button>
              )}
            </div>
          </div>
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="lg:mt-20 mt-10">
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={post.postedBy.image}
                  />
                  <div>
                    <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                      {post.postedBy.userName.replace(/\s+/g, "")}{" "}
                      <GoVerified className="text-blue-400 text-xl" />
                    </div>
                    <p className="text-md"> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              <div className="px-10">
                <p className=" text-md text-gray-600">{post.caption}</p>
              </div>
              <div className="mt-10 px-10">
                {userProfile && (
                  <LikeButton
                    likes={post.likes}
                    flex="flex"
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)}
                  />
                )}
              </div>
              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments={post.comments}
                isPostingComment={isPostingComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default Detail;

```

In components/LikeButton.tsx:

```
import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";

interface IProps {
  likes: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({
  likes,
  flex,
  handleLike,
  handleDislike,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997] "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 "
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;

```

Next in pages/api/like.ts:

```
import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4"; // lets you attach a uid to every single like request

import { sanityClient } from "../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;

    const data = like
      ? await sanityClient
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await sanityClient
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    res.status(200).json(data);
  }
}
// Like and unline posts using sanity client

```

In NoResults.tsx:

```
import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        <MdOutlineVideocamOff />
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoResults;

```

We need to fetch all user accounts that exist on the application before fetching the user comments and suggested accounts.

First create a new endpoint for the users in pages/api/users.ts file:

```
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../lib/sanity";
import { allUsersQuery } from "./../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ name: "Response Success" });
  if (req.method === "GET") {
    const data = await sanityClient.fetch(allUsersQuery());

    if (data) {
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
}
```

Open store/authStore.ts:

```
import create from "zustand";
import { persist } from "zustand/middleware"; // persists lets the state remains active even after the page reload.
import axios from "axios";

import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;

```

Next, in components/SuggestedAccounts.tsx:

```
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GoVerified } from "react-icons/go";

import { IUser } from "../typings";

interface Users {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

function SuggestedAccounts({ fetchAllUsers, allUsers }: Users) {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className="xl:border-b-[1px] border-gray-200 pb-4">
      <p className="text-xs text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested accounts
      </p>
      <div>
        {users?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full"
                  src={user.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {user.userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SuggestedAccounts;

```

Next, let's loop over all of the profiles and comments:

In components/Comments.tsx:

```
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=" p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              src={user.image}
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>

                          <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                            {user.userName}{" "}
                            <GoVerified className="text-blue-400" />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No Comments Yet! Be First to do add the comment." />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0  pb-6 px-2 md:px-10 ">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value.trim())}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button className="text-md text-gray-400 " onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;


```

Now, update pages/api/post/[id].ts:

```
import type { NextApiRequest, NextApiResponse } from "next";

import { postDetailQuery } from "./../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(id);

    const data = await sanityClient.fetch(query);

    res.status(200).json(data[0]);

  } else if (req.method === "PUT") {
    const { comment, userId } = req.body;

    const { id }: any = req.query;

    const data = await sanityClient
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data);
  }
}

```

If you leave a comment in the detail page you can see the comments in the sanity dashboard under Post section and the detail page.

Next, we first hav to create a profile page but before that we need to create a new profile api endpoint.

In pages/api/profile/[id].ts:

```
import type { NextApiRequest, NextApiResponse } from "next";

import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "./../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // /api/profile/:id call request
    const { id } = req.query;

    const query = singleUserQuery(id);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);

    const user = await sanityClient.fetch(query);
    const userVideos = await sanityClient.fetch(userVideosQuery);
    const userLikedVideos = await sanityClient.fetch(userLikedVideosQuery);

    const data = { user: user[0], userVideos, userLikedVideos };

    res.status(200).json(data);
  }
}


```

In pages/profile/[id].tsx:

```
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../typings";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>

        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </div>
          <p className="text-sm font-medium"> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};
export default Profile;

```

Update the VideoCard.tsx component profile Links:

```
  <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
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
```

Finally we need to create the search component but before that we need to create a search page to display the results and a backend api endpoint for the search page:

In pages/api/search/[searchTerm].ts:

```
import type { NextApiRequest, NextApiResponse } from "next";

import { searchPostsQuery } from "../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;

    const videosQuery = searchPostsQuery(searchTerm);

    const videos = await sanityClient.fetch(videosQuery);

    res.status(200).json(videos);
  }
}

```

In pages/search/[searchTerm].tsx:

```
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../typings";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="w-full  ">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user-profile"
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary">
                        {user.userName} <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
          {videos.length ? (
            videos.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;

```

In component/SearchInput.tsx:

```
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="relative hidden md:block">
      <form
        onSubmit={handleSearch}
        className="absolute md:static top-10 -left-20 bg-white flex items-center justify-center"
      >
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-primary p-3 text-sm font-medium border-[1px] border-gray-100 focus:outline-none focus:border-[1px] focus:border-gray-400 w-[300px] md:w-[350px] rounded-full  md:top-0 placeholder:font-light placeholder:text-sm"
          placeholder="Search accounts and videos"
        />
        <button
          onClick={handleSearch}
          className="absolute md:right-3 right-4 border-l-2 border-gray-300 pl-3 text-2xl text-gray-400"
        >
          <BiSearch />
        </button>
      </form>
    </div>
  );
}
export default SearchInput;

```

Filtering based on topic filters in the sidebar:

In pages/index.tsx:
In the getServerSideProps method, you can filter by topic using query parameters.
We update the getServerSideProps method from this:

```
export const getServerSideProps = async () => {
  // const res = await axios.get(`http://localhost:3000/api/post`);
  // console.log(res.data.name);

  // fetch new videos each time we load the page
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  console.log(data);
  return {
    props: {
      videos: data,
    },
  };
};
```

To this:

```

export const getServerSideProps = async ({
 query: { topic },
}: {
 query: { topic: string };
}) => {
 let res = null;
 if (topic) {
   res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
 } else {
   res = await axios.get(`${BASE_URL}/api/post`);
 }
 // fetch new videos each time we load the page

 return {
   props: {
     videos: res.data,
   },
 };
};

```

Next we need to create the new endpoint for discover:
In pages/api/discover/[topic].ts:

```
import type { NextApiRequest, NextApiResponse } from "next";

import { topicPostsQuery } from "./../../../utils/queries";
import { sanityClient } from "../../../lib/sanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { topic } = req.query;

    const videosQuery = topicPostsQuery(topic);

    const videos = await sanityClient.fetch(videosQuery);

    res.status(200).json(videos);
  }
}

```

Deploy to Vercel. You should get a 500 Server Error.

Next add the vercel url to Google Cloud Services:
Credentials -> tiktok-clone -> Authorized JavaScript origins & Authorized URIs -> ADD URI

Next add the vercel url to Sanity Dashboard
In Sanity -> API -> CORS Origins
