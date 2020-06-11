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

export const imageNames = [
  'model',
  'modelState',
  'modelControls',
  'modelComponents',
  'modelHighLevelView',
  'modelUpdateData',
  'modelFrame',
  'activators',
  'automatata',
  'boids',
  'chaosGame',
  'dice',
  'epidemic',
  'fibonacci',
  'gameOfLife',
  'maze',
  'percolation',
  'segregation',
  'simpleModel',
  'snake',
];

const query = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
      fixed {
        ...GatsbyImageSharpFixed
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
    activators: file(relativePath: { eq: "thumbnails/activators.png" }) {
      ...fluidImage
    }
    automata: file(relativePath: { eq: "thumbnails/automata.png" }) {
      ...fluidImage
    }
    boids: file(relativePath: { eq: "thumbnails/boids.png" }) {
      ...fluidImage
    }
    chaosGame: file(relativePath: { eq: "thumbnails/chaos-game.png" }) {
      ...fluidImage
    }
    dice: file(relativePath: { eq: "thumbnails/dice.png" }) {
      ...fluidImage
    }
    epidemic: file(relativePath: { eq: "thumbnails/epidemic.png" }) {
      ...fluidImage
    }
    fibonacci: file(relativePath: { eq: "thumbnails/fibonacci.png" }) {
      ...fluidImage
    }
    gameOfLife: file(relativePath: { eq: "thumbnails/game-of-life.png" }) {
      ...fluidImage
    }
    mazes: file(relativePath: { eq: "thumbnails/maze.png" }) {
      ...fluidImage
    }
    percolation: file(relativePath: { eq: "thumbnails/percolation.png" }) {
      ...fluidImage
    }
    segregation: file(relativePath: { eq: "thumbnails/segregation.png" }) {
      ...fluidImage
    }
    simpleModel: file(relativePath: { eq: "thumbnails/simple-model.png" }) {
      ...fluidImage
    }
    snake: file(relativePath: { eq: "thumbnails/snake.png" }) {
      ...fluidImage
    }
  }
`;

export const ImageComponent = ({ name, data, fixed }) => {
  if (data[name] === undefined) {
    console.log(`couldn't find ${name}`, data);
    return null;
  }
  if (data[name] === null) {
    console.log(`${name} returns null`, data);
    return null;
  }
  console.log(data[name]);
  return fixed ? (
    <Img fixed={data[name].childImageSharp.fixed} />
  ) : (
    <Img fluid={data[name].childImageSharp.fluid} />
  );
};

export function camel(name) {
  return name.split('').reduce(
    (prev, curr) => {
      if (curr === '-') {
        prev.shouldCapitalize = true;
      } else {
        prev.result += prev.shouldCapitalize ? curr.toUpperCase() : curr;
        prev.shouldCapitalize = false;
      }
      return prev;
    },
    { shouldCapitalize: false, result: '' }
  ).result;
}

const Image = ({ fixed = false, name }) => {
  const data = useStaticQuery(query);
  return <ImageComponent data={data} name={camel(name)} fixed={fixed} />;
};

export default Image;
