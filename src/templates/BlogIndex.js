/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { map } from 'lodash';

import SEO from '../components/SEO';

import { font, colors } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';

const Wrapper = styled.div`
  background: transparent;
  color: ${colors.white};
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  margin: 3rem 0;
  span {
    display: none;
    font-size: 3rem;
    color: ${colors.mediumWash};
    font-weight: 400;
  }
`;

const PostLink = styled.div`
  margin-bottom: 1em;
  width: 100%;
  a {
    > div {
      border-top: 2px solid ${colors.gray1};
      padding: 1rem;
      p {
        max-width: 720px;
      }
    }
    &:hover {
      div {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #ccc;
  font-size: 1.3rem;
`;

const Pagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
  font-size: 2rem;
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
      <Wrapper>
        <Container>
          <Title>
            {title} <span>&mdash; {index}/{pageCount}</span>
          </Title>
          {group.map(node => (
            <PostLink key={node.slug}>
              <Link to={`/blog/${node.slug}/`}>
                <div>
                  <h3>{node.title}</h3>
                  <p>{node.contentNode.childMarkdownRemark.excerpt}</p>
                  <PostInfo>
                    <time>
                      <Moment format="DD.MM.YYYY">{node.meta.updatedAt}</Moment>
                    </time>
                    <div>
                      {node.contentNode.childMarkdownRemark.timeToRead} min read
                    </div>
                  </PostInfo>
                </div>
              </Link>
            </PostLink>
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
        </Container>
      </Wrapper>
    </ScaleUp>
  );
};

export default BlogIndex;
