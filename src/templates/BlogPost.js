import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from 'react-share';

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
    color: ${colors.black};
    background-color: ${colors.white};
    border: 1px solid #e6ecf1;
    border-radius: 3px;
    box-shadow: ${boxShadow};
    transition: border 250ms ease;
    padding: 1rem 3rem;
    font-weight: 600;

    svg {
      font-size: 1.6rem;
      vertical-align: middle;
      margin-top: -0.2rem;
    }

    &:hover {
      border-color: ${colorScheme.secondary};
      color: ${colorScheme.secondary};
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

const SocialButtons = styled.div`
  grid-column: -3/-2;
  margin: 2rem 0 4rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > div[role='button'] {
    display: inline-block;
    cursor: pointer;
    margin-left: 0.5rem;
    transition: opacity 250ms ease;

    &:hover {
      opacity: 0.75;
      transition: opacity 250ms ease;
    }
  }
`;

const BlogPost = ({ data }) => {
  const {
    title,
    slug,
    seoMetaTags,
    meta,
    author,
    cover,
    contentNode,
  } = data.project;

  const postUrl = `https://duvikan.club/blog/${slug}/`;
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
        <SocialButtons>
          <FacebookShareButton url={postUrl}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={postUrl}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={postUrl}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <WhatsappShareButton url={postUrl}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </SocialButtons>
      </GridLayout>
    </ScaleUp>
  );
};

export const projectQuery = graphql`
  query($slug: String!) {
    project: datoCmsBlogPost(slug: { eq: $slug }) {
      title
      slug
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
