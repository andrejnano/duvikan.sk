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
  margin: 3rem 0 3rem;
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/2;
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

const TitleWrap = styled.div`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/-2;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3rem 0 1rem;
`;

const Title = styled.h1`
  font-size: 40px;
  letter-spacing: -0.022em;
  line-height: 56px;
  padding: 0;
  margin: 0;
  width: 63rem;
  max-width: 90vw;
`;

const PostInfoWrap = styled.header`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/-2;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PostInfo = styled.div`
  width: 63rem;
  max-width: 90vw;
  display: flex;
  flex-direction: row;

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

const PostCover = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* height: 50vh; */
  margin: 3rem 0 3rem;
  > div {
    width: 63rem;
    max-width: 100vw;
    box-shadow: ${boxShadow};
  }
`;

const ContentWrap = styled.section`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/-2;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Content = styled.article`

  color: ${colorScheme.main};
  /* background: ${colors.white}; */
  /* border-radius: 3px; */
  /* border: 1px solid #e5e8ed; */
  /* box-shadow: ${boxShadow}; */

  /* to keep character count aroun 2.31*alphabet or  50 - 90 chars per line*/
  width: 63rem;
  max-width: 90vw;


  p {
    color: rgba(0, 0, 0, 1);

    font-size: 20px;
    letter-spacing: -0.017em;
    line-height: 28px;

    margin-bottom: 35.596px;
    white-space: pre-line;
    text-align: justify;
    hyphens: auto;

    /* to keep character count aroun 2.31*alphabet or  50 - 90 chars per line*/
    width: 63rem;
    max-width: 90vw;


    &:first-child {
      font-weight: 600;
      font-size: 24px;
      letter-spacing: -0.019em;
      line-height: 34px;
    }

    &:last-child {
      font-weight: bold;
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
  grid-column: 2/-2;
  margin: 6rem 0 6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;

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

  const { siteMetadata } = data.meta;

  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}/`;

  return (
    <>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <GoBack>
          <Link to="/blog" className="btn">
            <FontAwesomeIcon icon={['far', 'long-arrow-alt-left']} /> Všetky
            príspevky
          </Link>
        </GoBack>
        <TitleWrap>
          <Title>{title}</Title>
        </TitleWrap>
        <PostInfoWrap>
          <PostInfo>
            <Img className="authorPhoto" fluid={author.photo.fluid} />
            <div title="Autor článku" className="authorName">
              {author.name}
            </div>
            <LastUpdate title="Dátum publikácie">
              <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
              <Moment format="DD.MM.YYYY">{publicationDate}</Moment>
            </LastUpdate>
            {/* <TimeToRead title="Čas na prečítanie textu">
              <FontAwesomeIcon icon={['far', 'clock']} />{' '}
              {contentNode.childMarkdownRemark.timeToRead} min.
            </TimeToRead> */}
          </PostInfo>
        </PostInfoWrap>
      </GridLayout>
      <PostCover>
        <Img
          fluid={cover.fluid}
          style={{
            // Defaults are overwrite-able by setting one or each of the following:
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </PostCover>
      <GridLayout>
        {/* Useful line-length debug: <Content>
          <p>abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefgh</p>
        </Content> */}
        <ContentWrap>
          <Content
            dangerouslySetInnerHTML={{
              __html: contentNode.childMarkdownRemark.html,
            }}
          />
        </ContentWrap>

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
    </>
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
