import Footer from "../components/Footer";
import Head from "next/head";
import HomeExplore from "../components/HomeExplore";
import HomeFeatured from "../components/HomeFeatured";
import HomeHero from "../components/HomeHero";
import Navbar from "../components/Navbar";
import type { NextPage } from "next";
import Token from "types/Token";
import { elasticQuery } from "../utils/elastic";

interface HomeProps {
  featuredTokens?: Array<Token>;
  exploreTokens?: Array<Token>;
}

const Home: NextPage<HomeProps> = ({ featuredTokens, exploreTokens }) => {
  return (
    <div>
      <Head>
        <title>Explore tokens on Tokel</title>
        <meta
          name="description"
          content="Explore, buy and sell tokens on Token blockchain. Tokel is a UTXO blockchain with token creation and transaction, including sales, built-in in the consensus mechanism. No complicated code to maintain."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HomeHero />
      <HomeFeatured tokens={featuredTokens} />
      <HomeExplore tokens={exploreTokens} />
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const featuredQuery = await elasticQuery(
    1,
    4,
    { height: "desc" },
    { featured: "true" }
  );

  const exploreQuery = await elasticQuery(
    1,
    12,
    { height: "desc" },
    { "tokenDEX.funcid": "s" }
  );

  return {
    props: {
      featuredTokens: featuredQuery.hits.hits.map((hit: any) => hit._source),
      exploreTokens: exploreQuery.hits.hits.map((hit: any) => hit._source),
    },
  };
}

export default Home;
