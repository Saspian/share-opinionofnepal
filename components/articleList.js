import { useQuery } from "@apollo/client";
import { OPINION_LIST } from "./query";

export const opinionID = {
  opinion_id: "5fc661f9845cd64adc2dd73c",
};

export default function ArticleList({ initialState }) {
  return (
    <section>
      {initialState.map((opinion) => {
        return (
          <a key={opinion._id} href={`opinion/${opinion._id}`}>
            <h1>{opinion.title}</h1>
          </a>
        );
      })}
    </section>
  );
}
