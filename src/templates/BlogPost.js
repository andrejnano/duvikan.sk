import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, colorScheme, boxShadow } from '../consts/style';
import { ScaleUp } from '../style/motion';
import { GridLayout, Cover } from '../components/common/LayoutParts';

const GoBack = styled.div`
  margin: 1rem 0;
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/3;
  }

  .btn {
    appearance: none;
    overflow: visible;
    vertical-align: middle;
    cursor: pointer;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    transition: all easeInOutCubic 0.25s;
    border-radius: 3px;
    color: #333;
    background: #ececec;
    padding: 1rem 3rem;
    font-weight: 600;
    border: 0;

    &:hover {
      background: #dfdfdf;
    }
  }
`;

const Title = styled.h1`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 3/-2;
  }
  font-size: 4rem;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;

const PostInfo = styled.header`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 3/-2;
  }
  color: ${colors.light};
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;

  .authorName {
    color: ${colors.mediumBlue};
    font-weight: 500;
    margin-right: 1rem;
    border-bottom: 1px solid ${colors.mediumBlue};
  }

  .authorPhoto {
    width: 25px;
    height: 25px;
    margin-right: 1rem;
    img {
      border-radius: 50%;
    }
  }
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

const Content = styled.article`
  grid-column: 2/-2;
  color: ${colorScheme.main};
  background: ${colors.white};
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: ${boxShadow};
  padding: 3rem;
`;

const BlogPost = ({ data }) => {
  const { title, seoMetaTags, meta, author, cover, contentNode } = data.project;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Cover>
        <Img fluid={cover.fluid} />
      </Cover>
      <GridLayout>
        <GoBack>
          <Link to="/blog" className="btn">
            <FontAwesomeIcon icon={['far', 'long-arrow-alt-left']} /> Späť
          </Link>
        </GoBack>
        <Title>{title}</Title>
        <PostInfo>
          <Img className="authorPhoto" fluid={author.photo.fluid} />
          <div className="authorName">{author.name}</div>
          <LastUpdate>
            <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
            <Moment format="DD.MM.YYYY">{meta.updatedAt}</Moment>
          </LastUpdate>
          <TimeToRead>
            <FontAwesomeIcon icon={['far', 'clock']} />{' '}
            {contentNode.childMarkdownRemark.timeToRead} min.
          </TimeToRead>
        </PostInfo>
        <Content
          dangerouslySetInnerHTML={{
            __html: contentNode.childMarkdownRemark.html,
          }}
        />
      </GridLayout>
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
          ...GatsbyDatoCmsFluid_tracedSVG
        }
      }
      author {
        name
        photo {
          fluid(maxWidth: 25) {
            ...GatsbyDatoCmsFluid
          }
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
