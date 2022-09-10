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
npm install axios react-google-login react-icons uuidv4 zustand
npm install --legacy-peer-deps
```

### In the project root folder:

Edit the .gitignore file. Change /node_modules to node_modules
This targets all modules within the project folder
Next, delete .babelrc, yarn.lock files

###

In tailwind.config.js add the twitter hex color to use in SidebarRow.js:

```
 extend: {
      colors: {
        tiktok: '#F52C56',
      },
    },
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

Next. create a folder called "utils" in the root directory and in it a file called "queries.ts":

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

export const postDetailQuery = (postId: string | string[]) => {
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

export const searchPostsQuery = (searchTerm: string | string[]) => {
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

export const singleUserQuery = (userId: string | string[]) => {
  const query = groq`*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = groq`*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
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

export const userLikedPostsQuery = (userId: string | string[]) => {
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

export const topicPostsQuery = (topic: string | string[]) => {
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

### Create a new API endpoint in pages/api/post/index.ts:

In pages/api/post/index.ts:

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  console.log(data);
  return {
    props: {
      videos: data,
    },
  };
};

```

### Create a custom type by creating a typings.d.ts in the root directory:

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
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  console.log(data);
  return {
    props: {
      videos: data,
    },
  };
};

```

Create 2 new components VideoCard.tsx and NoResults.tsx:
In VideoCard.tsx:

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

Now let's update the components/VideoCard.tsx:

```

```

# Setup Project Structure:

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

Now open styles/global.css:

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

# Creating TypeScript types in Next.js:

You can create types for anything in your application, including prop types, API responses, arguments for your utility functions, and even properties of your global state!

We first create a type for our Video and IUser. The interface below reflects the shape of a Video object and IUser.

typings.d.ts or types.d.ts:

```

```

# Creating components in Next.js:

In Header.tsx:

```


```

We need to fetch new videos everytime the page loads so we use getServerSideProps and axios. We need to make the get request to our own backend and NextJS let's us create our own backend server.

Open index.tsx:

```
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


```

In pages/api create a new folder post/index.ts. Copy the api/hello.ts boilerplate code in post/index.ts.

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "Response Success" });
}


```
