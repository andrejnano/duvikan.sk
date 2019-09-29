/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { colors, colorScheme, boxShadow } from '../consts/style';
import { GridLayout } from '../components/common/LayoutParts';
import Moment from 'react-moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'moment/locale/sk';
const localizer = momentLocalizer(moment);

// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CalendarWrap = styled.div`
  grid-column: 2/-2;
  height: 60vh;

  .calendar {
    border: 1px solid #e6ecf1;
    box-shadow: ${boxShadow};
    background-color: ${colors.white};
    transition: border 250ms ease;
    border-radius: 3px;
    padding: 2rem;
    padding-bottom: 6rem;
    display: block;
    height: 100%;
  }
`;

const Upcoming = styled.ul`
  grid-column: 2/-2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 4rem;
`;

const Event = styled.li`
  position: relative;
  min-width: 250px;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 720px) {
    max-width: 720px;
    width: 50%;
  }

  @media (min-width: 950px) {
    width: 33.333333%;
  }

  @media (min-width: 1470px) {
    width: 25%;
  }

  .innerBox {
    height: 100%;
    display: block;
    position: relative;
    margin: 0rem 1rem 1rem;
    padding: 2rem;
    border: 1px solid #e6ecf1;
    box-shadow: ${boxShadow};
    background-color: ${colors.white};
    transition: border 250ms ease;
    border-radius: 3px;
    display: block;

    .dateInterval {
      .start {
      }
    }

    .title {
      color: ${colorScheme.main};
      font-size: 1.6rem;
      position: relative;
      margin: 0;
    }
  }
`;

const MyCalendar = props => (
  <CalendarWrap>
    <Calendar
      localizer={localizer}
      events={props.eventList}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      views={['month', 'week']}
      culture="sk"
      className="calendar"
    />
  </CalendarWrap>
);

const Title = styled.h1`
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: bold;
  margin: 4rem 0rem;
  padding: 0;
`;

const UdalostiPage = () => {
  const data = useStaticQuery(graphql`
    query UdalostiQuery {
      page: datoCmsUdalostiPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        events {
          title
          start
          end
          allDay
        }
      }
      upcomingEvents: allDatoCmsEvent(
        sort: { fields: start, order: ASC }
        filter: { locale: { eq: "sk" } }
      ) {
        nodes {
          title
          start
          end
        }
      }
    }
  `);

  const { title, events, seoMetaTags } = data.page;
  const upcomingEvents = data.upcomingEvents.nodes;

  return (
    <>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <Title>{title} </Title>
        <Upcoming>
          {map(upcomingEvents, event => (
            <Event key={event.title}>
              <div className="innerBox">
                <div className="dateInterval">
                  <Moment className="start" format="DD.MM.YYYY">
                    {event.start}
                  </Moment>
                </div>
                <h3 className="title">{event.title}</h3>
              </div>
            </Event>
          ))}
        </Upcoming>
        <MyCalendar eventList={events} />
      </GridLayout>
    </>
  );
};

export default UdalostiPage;
