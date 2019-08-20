/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

import { boxShadow, colors, colorScheme } from '../consts/style';

import {
  SectionWrapper,
  SidePanel,
  MainPanel,
  GridLayout,
} from '../components/common/LayoutParts';

const Title = styled.h1`
  margin: 2rem;
  grid-column: 2/3;
  font-size: 3rem;
  font-weight: bold;
  .pages {
    display: inline;
    font-size: 2rem;
    color: ${colors.gray1};
    font-weight: 400;
  }
`;

const BlogPostList = styled.ul`
  grid-column: 2/-2;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
  margin: 0;
  position: relative;
  list-style-type: none;

  li {
    position: relative;
    min-width: 250px;

    a.card {
      position: relative;
      color: ${colors.black};
      overflow: hidden;
      height: 100%;
      border: 1px solid #e6ecf1;
      box-shadow: ${boxShadow};
      background-color: ${colors.white};
      border-radius: 3px;
      margin: 2rem;
      transition: border 250ms ease;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 3rem;

      .title {
        flex: 100%;
        font-size: 2.4rem;
        font-weight: 600;
        margin: 0;
      }

      .meta {
        flex: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 400;
        padding: 1rem 0rem 2rem;
        opacity: 0.75;
        color: ${colorScheme.accent};

        .authorName {
          margin-right: 2rem;
        }

        .authorPhoto {
          width: 25px;
          height: 25px;
          margin-right: 1rem;
          img {
            border-radius: 50%;
          }
        }

        .calendarIcon {
          margin-right: 0.5em;
        }

        .createdAtTime {
          margin-right: 2rem;
        }

        .clockIcon {
          margin-right: 0.5em;
        }

        .timeToRead {
        }
      }

      .cover {
        flex: 33.33333%;
        height: 150px;
        width: 150px;
        border: 1px solid #e6ecf1;
        box-shadow: ${boxShadow};
      }

      .excerpt {
        flex: 66.66666%;
        font-size: 2rem;
        line-height: 1.7;
        color: ${colors.gray3};
        padding-left: 1rem;
      }

      .linkText {
        position: absolute;
        display: inline-block;
        bottom: 3rem;
        left: 2rem;
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
        border-color: ${colorScheme.secondary};
        color: ${colorScheme.secondary};

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
          <div className="authorName">{props.node.author.name}</div>
          <FontAwesomeIcon
            className="calendarIcon"
            icon={['far', 'calendar-alt']}
          />{' '}
          <Moment className="createdAtTime" format="DD.MM.YYYY">
            {props.node.meta.createdAt}
          </Moment>
          <FontAwesomeIcon className="clockIcon" icon={['far', 'clock']} />{' '}
          <span className="timeToRead">
            {props.node.contentNode.childMarkdownRemark.timeToRead} min.
          </span>
        </div>
        <Img className="cover" fluid={props.node.cover.fluid} />
        <p className="excerpt">
          {props.node.contentNode.childMarkdownRemark.excerpt}
        </p>
      </Link>
    </li>
  );
};

const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  opacity: 0.075;
  border: 0;
  margin: 0;
  margin-bottom: 3rem;
  overflow: visible;
`;

const Pagination = styled.div`
  grid-column: 2/-2;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;

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

    svg {
      font-size: 1.6rem;
      vertical-align: middle;
      margin-top: -0.2rem;
    }

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
    opacity: 0.5;

    &.next {
      margin-left: auto;
    }
  }
`;

const PaginationLink = props => {
  if (!props.test) {
    if (props.class === 'next') {
      return (
        <Link className={props.class} to={'/blog/' + props.url}>
          {props.text}{' '}
          <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
        </Link>
      );
    } else if (props.class === 'previous') {
      return (
        <Link className={props.class} to={'/blog/' + props.url}>
          <FontAwesomeIcon icon={['far', 'long-arrow-alt-left']} /> {props.text}
        </Link>
      );
    }
  } else {
    if (props.class === 'next') {
      return (
        <div className={`${props.class} disabled`}>
          {props.text}{' '}
          <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
        </div>
      );
    } else if (props.class === 'previous') {
      return (
        <div className={`${props.class} disabled`}>
          <FontAwesomeIcon icon={['far', 'long-arrow-alt-left']} /> {props.text}
        </div>
      );
    }
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
      <GridLayout>
        <Title>
          {title}{' '}
          <div className="pages">
            &mdash; {index}/{pageCount}
          </div>
        </Title>
        <Pagination role="navigation">
          <PaginationLink
            test={first}
            url={previousUrl}
            text="Novšie príspevky"
            class="previous"
          />
          <div className="pageNumber">
            {index}/{pageCount}
          </div>
          <PaginationLink
            test={last}
            url={nextUrl}
            text="Staršie príspevky"
            class="next"
          />
        </Pagination>
      </GridLayout>
      <SectionSeparator />
      <GridLayout>
        <BlogPostList>
          {group.map(node => (
            <BlogPostItem key={node.slug} node={node} />
          ))}
        </BlogPostList>
      </GridLayout>
      <SectionSeparator />
      <GridLayout>
        <Pagination role="navigation">
          <PaginationLink
            test={first}
            url={previousUrl}
            text="Novšie príspevky"
            class="previous"
          />
          <div className="pageNumber">
            {index}/{pageCount}
          </div>
          <PaginationLink
            test={last}
            url={nextUrl}
            text="Staršie príspevky"
            class="next"
          />
        </Pagination>
      </GridLayout>
    </>
  );
};

export default BlogIndex;
