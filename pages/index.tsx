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
  featured?: Array<Token>;
}

const Home: NextPage<HomeProps> = ({ featured }) => {
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
      <HomeFeatured featured={featured} />
      <HomeExplore />
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const query = await elasticQuery(
    1,
    4,
    { height: "desc" },
    { featured: "true" }
  );

  return {
    props: {
      featured: query.hits.hits.map((hit: any) => hit._source),
    },
  };
}

export default Home;
