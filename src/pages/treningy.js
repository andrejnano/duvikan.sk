/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { ScaleUp } from '../style/motion';
import { colors, colorScheme, boxShadow } from '../consts/style';
import Gallery from '../components/Gallery';

import { GridLayout } from '../components/common/LayoutParts';

const IntroText = styled.div`
  grid-column: 2/-2;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: ${boxShadow};
  padding: 3rem;

  p {
    font-size: 20px;
    letter-spacing: -0.017em;
    line-height: 28px;
    font-weight: 400;
  }

  a {
    color: ${colorScheme.secondary};
    font-weight: 400;
    &:hover {
      /* text-decoration: underline; */
      opacity: 0.75;
    }
  }
`;

const Title = styled.h1`
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: bold;
  margin: 4rem 0rem;
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
  grid-column: 2/-2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* height: 100%; */
  /* padding: 1rem; */

  @media (min-width: 1200px) {
    height: 100%;
  }
`;

const Day = styled.div`
  /* height: 100%; */
  flex: 100%;
  &:not(:last-child) {
    padding-right: 2rem;
  }

  @media (min-width: 1200px) {
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
  border: 1px solid #e6ecf1;
  box-shadow: ${boxShadow};
  background-color: ${colors.white};
  transition: border 250ms ease;
  border-radius: 3px;
  margin-bottom: 2rem;
  margin-left: 2rem;
  color: ${colors.black};
  border: 1px solid ${props => props.color || 'gray'};
  /* box-shadow: 0 3px 8px 0 ${props => props.color + '20' || 'gray'}; */
  background: ${props => props.color + '0A'};

  time::before {
    background: ${props => props.color || 'gray'};
  }

  time {
    font-weight: bold;
    position: relative;

    &:before {
      /* tmp display none */
      display: none;
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

const GalleryWrap = styled.div`
  grid-column: 2/-2;
  margin-bottom: 3rem;
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

const NoTrainingsText = styled.div`
  color: #ccc;
  padding: 1rem;
  text-align: center;
`;

const NoTrainings = () => (
  <NoTrainingsText>V tento deň nie sú žiadne tréningy.</NoTrainingsText>
);

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
      saturdayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Sobota" }, locale: { eq: "sk" } }
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
      sundayEvents: allDatoCmsTrainingEvent(
        filter: { day: { eq: "Nedeľa" }, locale: { eq: "sk" } }
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

  // workdays
  const mondayEvents = data.mondayEvents.edges;
  const tuesdayEvents = data.tuesdayEvents.edges;
  const wednesdayEvents = data.wednesdayEvents.edges;
  const thursdayEvents = data.thursdayEvents.edges;
  const fridayEvents = data.fridayEvents.edges;
  // weekend
  const saturdayEvents = data.saturdayEvents.edges;
  const sundayEvents = data.sundayEvents.edges;

  return (
    <>
      <SEO meta={seoMetaTags} />

      <GridLayout>
        <Title>Rozpis tréningov</Title>
        <Calendar>
          <Day>
            <h4>Pondelok</h4>
            {mondayEvents.length == 0 ? <NoTrainings/>
            : map(mondayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
          <Day>
            <h4>Utorok</h4>
            {tuesdayEvents.length == 0 ? <NoTrainings/>
            : map(tuesdayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
          <Day>
            <h4>Streda</h4>
            {wednesdayEvents.length == 0 ? <NoTrainings/>
            : map(wednesdayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
          <Day>
            <h4>Štvrtok</h4>
            {thursdayEvents.length == 0 ? <NoTrainings/>
            : map(thursdayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
          <Day>
            <h4>Piatok</h4>
            {fridayEvents.length == 0 ? <NoTrainings/>
            : map(fridayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
        </Calendar>
        <Calendar>
          <Day>
            <h4>Sobota</h4>
            {saturdayEvents.length == 0 ? <NoTrainings/>
            : map(saturdayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
          <Day>
            <h4>Nedeľa</h4>
            {sundayEvents.length == 0 ? <NoTrainings/>
            : map(sundayEvents, event => (
              <Event
                key={`${event.node.day} - ${event.node.description}`}
                start={event.node.timeStart}
                end={event.node.timeEnd}
                description={event.node.description}
                color={event.node.color.hex}
              />
            ))}
          </Day>
          {/* To fix the layout of weekand day, 3 empty virtual days are inserted here */}
          <Day></Day>
          <Day></Day>
          <Day></Day>
        </Calendar>
      </GridLayout>

      <GridLayout>
        <Title>{title}</Title>
        <IntroText
          dangerouslySetInnerHTML={{
            __html: introText,
          }}
        />
      </GridLayout>

      {/* <SectionSeparator /> */}

      <GridLayout>
        <Title>Pohľad na tréningy</Title>
        <GalleryWrap>
          <Gallery itemsPerRow={3} images={imageGallery} />
        </GalleryWrap>
      </GridLayout>
    </>
  );
};

export default TreningyPage;
