import React from 'react';
import { Link, graphql } from 'gatsby';
const Toc = ({ mdx }) => {
  const { edges: docs } = mdx;
  return (
    <div>
      <h1>React-Sim docs</h1>
      <ul>
        {docs.map(({ node: doc }) => (
          <li key={doc.id}>
            <Link to={doc.fields.slug}>
              <h2>{doc.frontmatter.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
