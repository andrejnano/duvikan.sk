import React from 'react';
import styled from 'styled-components';
import { boxShadow, colorScheme } from '../../consts/style';

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 5% 1fr 1fr 1fr 1fr 5%;
`;

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
  padding: 3rem 0;

  @media (min-width: 950px) {
    flex-direction: row;
  }
`;

export const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #000;
  opacity: 0.075;
  border: 0;
  margin: 3rem 0;
  overflow: visible;
`;

export const Cover = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  max-height: 40vh;
  margin-bottom: 3rem;
  > div {
    flex: 100%;
    box-shadow: ${boxShadow};
  }
`;

export const SidePanel = styled.div`
  width: 100%;
  padding: 2rem;

  @media (min-width: 950px) {
    padding: 0;
    width: 200px;
  }
`;

export const MainPanel = styled.main`
  flex: 1;
  display: block;
  position: relative;
`;
