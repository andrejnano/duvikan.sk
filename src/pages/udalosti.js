/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { ScaleUp } from '../style/motion';
import { colors, colorScheme, boxShadow } from '../consts/style';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);

// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { GridLayout } from '../components/common/LayoutParts';
// const myEventsList = [
//   {
//     title: 'Event1',
//     start: new Date('September 02, 2019 03:24:00'),
//     end: new Date('September 03, 2019 03:24:00'),
//     allDay: true,
//   },
//   {
//     title: 'Event2',
//     start: new Date('August 24, 2019 03:24:00'),
//     end: new Date('August 28, 2019 03:24:00'),
//     allDay: true,
//   },
// ];

const CalendarWrap = styled.div`
  grid-column: 2/-2;
  height: 60vh;
`;

const MyCalendar = props => (
  <CalendarWrap>
    <Calendar
      localizer={localizer}
      events={props.eventList}
      startAccessor="start"
      endAccessor="end"
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
    }
  `);

  const { title, events, seoMetaTags } = data.page;
  return (
    <>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <Title>{title} </Title>
        <MyCalendar eventList={events} />
      </GridLayout>
    </>
  );
};

export default UdalostiPage;
