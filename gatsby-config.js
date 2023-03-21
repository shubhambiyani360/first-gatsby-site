/**
 * 
 */
// module.exports = {
//   siteMetadata: {
//     siteUrl: `https://www.yourdomain.tld`,
//   },
//   plugins: [],
// }
// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    title: "My Gatsby Blog Site",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-postcss",

    {
      resolve: 'gatsby-source-strapi-graphql',
      options: {
        apiURL: 'http://localhost:1337/api',
        collectionTypes: ['Article', 'User'],
        singleTypes: ['About', 'Global'],
        // Extract images from markdown / richtext fields.
        // inlineImages: {
        //   typesToParse: {
        //     Article: ['body'],
        //     ComponentBlockBody: ['text'],
        //   },
        // },
        // Only include specific locales.
        locale: ['en', 'sv'], // defaults to 'all'
        // Include drafts in build.
        preview: true, // defaults to false
        // Use application token.
        token: process.env.STRAPI_TOKEN,
        // Add additional headers.
        headers: {},
        // Enable/disable cache.
        cache: false,
      },
    },


    {
      resolve: "gatsby-source-filesystem",
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN,
        queryLimit: 1000, // Optional, default to 100
        //contentTypes: ['article'], // Specify which content types to fetch
        collectionTypes: [
          {
            singularName: "article",
            queryParams: {
              publicationState:
                process.env.GATSBY_IS_PREVIEW === "true" ? "preview" : "live",
              populate: {
                cover: "*",
                blocks: {
                  populate: "*",
                },
              },
            },
          },
          {
            singularName: "author",
          },
          {
            singularName: "category",
          },
        ],
        singleTypes: [
          {
            singularName: "about",
            queryParams: {
              populate: {
                blocks: {
                  populate: "*",
                },
              },
            },
          },
          {
            singularName: "global",
            queryParams: {
              populate: {
                favicon: "*",
                defaultSeo: {
                  populate: "*",
                },
              },
            },
          },
        ],
      },
    },
        
        
        //typePrefix: "Strapi",
        //singleTypes: ['homepage'],
        //name: `Blog`,
        //path: `${__dirname}/Blog`,
        // headers: {
        //   Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        // },
        //verboseOutput: true,
      
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
  ],
};