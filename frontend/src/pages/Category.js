import { gql, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
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
  }
`;

function Category() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(CATEGORY, { variables: { id } });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>{data.category.name}</h2>
      {data.category.reviews.map((review) => (
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

export default Category;
