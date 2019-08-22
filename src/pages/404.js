import React from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';

const Wrapper = styled.div`
  padding: 6rem 0;
  text-align: center;
  height: calc(100vh - 100px);
`;

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Wrapper>
      <h1>404</h1>
      <h2>Stránka nebola nájdená</h2>
    </Wrapper>
  </>
);

export default NotFoundPage;
