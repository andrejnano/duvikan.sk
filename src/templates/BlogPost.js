import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { font, colors } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  max-width: 100%;
  padding: 3rem 2rem 1rem;
  position: relative;
`;

const Inner = styled.div`
  width: 950px;
  max-width: 100%;
  text-align: left;
  padding: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

const PostCover = styled.div`
  width: 100%;
  margin-top: 3rem;
  div {
    max-height: 40vh;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.2;
  text-align: center;
`;

const PostInfo = styled.header`
  width: 100%;
  color: ${colors.light};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LastUpdate = styled.time`
  font-weight: bold;
  padding: 0 1rem;
`;

const TimeToRead = styled.time`
  font-weight: 400;
  padding: 0 1rem;
  &::before {
    content: '\00B7';
  }
`;

const BlogPost = ({ data }) => {
  const { title, seoMetaTags, meta, cover, contentNode } = data.project;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <PostCover>
          <Img fluid={cover.fluid} />
        </PostCover>
        <Inner>
          <Title>{title}</Title>
          <PostInfo>
            <LastUpdate>
              <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
              <Moment format="DD.MM.YYYY">{meta.updatedAt}</Moment>
            </LastUpdate>
            <TimeToRead>
              <FontAwesomeIcon icon={['far', 'clock']} />{' '}
              {contentNode.childMarkdownRemark.timeToRead} min.
            </TimeToRead>
          </PostInfo>
          <div
            dangerouslySetInnerHTML={{
              __html: contentNode.childMarkdownRemark.html,
            }}
          />
        </Inner>
      </Container>
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
      meta {
        updatedAt
      }
      cover {
        fluid(maxWidth: 1470) {
          ...GatsbyDatoCmsFluid
        }
      }
      contentNode {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPost;
