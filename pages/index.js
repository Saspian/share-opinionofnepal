import Head from "next/head";
import ArticleList, { opinionID } from "../components/articleList";
import { OPINION_LIST, SINGLE_OPINION } from "../components/query";
import styles from "../styles/Home.module.css";
import { initializeApollo } from "../lib/apolloClient";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Opinion list</h1>
      </main>
      <ArticleList />
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
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
