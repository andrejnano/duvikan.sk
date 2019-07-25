import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';

import SEO from '../components/SEO';

import { font, colors } from '../consts/style';
import { ScaleUp } from '../style/motion';

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  overflow: auto;
  display: flex;
  justify-content: center;
  max-width: 100%;
  padding: 3rem 2rem 1rem;
  position: relative;
`;

const Inner = styled.div`
  width: 750px;
  max-width: 100%;
  text-align: left;
  color: ${colors.light};
  padding: 3rem;
  overflow: auto;
  position: relative;
  z-index: 100;

  button {
    ${font.button};
    background: ${colors.dark};
    border: none;
    color: white;
    padding: 0.35em 0.7em;
    margin-top: 0.7em;
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom,
    ${colors.dark},
    rgba(0, 0, 0, 0)
  );
  background: linear-gradient(
    180deg,
    ${colors.dark} 0%,
    rgba(0, 0, 0, 0) 15%,
    rgba(0, 0, 0, 0) 85%,
    ${colors.dark} 100%
  );
  z-index: 200;
  pointer-events: none;
`;

const Title = styled.h1`
  ${font.h1}
  line-height: 1.2;
  margin: 1em 0;
`;

const BlogPost = ({ data }) => {
  const { title, seoMetaTags, contentNode } = data.project;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Wrapper>
        <Overlay />
        <Inner>
          <Title>{title}</Title>
          <div
            dangerouslySetInnerHTML={{
              __html: contentNode.childMarkdownRemark.html,
            }}
          />
          <Link to="/blog">
            <button>Go Back</button>
          </Link>
        </Inner>
      </Wrapper>
    </ScaleUp>
  );
};

export const projectQuery = graphql`
  query($slug: String!) {
    project: datoCmsBlogPost(slug: { eq: $slug }) {
      title
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      contentNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPost;
