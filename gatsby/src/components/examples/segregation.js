import React from 'react';
import { Model, CanvasFrame } from 'react-sim';

export const params = {};
export const initData = () => {};
export const updateData = ({ data }) => data;
export const draw = () => {};

export const Frame = props => <CanvasFrame draw={draw} {...props} />;

const Segregation = () => (
  <Model initialParams={params} initData={initData} updateData={updateData}>
    <Frame />
  </Model>
);

export default Segregation;

