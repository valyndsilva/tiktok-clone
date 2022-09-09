import Head from "next/head";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = React.PropsWithChildren<{}>;

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>TikTok Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="TikTok Clone" />
      </Head>

      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Header />
        <div className="flex gap-6 md:gap-20 ">
          <Sidebar />
          <main className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 ">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
