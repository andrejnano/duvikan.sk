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
import Container from '../containers/Container';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin: 3rem 0;
  padding: 3rem 0;
`;

const SidePanel = styled.aside`
  width: 200px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  .pages {
    font-size: 1.8rem;
    color: ${colors.gray1};
    font-weight: 400;
  }
`;

const Feed = styled.main`
  flex: 1;
`;

const BlogPostList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  position: relative;
  list-style-type: none;

  li {
    position: relative;
    min-width: 250px;
    width: 100%;
    margin-bottom: 3rem;

    @media (min-width: 950px) {
      max-width: 950px;
    }

    @media (min-width: 1470px) {
      width: 100%;
    }

    a.card {
      display: block;
      position: relative;
      border: 1px solid #e5e8ed;
      /* box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06); */
      background-color: ${colors.white};
      border-radius: 3px;
      transition: box-shadow 0.25s linear, -webkit-box-shadow 0.25s linear;
      padding: 3rem 3rem 3rem 3rem;
      color: ${colors.black};
      overflow: hidden;
      height: 100%;

      .title {
        font-size: 2.8rem;
        font-weight: 400;
        padding: 0;
        margin: 0;
      }

      .meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.8em;
        font-weight: 400;
        padding: 1.2rem 0;
        opacity: 0.75;

        > * {
          margin-right: 1rem;
        }

        .authorName {
          color: ${colors.mediumBlue};
          font-weight: 500;
        }

        .authorPhoto {
          width: 25px;
          height: 25px;
          img {
            border-radius: 50%;
          }
        }
      }

      .cover {
        max-height: 360px;
        position: relative;
        border-bottom: 1px solid #e5e8ed;
      }

      .excerpt {
        font-size: 1.8rem;
        padding-top: 2rem;
        padding-bottom: 3rem;
        line-height: 1.7;
      }

      .linkText {
        position: absolute;
        display: inline-block;
        bottom: 3rem;
        left: 3rem;
        color: ${colors.mediumBlue};
        font-weight: 500;
        svg {
          margin-left: 2px;
          font-size: 1.2em;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }

        &:after {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: ${colors.mediumBlue};
          transition: opacity 0.25s linear;
          opacity: 0;
        }
      }

      &:hover {
        .linkText {
          &:after {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const BlogPostItem = props => {
  return (
    <li>
      <Link
        key={props.node.slug}
        to={`/blog/${props.node.slug}/`}
        className={props.node.featured ? 'featured card' : 'card'}
      >
        <h2 className="title">{props.node.title}</h2>
        <div className="meta">
          <Img className="authorPhoto" fluid={props.node.author.photo.fluid} />
          <div className="authorName">{props.node.author.name} ・ </div>
          <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
          <Moment format="DD.MM.YYYY">{props.node.meta.createdAt}</Moment>
          <FontAwesomeIcon icon={['far', 'clock']} />{' '}
          {props.node.contentNode.childMarkdownRemark.timeToRead} min.
        </div>
        <Img className="cover" fluid={props.node.cover.fluid} />
        <p className="excerpt">
          {props.node.contentNode.childMarkdownRemark.excerpt}
        </p>
        <span className="linkText">
          Otvoriť článok{' '}
          <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />{' '}
        </span>
      </Link>
    </li>
  );
};

const Pagination = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;

  @media (min-width: 950px) {
    max-width: 950px;
  }

  .pageNumber {
    color: ${colors.dark};
    margin-left: auto;
  }

  a {
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
    padding: 0 2rem;
    font-weight: 600;
    border: 0;

    &:hover {
      background: #dfdfdf;
    }

    &.next {
      margin-left: auto;
    }
  }

  .disabled {
    appearance: none;
    overflow: visible;
    vertical-align: middle;
    cursor: not-allowed;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    transition: all easeInOutCubic 0.25s;
    border-radius: 3px;
    color: #333;
    background: #ececec;
    padding: 0 2rem;
    font-weight: 600;
    border: 0;
    opacity: 0.50;

    &.next {
      margin-left: auto;
    }
  }
`;

const PaginationLink = props => {
  if (!props.test) {
    return (
      <Link className={props.class} to={'/blog/' + props.url}>
        {props.text}
      </Link>
    );
  } else {
    return <div className={`${props.class} disabled`}>{props.text}</div>;
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
    <>
      <SEO meta={seoMetaTags} />
      <Container>
        <Wrapper>
          <SidePanel>
            <Title>
              {title}{' '}
              <div className="pages">
                &mdash; {index}/{pageCount}
              </div>
            </Title>
          </SidePanel>
          <Feed>
            <Pagination role="navigation">
              <PaginationLink
                test={first}
                url={previousUrl}
                text="Novší obsah"
                class="previous"
              />
              <div className="pageNumber">
                {index}/{pageCount}
              </div>
              <PaginationLink
                test={last}
                url={nextUrl}
                text="Starší obsah"
                class="next"
              />
            </Pagination>
            <BlogPostList>
              {group.map(node => (
                <BlogPostItem key={node.slug} node={node} />
              ))}
            </BlogPostList>

            <Pagination role="navigation">
              <PaginationLink
                test={first}
                url={previousUrl}
                text="Novší obsah"
                class="previous"
              />
              <div className="pageNumber">
                {index}/{pageCount}
              </div>
              <PaginationLink
                test={last}
                url={nextUrl}
                text="Starší obsah"
                class="next"
              />
            </Pagination>
          </Feed>
        </Wrapper>
      </Container>
    </>
  );
};

export default BlogIndex;
