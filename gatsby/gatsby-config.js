const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  siteMetadata: {
    title: `React-Sim`,
    description: `A framework for building simulation models in React`,
    author: `jckr`,
  },
  pathPrefix: '/react-sim',
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};
