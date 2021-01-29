import Head from "next/head";
import ArticleList, { opinionID } from "../components/articleList";
import { OPINION_LIST, SINGLE_OPINION } from "../components/query";
import styles from "../styles/Home.module.css";
import { initializeApollo } from "../lib/apolloClient";

export default function Home() {
  let title = "Opinion of Nepal";
  let image = "https://opinionofnepal.com/opinion-logo.png";
  let description =
    "Opinion of Nepal (OON) is an opinion sharing platform where people can come and share their ideas and opinions about any given topic, be it an experience, a social issue, a life event, short stories or essays." +
    "OON looks forward to becoming a community based platform, where opinions are nurtured." +
    "Where people can come forward and speak their mind in the hopes of bringing like minded people together.";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev.opinionofnepal.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://dev.opinionofnepal.com/"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>

      <main>
        <h1 className={styles.title}>Opinion list</h1>
      </main>
      <ArticleList />
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: OPINION_LIST,
  });

  await apolloClient.query({
    query: SINGLE_OPINION,
    variables: opinionID,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
