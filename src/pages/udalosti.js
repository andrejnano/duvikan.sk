/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { colors, colorScheme, boxShadow } from '../consts/style';
import { GridLayout } from '../components/common/LayoutParts';
import Moment from 'react-moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

const EventList = styled.ul`
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
  width: 100%;
  margin-bottom: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.2rem;

  &.hidden {
    display: none;
  }

  .start {
    color: ${colorScheme.gray};
    margin-right: 1rem;
    width: 100%;
  }

  .title {
    color: ${colorScheme.main};
    margin: 0;
    margin-right: 0.5rem;
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

  const [ showOldEvents, setShowOldEvents ] = useState(false);

  const data = useStaticQuery(graphql`
    query UdalostiQuery {
      page: datoCmsUdalostiPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
      events: allDatoCmsEvent(
        sort: { fields: start, order: ASC }
        filter: { locale: { eq: "sk" } }
      ) {
        nodes {
          title
          start
          end
          allDay
          location {
            latitude
            longitude
          }
        }
      }
    }
  `);

  const { title, seoMetaTags } = data.page;
  const events = data.events.nodes;

  return (
    <>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <Title>{title} </Title>
        <EventList>
        <h2>Najbližšie udalosti</h2>
          { events
            .filter((event) => {
              let eventDate = new Date(event.start).setHours(0,0,0,0);
              let todayDate = new Date().setHours(0,0,0,0);
              return eventDate >= todayDate;
            })
            .map((event, index) => { return (
              <Event key={event.title + index}>
                <Moment className="start" format="DD.MM.YYYY">
                  {event.start}
                </Moment>
                <h3 className="title">
                  {event.title}
                </h3>
                {
                  event.location &&
                  <a target="_blank" title="Otvoriť mapu s miestom konania udalosti" href={`https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`}>
                    <FontAwesomeIcon icon={['far', 'map-marker-alt']} />
                  </a>
                }
              </Event>
            )})
          }
          <button onClick={() => setShowOldEvents(!showOldEvents)}>
            { showOldEvents ? "Skryť staršie udalosti" : "Zobraziť staršie udalosti" }
          </button>
        </EventList>
        { 
          showOldEvents &&
          <EventList>
            <h2>Staršie udalosti</h2>
            { events
              .filter((event) => {
                let eventDate = new Date(event.start).setHours(0,0,0,0);
                let todayDate = new Date().setHours(0,0,0,0);
                return eventDate < todayDate;
              })
              .map((event, index) => { return (
                <Event key={event.title + index}>
                  <Moment className="start" format="DD.MM.YYYY">
                    {event.start}
                  </Moment>
                  <h3 className="title">
                    {event.title}
                  </h3>
                  {
                    event.location &&
                    <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`}>
                      <FontAwesomeIcon icon={['far', 'map-marker-alt']} />
                    </a>
                  }
                </Event>
              )})
            }
          </EventList>
        }

        <MyCalendar eventList={events} />
      </GridLayout>
    </>
  );
};

export default UdalostiPage;
