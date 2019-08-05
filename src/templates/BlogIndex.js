/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

import { colors } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin: 3rem 0;
  padding: 3rem 0;
`;

const SidePanel = styled.aside`
  width: 150px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  span {
    display: none;
    font-size: 3rem;
    color: ${colors.mediumWash};
    font-weight: 400;
  }
`;

const Feed = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    flex: 50%;
    border: 1rem solid transparent;

    &.featured {
      flex: 100%;
    }
  }
`;

const PostCardInner = styled.div`
  padding: 1rem;
  border: 2px solid ${colors.darkWash};
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  h2 {
    color: ${colors.black};
    font-weight: bold;
  }
  p {
    text-align: left;
    color: ${colors.gray2};
  }
`;

const PostBody = styled.main`
  display: flex;
  flex-direction: row;
  .leftPostColumn {
    flex: 1;
  }
  figure {
    flex: 1;
  }
`;

const PostFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.darkWash};
  padding-top: 1rem;
  padding-left: 1rem;
  .author {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    .authorPhoto {
      flex: 1;
      max-width: 30px;
      img {
        border-radius: 50%;
      }
    }
    .authorName {
      flex: 1;
      margin-left: 1rem;
      font-weight: 600;
      color: ${colors.gray1};
    }
  }
  .postMeta {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .postDate {
      color: ${colors.gray1};
    }
    .timeToRead {
      color: ${colors.gray1};
    }
  }
`;

// todo: have 2 types of post links, featured with the image on top
// and regular, which will have picture on side. or the opposite

const PostCard = props => {
  return (
    <Link key={props.node.slug} to={`/blog/${props.node.slug}/`} className={props.node.featured ? 'featured' : ''}>
      <PostCardInner>
        <PostBody>
          <div className="leftPostColumn">
            <h2>{props.node.title}</h2>
            <p>{props.node.contentNode.childMarkdownRemark.excerpt}</p>
          </div>
          <figure>
            <Img fluid={props.node.cover.fluid} />
          </figure>
        </PostBody>
        <PostFooter>
          <div className="author">
            <div className="authorPhoto"><Img fluid={props.node.author.photo.fluid} /></div>
            <div className="authorName">{props.node.author.name}</div>
          </div>
          <div className="postMeta">
            <div className="postDate">
              <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
              <Moment format="DD.MM.YYYY">{props.node.meta.createdAt}</Moment>
            </div>
            <div className="timeToRead">
              <FontAwesomeIcon icon={['far', 'clock']} />{' '}
              {props.node.contentNode.childMarkdownRemark.timeToRead} min.
            </div>
          </div>
        </PostFooter>
      </PostCardInner>
    </Link>
  );
};

const Pagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1rem;
  padding: 1rem 0;
`;

const PaginationLink = props => {
  if (!props.test) {
    return <Link to={'/blog/' + props.url}>{props.text}</Link>;
  } else {
    return null;
  }
};

const BlogIndex = ({ pageContext }) => {
  const { group, index, pageCount } = pageContext;
  const previousUrl = index - 1 == 1 ? '/' : (index - 1).toString();
  const nextUrl = (index + 1).toString();
  const first = index == 1 ? true : false;
  const last = index == pageCount ? true : false;

  const data = useStaticQuery(graphql`
    query blogQuery {
      page: datoCmsBlogPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
    }
  `);

  const { title, seoMetaTags } = data.page;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <Wrapper>
          <SidePanel>
            <Title>
              {title}{' '}
              <span>
                &mdash; {index}/{pageCount}
              </span>
            </Title>
          </SidePanel>
          <Feed>
            {group.map(node => (
              <PostCard key={node.slug} node={node} />
            ))}

            <Pagination>
              <PaginationLink
                test={first}
                url={previousUrl}
                text="Predchádzajúca stránka"
                className="previousPageLink"
              />
              <PaginationLink
                test={last}
                url={nextUrl}
                text="Nasledujúca stránka"
                className="nextPageLink"
              />
            </Pagination>
          </Feed>
        </Wrapper>
      </Container>
    </ScaleUp>
  );
};

export default BlogIndex;
