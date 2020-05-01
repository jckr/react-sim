import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          description
        }
      }
    }
  `);

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en-us',
      }}
    >
      <title>{data?.site?.siteMetadata?.title}</title>
      <meta
        name="description"
        content={data?.site?.siteMetadata?.description}
      />
    </Helmet>
  );
};
