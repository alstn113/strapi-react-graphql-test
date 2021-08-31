import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ReactMarkDown from "react-markdown";
const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      id
      title
      body
      rating
      categories {
        id
        name
      }
    }
  }
`;

function ReviewDetails() {
  const { id } = useParams();

  const { loading, data, error } = useQuery(REVIEW, { variables: { id } });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="review-card">
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>
      {data.review.categories.map((c) => (
        <small key={c.id}>{c.name}</small>
      ))}

      <ReactMarkDown>{data.review.body}</ReactMarkDown>
    </div>
  );
}

export default ReviewDetails;
