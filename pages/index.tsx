import Footer from "../components/Footer";
import HomeExplore from "../components/HomeExplore";
import HomeFeatured from "../components/HomeFeatured";
import HomeHero from "../components/HomeHero";
import HtmlHead from "components/HtmlHead";
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
      <HtmlHead title="Tokel Token Explorer - Discover NFTs, tokens, artists, utility and more" />
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
