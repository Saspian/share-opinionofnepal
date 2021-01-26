import { useQuery } from "@apollo/client";
import { OPINION_LIST } from "./query";

export const opinionID = {
  opinion_id: "5fc661f9845cd64adc2dd73c",
};

export default function ArticleList() {
  const { data, error, loading } = useQuery(OPINION_LIST);

  const { opinions: OpinionsList } = data;

  return (
    <section>
      {OpinionsList.map((opinion) => {
        return (
          <a key={opinion._id} href={`opinion/${opinion._id}`}>
            <h1>{opinion.title}</h1>
          </a>
        );
      })}
    </section>
  );
}
