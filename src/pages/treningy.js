import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import { colors } from '../consts/style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3rem 0;
  padding: 3rem 0;
`;

const SidePanel = styled.aside`
  width: 150px;
`;

const MainPanel = styled.main`
  flex: 1;

  .intro {
    p {
      font-size: 2rem;
      font-weight: 400;
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

const BigTable = styled.table`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  /* temp solution REMOVE LATER */
  margin-bottom: 60rem;
  background-color: ${colors.white};

  thead {
    td {
      width: 20%;
      font-weight: bold;
      border: 2px solid ${colors.black};
      text-align: left;
      vertical-align: middle;
      padding: 1rem 2rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 1.7rem;
    }
  }

  tbody {
    td {
      width: 20%;
      border: 2px solid ${colors.black};
      vertical-align: middle;
      padding: 1rem 2rem 2rem;

      &.one {
        background: #c5c5d240;
      }

      &.two {
        background: #8e8ea060;
      }

      &.three {
        background: #6e6e8090;
      }

      > time {
        color: #f93a3c;
        font-weight: 600;
        font-size: 1.4rem;
      }
      > div {
        margin-top: 0.6rem;
        color: ${colors.gray4};
        font-size: 1.7rem;
        font-weight: 700;
      }
    }
  }
`;

const TreningyPage = () => {
  const data = useStaticQuery(graphql`
    query TreningyQuery {
      datoCmsTreningyPage {
        title
        introText
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        coverImage {
          fluid(maxWidth: 1800) {
            ...GatsbyDatoCmsFluid
          }
        }
        treningPondelokStart
        treningPondelokEnd
        treningUtorokStart
        treningUtorokEnd
        treningStredaStart
        treningStredaEnd
        treningStvrtokStart
        treningStvrtokEnd
        treningPiatokStart
        treningPiatokEnd
      }
    }
  `);
  const {
    title,
    introText,
    treningPondelokStart,
    treningPondelokEnd,
    treningUtorokStart,
    treningUtorokEnd,
    treningStredaStart,
    treningStredaEnd,
    treningStvrtokStart,
    treningStvrtokEnd,
    treningPiatokStart,
    treningPiatokEnd,
    seoMetaTags,
  } = data.datoCmsTreningyPage;

  // check if trening is set (!= '-')

  const isTreningPondelok = treningPondelokStart == '-' ? false : true;
  const isTreningUtorok = treningUtorokStart == '-' ? false : true;
  const isTreningStreda = treningStredaStart == '-' ? false : true;
  const isTreningStvrtok = treningStvrtokStart == '-' ? false : true;
  const isTreningPiatok = treningPiatokStart == '-' ? false : true;

  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <Wrapper>
          <SidePanel>
            <Title>{title} </Title>
          </SidePanel>
          <MainPanel>
            <div
              className="intro"
              dangerouslySetInnerHTML={{
                __html: introText,
              }}
            />
          </MainPanel>
        </Wrapper>
        <Wrapper>
          <SidePanel>
            <Title>Rozpis tréningov</Title>
          </SidePanel>
          <MainPanel>
            <BigTable>
              <thead>
                <tr>
                  <td>Pondelok</td>
                  <td>Utorok</td>
                  <td>Streda</td>
                  <td>Štvrtok</td>
                  <td>Piatok</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="one">
                    <time>
                      {isTreningPondelok
                        ? `${treningPondelokStart} - ${treningPondelokEnd}`
                        : null}
                    </time>
                    <div>9. - 3. kyu</div>
                  </td>
                  <td>
                    <time>
                      {isTreningUtorok
                        ? `${treningUtorokStart} - ${treningUtorokEnd}`
                        : null}
                    </time>
                  </td>
                  <td className="one">
                    <time>
                      {isTreningStreda
                        ? `${treningStredaStart} - ${treningStredaEnd}`
                        : null}
                    </time>
                    <div>9. - 3. kyu</div>
                  </td>
                  <td>
                    <time>
                      {isTreningStvrtok
                        ? `${treningStvrtokStart} - ${treningStvrtokEnd}`
                        : null}
                    </time>
                  </td>
                  <td className="one">
                    <time>
                      {isTreningPiatok
                        ? `${treningPiatokStart} - ${treningPiatokEnd}`
                        : null}
                    </time>
                    <div>9. - 3. kyu</div>
                  </td>
                </tr>

                <tr>
                  <td className="two">
                    <time>18:00 - 20:00</time>
                    <div>2. kyu - DAN</div>
                  </td>
                  <td className="one">
                    <time>18:00 - 20:00</time>
                    <div>9. - 3. kyu</div>
                  </td>
                  <td className="two">
                    <time>18:00 - 20:00</time>
                    <div>2. kyu - DAN</div>
                  </td>
                  <td className="two">
                    <time>18:00 - 20:00</time>
                    <div>2. kyu - DAN</div>
                  </td>
                  <td className="three">
                    <time>18:00 - 20:00</time>
                    <div>Mix dospelí</div>
                  </td>
                </tr>
              </tbody>
            </BigTable>
          </MainPanel>
        </Wrapper>
      </Container>
    </ScaleUp>
  );
};

export default TreningyPage;
