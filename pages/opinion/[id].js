import { useEffect } from "react";
import { useRouter } from "next/router";
import { SINGLE_OPINION } from "../../components/query";
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";
// import apolloClient from "../../lib/apolloClient";
import { initializeApollo } from "../../lib/apolloClient";
import { environment } from "../../components/utils";

export default function SingleArticle({ opinion }) {
  const router = useRouter();
  const { id } = router.query;

  let content = ReactHtmlParser(opinion.text);
  let title = `${opinion.title} - Opinion of Nepal`;
  let sector = opinion.sector;
  let image = opinion.thumbnail
    ? environment() + opinion.thumbnail
    : "https://opinionofnepal.com/opinion-logo.png";
  let currentUrl = "https://share.opinionofnepal.com" + router.asPath;

  useEffect(() => {
    window.location.href = `${environment()}articles/${sector?.toLowerCase()}/${id}`;
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={content[0]?.props?.children[0]} />
        <meta property="url" content={currentUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={content[0]?.props?.children[0]}
        />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={title} />
        <meta
          property="twitter:description"
          content={content[0]?.props?.children[0]}
        />
        <meta property="twitter:image" content={image} />
      </Head>
      <section>
        <span style={{ color: "#70C03F" }}>redirecting...</span>
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
