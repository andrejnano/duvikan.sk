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
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;

  .authorName {
    color: ${colorScheme.main};
    font-weight: 500;
    margin-right: 2rem;
    border-bottom: 1px solid ${colorScheme.secondary};
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
  font-weight: 400;
  margin-right: 2rem;
  color: ${colorScheme.main};
`;

const TimeToRead = styled.span`
  font-weight: 400;
  color: ${colorScheme.main};
`;

const Content = styled.article`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 3/-2;
  }
  color: ${colorScheme.main};
  background: ${colors.white};
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: ${boxShadow};
  padding: 3rem;

  p {
    line-height: 22px;
    color: rgba(0, 0, 0, 0.84);
    letter-spacing: -0.011em;
    font-size: 16px;
    margin-bottom: 35.596px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${colorScheme.secondary};
    font-weight: 400;
    &:hover {
      /* text-decoration: underline; */
      opacity: 0.75;
    }
  }
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
    publicationDate,
    author,
    cover,
    contentNode,
  } = data.project;

  console.log(`PUBLIKAC.DATE: ${publicationDate}`);

  const { siteMetadata } = data.meta;

  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}/`;

  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Cover>
        <Img fluid={cover.fluid} />
      </Cover>
      <GridLayout>
        <GoBack>
          <Link to="/blog" className="btn">
            <FontAwesomeIcon icon={['far', 'long-arrow-alt-left']} /> Všetky
            príspevky
          </Link>
        </GoBack>
        <Title>{title}</Title>
        <PostInfo>
          <Img className="authorPhoto" fluid={author.photo.fluid} />
          <div title="Autor článku" className="authorName">
            {author.name}
          </div>
          <LastUpdate title="Dátum publikácie">
            <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
            <Moment format="DD.MM.YYYY">{publicationDate}</Moment>
          </LastUpdate>
          <TimeToRead title="Čas na prečítanie textu">
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
          <FacebookShareButton url={postUrl} quote="Zdielať na Facebook">
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={postUrl} quote="Zdielať na Twitter">
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={postUrl} quote="Zdielať na LinkedIn">
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <WhatsappShareButton url={postUrl} quote="Zdielať cez Whatsapp">
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </SocialButtons>
      </GridLayout>
    </ScaleUp>
  );
};

export const projectQuery = graphql`
  query($slug: String!) {
    meta: site {
      siteMetadata {
        siteUrl
      }
    }
    project: datoCmsBlogPost(slug: { eq: $slug }) {
      title
      slug
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      publicationDate
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
