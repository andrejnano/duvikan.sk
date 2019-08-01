import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import SEO from '../components/SEO';

import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
`;

const InnerLeft = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 100%;
  flex: 1;

  img {
    max-width: 60%;
  }
`;

const InnerRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  overflow: auto;
`;

const HistoriaPage = () => {
  const data = useStaticQuery(graphql`
    query HistoriaQuery {
      datoCmsHistoriaPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        coverImage {
          url
        }
        content
      }
    }
  `);

  const { title, content, coverImage, seoMetaTags } = data.datoCmsHistoriaPage;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <Wrapper>
          <InnerLeft>
            <img src={coverImage.url} alt={title} />
          </InnerLeft>
          <InnerRight>
            <h1>{title}</h1>

            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </InnerRight>
        </Wrapper>
      </Container>
    </ScaleUp>
  );
};

export default HistoriaPage;
