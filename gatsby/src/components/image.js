import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const query = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  query {
    model: file(relativePath: { eq: "model.png" }) {
      ...fluidImage
    }
    modelState: file(relativePath: { eq: "model-state.png" }) {
      ...fluidImage
    }
    modelInitData: file(relativePath: { eq: "model-init-data.png" }) {
      ...fluidImage
    }
    modelControls: file(relativePath: { eq: "model-controls.png" }) {
      ...fluidImage
    }
    modelComponents: file(relativePath: { eq: "model-components.png" }) {
      ...fluidImage
    }
    modelHighLevelView: file(
      relativePath: { eq: "model-high-level-view.png" }
    ) {
      ...fluidImage
    }
    modelUpdateData: file(relativePath: { eq: "model-update-data.png" }) {
      ...fluidImage
    }
    modelFrame: file(relativePath: { eq: "model-frame.png" }) {
      ...fluidImage
    }
  }
`;

const Image = ({ name }) => {
  const data = useStaticQuery(query);

  return <Img fluid={data[name].childImageSharp.fluid} />;
};

export default Image;
