import React from 'react';
import { CanvasFrame } from 'react-sim';

import { FitContentModel as Model } from './framed-model';


export const params = {};
export const initData = () => {};
export const updateData = ({ data }) => data;
export const draw = () => {};

export const Frame = props => <CanvasFrame draw={draw} {...props} />;

const Template = () => (
  <Model initialParams={params} initData={initData} updateData={updateData}>
    <Frame />
  </Model>
);

export default Template;

