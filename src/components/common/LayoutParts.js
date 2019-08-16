import React from 'react';
import styled from 'styled-components';

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

export const Cover = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  max-height: 40vh;
  > div {
    flex: 100%;
    border-radius: 3px;
    border: 1px solid #e5e8ed;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  }
`;

export const SidePanel = styled.div`
  width: 100%;
  padding: 2rem;

  @media (min-width: 950px) {
    padding: 0;
    width: 200px;
  }

  .btn {
    appearance: none;
    overflow: visible;
    vertical-align: middle;
    cursor: pointer;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    transition: all easeInOutCubic 0.25s;
    border-radius: 3px;
    color: #333;
    background: #ececec;
    padding: 1rem 3rem;
    font-weight: 600;
    border: 0;

    &:hover {
      background: #dfdfdf;
    }
  }
`;

export const MainPanel = styled.main`
  flex: 1;
  display: block;
  position: relative;
`;
