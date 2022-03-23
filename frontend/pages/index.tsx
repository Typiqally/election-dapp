import type { NextPage } from "next";
import Head from "next/head";
import { DApp } from "../components/dapp";
import "../lib/loader.js";

const Home: NextPage = () => {
  return (
    <><Head>
      <title>Candidates</title>
      <meta name="description" content="Election Dapp" />
    </Head>
      <DApp />
    </>
  );
};

export default Home;
