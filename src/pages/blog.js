import React from 'react';
import styled from 'styled-components';

import { graphql, useStaticQuery, Link } from 'gatsby';
import { map } from 'lodash';

import SEO from '../components/SEO';

import { font, colors } from '../consts/style';
import { ScaleUp } from '../style/motion';

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  overflow: auto;
  display: flex;
  justify-content: center;
  max-width: 100%;
  padding: 20px;
`;

const Inner = styled.div`
  width: 700px;
  max-width: 100%;
  text-align: left;
  button {
    ${font.button};
    background: ${colors.dark};
    border: none;
    color: white;
    padding: 0.35em 0.7em;
  }
`;

const Title = styled.h1`
  ${font.h1}
  margin-bottom: 3rem;
`;

const PostLink = styled.div`
  margin-bottom: 1em;
  max-width: 400px;
  a {
    color: ${colors.light};
    div {
      border: 0.25px solid ${colors.light};
      padding: 0.35em 0.7em;

      h3 {
        border-left: 4px solid ${colors.light};
        margin-left: calc(-0.7em + 1px);
        padding-left: 1rem;
        line-height: 2em;
      }
    }
    &:hover {
      div {
        text-decoration: none;
        background: ${colors.light};
        color: ${colors.dark};

        h3 {
          border-left: 4px solid ${colors.red};
        }
      }
    }
  }
`;

const Separator = styled.div`
  width: 70px;
  height: 5px;
  background: #fff;
  margin: 2rem 0;
`;

const Blog = () => {
  const data = useStaticQuery(graphql`
    query blogQuery {
      page: datoCmsBlogPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
      posts: allDatoCmsBlogPost(
        sort: { fields: [meta___createdAt], order: ASC }
      ) {
        edges {
          node {
            id
            title
            featured
            slug
            contentNode {
              childMarkdownRemark {
                excerpt
              }
            }
          }
        }
      }
    }
  `);
  const { title, seoMetaTags } = data.page;
  const { edges } = data.posts;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Wrapper>
        <Inner>
          <Separator/>
          <Title>{title}</Title>
          {map(edges, post => (
            <PostLink key={post.node.slug}>
              <Link to={`/blog/${post.node.slug}/`}>
                {/* <img></img> */}
                <div>
                  <h3>{post.node.title}</h3>
                  <p>{post.node.contentNode.childMarkdownRemark.excerpt}</p>
                </div>
              </Link>
            </PostLink>
          ))}
        </Inner>
      </Wrapper>
    </ScaleUp>
  );
};

export default Blog;
