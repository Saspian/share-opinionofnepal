import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SINGLE_OPINION } from "../../components/query";
import Head from "next/head";
import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
// import apolloClient from "../../lib/apolloClient";
import { initializeApollo } from "../../lib/apolloClient";

export default function SingleArticle({ opinion }) {
  const router = useRouter();
  const { id } = router.query;

  let content = ReactHtmlParser(opinion.text);
  let title = `${opinion.title} - Opinion of Nepal`;
  let sector = opinion.sector;
  let image = "https://opinionofnepal.com/opinion-logo.png";
  let currentUrl = "http://share.opinionofnepal.com" + router.asPath;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={content[0]?.props?.children[0]} />
        <meta property="url" content={currentUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://share.opinionofnepal.com" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={content[0]?.props?.children[0]}
        />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="http://share.opinionofnepal.com"
        />
        <meta property="twitter:title" content={title} />
        <meta
          property="twitter:description"
          content={content[0]?.props?.children[0]}
        />
        <meta property="twitter:image" content={image} />
      </Head>
      <section>
        <a
          href={`https://dev.opinionofnepal.com/articles/${sector?.toLowerCase()}/${id}`}
        >
          <h1>{title}</h1>
        </a>
      </section>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: SINGLE_OPINION,
    variables: {
      opinion_id: params.id,
    },
  });

  return {
    props: {
      opinion: data.opinion,
    },
  };
}
