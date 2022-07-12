import Head from "next/head";
import React from "react";

interface HtmlHeadProps {
  title: string;
  description?: string;
}

const HtmlHead: React.FC<HtmlHeadProps> = ({
  title,
  description = "Explore, buy and sell tokens on Token blockchain. Tokel is a UTXO blockchain with token creation and transaction, including sales, built-in in the consensus mechanism. No complicated code to maintain.",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HtmlHead;
