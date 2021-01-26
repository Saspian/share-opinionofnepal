import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SINGLE_OPINION } from "../../components/query";
import Head from "next/head";
import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

export default function SingleArticle() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [sector, setSector] = useState("");
  const { id } = router.query;
  const { data, error, loading } = useQuery(SINGLE_OPINION, {
    variables: {
      opinion_id: id,
    },
  });

  useEffect(() => {
    setContent(ReactHtmlParser(data?.opinion?.text));
    setSector(data?.opinion?.sector);
  }, [data]);

  let title = data?.opinion?.title;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={content[0]?.props?.children[0]} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev.opinionofnepal.com/" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={content[0]?.props?.children[0]}
        />
        <meta
          property="og:image"
          content="https://opinionofnepal.com/opinion-logo.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://dev.opinionofnepal.com/"
        />
        <meta property="twitter:title" content={title} />
        <meta
          property="twitter:description"
          content={content[0]?.props?.children[0]}
        />
        <meta
          property="twitter:image"
          content="https://opinionofnepal.com/opinion-logo.png"
        />
      </Head>
      <section>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <a
            href={`https://dev.opinionofnepal.com/articles/${sector?.toLowerCase()}/${id}`}
          >
            <h1>{data?.opinion?.title}</h1>
          </a>
        )}
      </section>
    </div>
  );
}
