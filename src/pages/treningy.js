/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import { colors, colors2 } from '../consts/style';
import Gallery from '../components/Gallery';

import {
  SectionWrapper,
  Cover,
  SidePanel,
  MainPanel,
} from '../components/common/LayoutParts';

const IntroText = styled.div`
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
    &:not(:last-child) {
      border-right: 1px solid #e5e8ed;
    }
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

  time::before {
    background: ${props => props.color || 'gray'};
  }

  time {
    font-weight: bold;
    position: relative;

    &:before {
      content: ' ';
      height: 1.6em;
      width: 3px;
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
    <EventCard color={props.color}>
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
      page: datoCmsTreningyPage {
        title
        introText
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        coverImage {
          fluid(maxWidth: 1470) {
            ...GatsbyDatoCmsFluid
          }
        }
        imageGallery {
          fluid(maxWidth: 1470) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
      mondayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Pondelok" }, locale: { eq: "sk" } }
        sort: { fields: timeStart }
      ) {
        edges {
          node {
            day
            timeStart
            timeEnd
            description
            color {
              hex
            }
          }
        }
      }
      tuesdayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Utorok" }, locale: { eq: "sk" } }
        sort: { fields: timeStart }
      ) {
        edges {
          node {
            day
            timeStart
            timeEnd
            description
            color {
              hex
            }
          }
        }
      }
      wednesdayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Streda" }, locale: { eq: "sk" } }
        sort: { fields: timeStart }
      ) {
        edges {
          node {
            day
            timeStart
            timeEnd
            description
            color {
              hex
            }
          }
        }
      }
      thursdayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Štvrtok" }, locale: { eq: "sk" } }
        sort: { fields: timeStart }
      ) {
        edges {
          node {
            day
            timeStart
            timeEnd
            description
            color {
              hex
            }
          }
        }
      }
      fridayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Piatok" }, locale: { eq: "sk" } }
        sort: { fields: timeStart }
      ) {
        edges {
          node {
            day
            timeStart
            timeEnd
            description
            color {
              hex
            }
          }
        }
      }
    }
  `);

  const { title, introText, imageGallery, seoMetaTags } = data.page;

  const mondayEvents = data.mondayEvents.edges;
  const tuesdayEvents = data.tuesdayEvents.edges;
  const wednesdayEvents = data.wednesdayEvents.edges;
  const thursdayEvents = data.thursdayEvents.edges;
  const fridayEvents = data.fridayEvents.edges;

  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <SectionWrapper>
          <SidePanel>
            <Title>{title} </Title>
          </SidePanel>
          <MainPanel>
            <IntroText
              dangerouslySetInnerHTML={{
                __html: introText,
              }}
            />
          </MainPanel>
        </SectionWrapper>

        <SectionSeparator />

        <SectionWrapper>
          <SidePanel>
            <Title>Rozpis tréningov</Title>
          </SidePanel>
          <MainPanel>
            <Calendar>
              <Day>
                <h4>Pondelok</h4>
                {map(mondayEvents, event => (
                  <Event
                    start={event.node.timeStart}
                    end={event.node.timeEnd}
                    description={event.node.description}
                    color={event.node.color.hex}
                  />
                ))}
              </Day>
              <Day>
                <h4>Utorok</h4>
                {map(tuesdayEvents, event => (
                  <Event
                    start={event.node.timeStart}
                    end={event.node.timeEnd}
                    description={event.node.description}
                    color={event.node.color.hex}
                  />
                ))}
              </Day>
              <Day>
                <h4>Streda</h4>
                {map(wednesdayEvents, event => (
                  <Event
                    start={event.node.timeStart}
                    end={event.node.timeEnd}
                    description={event.node.description}
                    color={event.node.color.hex}
                  />
                ))}
              </Day>
              <Day>
                <h4>Štvrtok</h4>
                {map(thursdayEvents, event => (
                  <Event
                    start={event.node.timeStart}
                    end={event.node.timeEnd}
                    description={event.node.description}
                    color={event.node.color.hex}
                  />
                ))}
              </Day>
              <Day>
                <h4>Piatok</h4>
                {map(fridayEvents, event => (
                  <Event
                    start={event.node.timeStart}
                    end={event.node.timeEnd}
                    description={event.node.description}
                    color={event.node.color.hex}
                  />
                ))}
              </Day>
            </Calendar>
          </MainPanel>
        </SectionWrapper>

        <SectionSeparator />

        <SectionWrapper>
          <SidePanel>
            <Title>Pohľad na tréningy</Title>
          </SidePanel>
          <MainPanel>
            <Gallery itemsPerRow={3} images={imageGallery} />
          </MainPanel>
        </SectionWrapper>
      </Container>
    </ScaleUp>
  );
};

export default TreningyPage;
