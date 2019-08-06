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

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: row;
  margin: 3rem 0;
  padding: 3rem 0;
`;

const Cover = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  max-height: 40vh;
  > div {
    flex: 100%;
    border-radius: 3px;
    border: 1px solid #e5e8ed;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  }
`;

const SidePanel = styled.div`
  width: 200px;

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

const MainPanel = styled.main`
  flex: 1;
  display: block;
  position: relative;
`;

const Content = styled.article`
  color: ${colors.black};
  background: ${colors.white};
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.2;
`;

const PostInfo = styled.header`
  width: 100%;
  color: ${colors.light};
  display: flex;
  flex-direction: row;
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
        <Cover>
          <Img fluid={cover.fluid} />
        </Cover>
        <SectionWrapper>
          <SidePanel>
            <Link to="/blog" className="btn">
              <FontAwesomeIcon icon={['far', 'long-arrow-alt-left']} /> Späť
            </Link>
          </SidePanel>
          <MainPanel>
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
            <Content
              dangerouslySetInnerHTML={{
                __html: contentNode.childMarkdownRemark.html,
              }}
            />
          </MainPanel>
        </SectionWrapper>
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
