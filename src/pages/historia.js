import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

import { GridLayout } from '../components/common/LayoutParts';

import { colors, colorScheme, boxShadow } from '../consts/style';

const IntroHeadline = styled.div`
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: bold;
  margin: 4rem 0rem;
  padding: 0;
`;

const FirstParagraph = styled.div`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/4;
  }
  > div {
    padding-right: 2rem;
    p {
      max-width: 720px;
      text-align: justify;
      font-size: 2rem;
      font-weight: 400;
      color: ${colors.gray4};
      letter-spacing: -0.004em;
      line-height: 1.58;
    }
  }
`;

const FirstImage = styled.section`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 5/-3;
  }
`;

const MainContent = styled.section`
  grid-column: 2/-2;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: ${boxShadow};
  margin: 2rem 0 4rem;
  padding: 2rem;

  ul {
    li {
      padding: 2rem 0;
      margin: 0;
      list-style-type: none;
      position: relative;

      &::before {
        content: ' ';
        height: 100%;
        width: 3px;
        background-color: currentColor;
        position: absolute;
        left: -2rem;
        top: 0;
        opacity: 0.5;
        border-top-right-radius: 1px;
        border-bottom-right-radius: 1px;
      }
      &::after {
        content: ' ';
        height: 10px;
        width: 10px;
        background-color: currentColor;
        position: absolute;
        left: -2.3rem;
        top: 50%;
        transform: translateY(-50%);
        opacity: 1;
        border-radius: 50%;
      }
    }
  }
`;

const HistoriaPage = () => {
  const data = useStaticQuery(graphql`
    query HistoriaQuery {
      datoCmsHistoriaPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introHeadline
        firstParagraph
        firstImage {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        content
      }
    }
  `);

  const {
    title,
    introHeadline,
    firstParagraph,
    firstImage,
    content,
    seoMetaTags,
  } = data.datoCmsHistoriaPage;
  return (
    <>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <IntroHeadline>{introHeadline}</IntroHeadline>
        <FirstParagraph>
          <div
            dangerouslySetInnerHTML={{
              __html: firstParagraph,
            }}
          />
        </FirstParagraph>
        <FirstImage>
          <Img fluid={firstImage.fluid} />
        </FirstImage>
        <MainContent>
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </MainContent>
      </GridLayout>
    </>
  );
};

export default HistoriaPage;
