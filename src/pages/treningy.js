/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import { colors, colors2 } from '../consts/style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3rem 0;
  padding: 3rem 0;
`;

const SidePanel = styled.aside`
  width: 200px;
`;

const MainPanel = styled.main`
  flex: 1;

  .intro {
    background: ${colors.white};
    border-radius: 3px;
    border: 1px solid #e5e8ed;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
    padding: 2rem;

    p {
      font-size: 2rem;
      font-weight: 400;
    }

    a {
      color: ${colors.mediumBlue};
      text-decoration: underline;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

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

const Calendar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
`;

const Day = styled.div`
  height: 100%;
  flex: 100%;
  padding: 2rem;

  @media (min-width: 1470px) {
    flex: 20%;
    &:not(:last-child){ border-right: 1px solid #e5e8ed; }
  }

  h4 {
    text-align: left;
    font-size: 1.6rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
`;

const EventCard = styled.div`
  padding: 2rem;
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  background-color: ${colors.white};
  border-radius: 3px;
  margin-bottom: 2rem;
  color: ${colors.black};
  
  &.blue {
    time::before { background: ${colors2.lightBlue}; }
  }

  &.green {
    time::before { background: ${colors2.lightGreen}; }
  }
  &.red {
    time::before { background: ${colors2.brightRed}; }
  }


  time {
    font-weight: bold;
    position: relative;

    &:before {
      content: ' ';
      height: 1.6em;
      width: 3px;
      background-color: currentColor;
      position: absolute;
      left: -2rem;
      opacity: 1;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  div {
    font-weight: 500;
  }
`;

const Event = props => {
  return (
    <EventCard className={props.color}>
      <time>
        {props.start} - {props.end}
      </time>
      <div>{props.description}</div>
    </EventCard>
  );
};

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

        <SectionSeparator />

        <Wrapper>
          <SidePanel>
            <Title>Rozpis tréningov</Title>
          </SidePanel>
          <MainPanel>
            <Calendar>
              <Day>
                <h4>Pondelok</h4>
                <Event
                  start={treningPondelokStart}
                  end={treningPondelokEnd}
                  description="9. - 3. kyu"
                  color="red"
                />
                <Event
                  start="18:00"
                  end="20:00"
                  description="2. kyu - DAN"
                  color="blue"
                />
              </Day>
              <Day>
                <h4>Utorok</h4>
                <Event
                  start="18:00"
                  end="20:00"
                  description="9. - 3. kyu"
                  color="red"
                />
              </Day>
              <Day>
                <h4>Streda</h4>
                <Event
                  start={treningStredaStart}
                  end={treningStredaEnd}
                  description="9. - 3. kyu"
                  color="red"
                />
                <Event
                  start="18:00"
                  end="20:00"
                  description="2. kyu - DAN"
                  color="blue"
                />
              </Day>
              <Day>
                <h4>Štvrtok</h4>
                <Event
                  start="18:00"
                  end="20:00"
                  description="2. kyu - DAN"
                  color="blue"
                />
              </Day>
              <Day>
                <h4>Piatok</h4>
                <Event
                  start={treningPiatokStart}
                  end={treningPiatokEnd}
                  description="9. - 3. kyu"
                  color="red"
                />
                <Event
                  start="18:00"
                  end="20:00"
                  description="Mix dospelí"
                  color="green"
                />
              </Day>
            </Calendar>
          </MainPanel>
        </Wrapper>
      </Container>
    </ScaleUp>
  );
};

export default TreningyPage;
