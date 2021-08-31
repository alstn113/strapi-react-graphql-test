import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

function SiteHeader() {
  const { loading, data, error } = useQuery(CATEGORIES);

  if (loading) return <p>Loading categories</p>;
  if (error) return <p>Error fetching categories :( </p>;

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Minsoo Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by categories : </span>
        {data.categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SiteHeader;
