import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import { colors } from '../consts/style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin: 3rem 0;
  padding: 3rem 0;
`;

const SidePanel = styled.div`
  width: 150px;
`;

const MainPanel = styled.main`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  > section {
    max-width: 100%;
  }
`;

const IntroHeadline = styled.section`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  flex: 100%;
`;

const FirstParagraph = styled.section`
  flex: 70%;

  > div {
    padding-right: 2rem;
    p {
      text-align: justify;
      font-size: 1.7rem;
      font-weight: 500;
      color: ${colors.gray3};
      letter-spacing: -0.004em;
      line-height: 1.58;
    }
  }
`;

const FirstImage = styled.section`
  flex: 30%;
`;

const MainContent = styled.section`
  flex: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const ClenoviaPage = () => {
  const data = useStaticQuery(graphql`
    query clenoviaQuery {
      page: datoCmsClenoviaPage {
        description
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        members1 {
          name
          description
        }
        members2 {
          name
          description
        }
      }
    }
  `);

  const { seoMetaTags, description, members1, members2 } = data.page;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <Wrapper>
          <SidePanel>
            <Title>Členovia klubu</Title>
          </SidePanel>
          <MainPanel>
            <p>{description}</p>
            <div>
              {map(members1, member => (
                <div>
                  <h2>{member.name}</h2>
                  <p>{member.description}</p>
                </div>
              ))}
              {map(members2, member => (
                <div>
                  <h2>{member.name}</h2>
                  <p>{member.description}</p>
                </div>
              ))}
            </div>
          </MainPanel>
        </Wrapper>
      </Container>
    </ScaleUp>
  );
};

export default ClenoviaPage;
