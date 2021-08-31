import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";

const REVIEWS = gql`
  query GetReviews {
    reviews {
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

function Homepoage() {
  const { loading, data, error } = useQuery(REVIEWS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error :(</p>;

  return (
    <div>
      {data.reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>
          {review.categories.map((c) => (
            <small key={c.id}>{c.name}</small>
          ))}
          <ReactMarkDown>{review.body.substring(0, 100)}</ReactMarkDown>
          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default Homepoage;
