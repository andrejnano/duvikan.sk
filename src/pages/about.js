import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import SEO from '../components/SEO';

import { ScaleUp } from '../style/motion';

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  overflow: auto;
  display: flex;
  justify-content: center;
  max-width: 100%;
  padding: 20px;
`;

const Inner = styled.div`
  width: 700px;
  max-width: 100%;
  text-align: left;
`;

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query aboutQuery {
      datoCmsAboutPage {
        title
        intro
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
    }
  `);

  const { title, intro, seoMetaTags } = data.datoCmsAboutPage;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Wrapper>
        <Inner>
          <h1>{title}</h1>
          <p>{intro}</p>
        </Inner>
      </Wrapper>
    </ScaleUp>
  );
};

export default AboutPage;
