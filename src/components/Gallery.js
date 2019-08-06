/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { chunk, sum } from 'lodash';
import Img from 'gatsby-image';
import { Box } from 'rebass';

const Gallery = ({ images, itemsPerRow }) => {
  // split images into groups of the given size
  const rows = chunk(images, itemsPerRow);
  return (
    <div>
      {rows.map(row => {
        // sum aspect ratios of images in the given row
        const rowAspectRatioSum = sum(row.map(image => image.fluid.aspectRatio));
        return row.map(image => (
          <Img
            key={image.fluid.src}
            fluid={image.fluid}
            style={{
              width: `${(image.fluid.aspectRatio / rowAspectRatioSum) * 100}%`,
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          />
        ));
      })}
    </div>
  );
};

export default Gallery;
