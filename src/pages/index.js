import React from 'react';
import styled from 'styled-components';

import { graphql, useStaticQuery, Link } from 'gatsby';

import SEO from '../components/SEO';

import { font, colors } from '../consts/style';
import { ScaleUp } from '../style/motion';

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 2rem;
`;

const InnerLeft = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;

  img {
    max-width: 100%;
  }
`;

const InnerRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

const Title = styled.h1`
  ${font.h1}
  line-height: 1;
`;

const Subtitle = styled.h2`
  font-weight: 200;
  color: ${colors.red};
`;

const Description = styled.p`
  padding: 1rem 0;
`;

const QuickLinks = styled.div`
  display: flex;
  a {
    padding-right: 1rem;
    button {
      ${font.button};
      background: transparent;
      border: 1px solid ${colors.light};
      color: ${colors.light};
      padding: 0.35em 0.7em;
      margin-top: 0.7em;
      border-radius: 2px;
    }
    &:hover {
      button {
        background: ${colors.light};
        color: ${colors.dark};
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexQuery {
      datoCmsHomePage {
        title
        subtitle
        description
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
    }
  `);

  const { title, subtitle, description, seoMetaTags } = data.datoCmsHomePage;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Wrapper>
        <InnerLeft>
          <img src="https://images.unsplash.com/photo-1544393159-7f1a1f809f10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80" />
        </InnerLeft>
        <InnerRight>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Description>{description}</Description>
          <QuickLinks>
            <Link to="/blog">
              <button>Novinky</button>
            </Link>
            <Link to="/treningy">
              <button>Rozpis tréningov</button>
            </Link>
            <Link to="/historia">
              <button>História okinawského karate</button>
            </Link>
          </QuickLinks>
        </InnerRight>
      </Wrapper>
    </ScaleUp>
  );
};

export default IndexPage;
