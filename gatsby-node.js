const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // eslint-disable-next-line
  const createBlogsPosts = new Promise((resolve, reject) => {
    try {
      graphql(`
        {
          allDatoCmsBlogPost {
            nodes {
              id
              title
              slug
              featured
              meta {
                createdAt
              }
              cover {
                fluid(maxWidth: 720) {
                  src
                  srcSet
                  sizes
                  aspectRatio
                  base64
                }
              }
              author {
                name
                photo {
                  fluid(maxWidth: 200) {
                    src
                    srcSet
                    base64
                    aspectRatio
                    sizes
                  }
                }
              }
              contentNode {
                childMarkdownRemark {
                  excerpt
                  timeToRead
                }
              }
            }
          }
        }
      `).then(res => {
        const posts = res.data.allDatoCmsBlogPost.nodes;

        // new pagination strategy
        createPaginatedPages({
          edges: posts,
          createPage: createPage,
          pageTemplate: './src/templates/BlogIndex.js',
          pageLength: 5,
          pathPrefix: 'blog',
        });

        // down from here is the original page per post creation
        posts.map(post => {
          let { slug } = post;
          createPage({
            path: `/blog/${slug}`,
            component: path.resolve('./src/templates/BlogPost.js'),
            context: {
              slug: slug,
            },
          });
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });

  // eslint-disable-next-line
  return Promise.all([createBlogsPosts]);
};
