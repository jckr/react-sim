import React from 'react';
import { withControls, withFrame, Range } from 'react-sim';
import { Flex, Text } from 'rebass';

import { FullWidthModel as Model } from './framed-model';

export const DefaultTimer = () => (
  <Model>
    <div />
  </Model>
);

export const NegativeMinTime = () => (
  <Model minTime={-10} maxTime={0}>
    <div />
  </Model>
);

export const HideTimerBlock = () => (
  <Model showTime={false}>
    <div />
  </Model>
);

export const HideTimerSlider = () => (
  <Model showTimeSlider={false}>
    <div />
  </Model>
);

const ControlFrame = ({
  params: { delay, minTime, maxTime, ticksPerAnimation, ...otherParams },
  tick,
  showTime,
}) => {
  console.log({
    params: { delay, minTime, maxTime, ticksPerAnimation, ...otherParams },
    tick,
    showTime,
  });
  return (
    <div>
      {Object.keys(otherParams).length > 0 && (
        <>
          <Text sx={{ fontSize: 1, fontWeight: 'bold' }}>params:</Text>
          <pre>{JSON.stringify(otherParams, null, 2)}</pre>
        </>
      )}
      {showTime && <pre>{JSON.stringify({ tick }, null, 2)}</pre>}
    </div>
  );
};

export const CheckBoxExample = () => (
  <Model
    showTimer={false}
    initialParams={{ checked: false }}
    controls={{
      type: 'checkbox',
      label: 'Check me',
      param: 'checked',
    }}
  >
    <ControlFrame />
  </Model>
);

export const ToggleExample = () => (
  <Model
    showTimer={false}
    initialParams={{ checked: false }}
    controls={{
      type: 'toggle',
      label: 'Toggle me',
      param: 'checked',
    }}
  >
    <ControlFrame />
  </Model>
);

export const CheckAndToggleExample = () => (
  <Model
    showTimer={false}
    initialParams={{ checked: false }}
    controls={[
      [
        {
          type: 'checkbox',
          label: 'Check me again',
          param: 'checked',
        },
        {
          type: 'toggle',
          label: 'Toggle me again',
          param: 'checked',
        },
      ],
    ]}
  >
    <ControlFrame />
  </Model>
);

export const RadioExample = () => (
  <Model
    showTimer={false}
    initialParams={{ options: 'jet' }}
    controls={[
      {
        type: 'radio',
        name: 'radio-example',
        label: 'Choose one',
        param: 'options',
        options: ['jet', 'set', 'radio'],
      },
    ]}
  >
    <ControlFrame />
  </Model>
);

export const SelectExample = () => (
  <Model
    showTimer={false}
    initialParams={{ options: 'jet' }}
    controls={[
      {
        type: 'select',
        label: 'Choose one',
        name: 'select-example',
        param: 'options',
        options: ['jet', 'set', 'radio'],
      },
    ]}
  >
    <ControlFrame />
  </Model>
);

export const SelectAndRadioExample = () => (
  <Model
    showTimer={false}
    initialParams={{ options: 'jet' }}
    controls={[
      {
        type: 'select',
        label: 'Choose one',
        name: 'select-example-2',
        param: 'options',
        options: ['jet', 'set', 'radio'],
      },
      {
        type: 'radio',
        label: 'Choose one',
        name: 'radio-example-2',
        param: 'options',
        options: ['jet', 'set', 'radio'],
      },
    ]}
  >
    <ControlFrame />
  </Model>
);

export const InputExample = () => (
  <Model
    showTimer={false}
    initialParams={{ name: '' }}
    controls={{
      type: 'input',
      label: 'What is your name?',
      name: 'name',
      param: 'name',
    }}
  >
    <ControlFrame />
  </Model>
);

export const RangeExample = () => (
  <Model
    showTimer={false}
    initialParams={{ value: 0 }}
    controls={{
      type: 'range',
      label: 'Choose a value',
      name: 'range',
      param: 'value',
    }}
  >
    <ControlFrame />
  </Model>
);

export const TimerExample = () => (
  <Model
    showTimer={false}
    controls={{
      type: 'timer',
      label: 'My explicit timer',
    }}
  >
    <ControlFrame showTime />
  </Model>
);

export const RowsOfSlidersExample = () => (
  <Model
    showTimer={false}
    initialParams={{ a: 0, b: 0, c: 0 }}
    controls={[
      {
        type: 'range',
        label: 'A',
        name: 'a',
        param: 'a',
      },
      {
        type: 'range',
        label: 'B',
        name: 'b',
        param: 'b',
      },
      {
        type: 'range',
        label: 'C',
        name: 'c',
        param: 'c',
      },
    ]}
  >
    <ControlFrame />
  </Model>
);

export const SlidersOnTwoRowsExample = () => (
  <Model
    showTimer={false}
    initialParams={{ a: 0, b: 0, c: 0 }}
    controls={[
      [
        {
          type: 'range',
          label: 'A',
          name: 'a',
          param: 'a',
        },
      ],
      [
        {
          type: 'range',
          label: 'B',
          name: 'b',
          param: 'b',
        },
        {
          type: 'range',
          label: 'C',
          name: 'c',
          param: 'c',
        },
      ],
    ]}
  >
    <ControlFrame />
  </Model>
);

const MyControl = ({ params, setParams }) => (
  <input
    type="range"
    value={params['my-param']}
    onChange={e => setParams({ 'my-param': Number(e.target.value) })}
  />
);

const CustomControl = withControls(MyControl);
const CustomFrame = withFrame(ControlFrame);
export const CustomControlExample = () => (
  <Model showTimer={false} initialParams={{ 'my-param': 50 }}>
    <Flex flexDirection="column">
      <CustomControl />
      <CustomFrame />
    </Flex>
  </Model>
);

const MyCustomRange = ({ params, setParams }) => {
  const value = params['my-param'];
  const setValue = v => setParams({ 'my-param': v });
  return (
    <Range
      label="My range"
      value={value}
      setValue={setValue}
      minValue={0}
      maxValue={100}
      step={1}
    />
  );
};
const CustomRange = withControls(MyCustomRange);

export const ControlAsComponent = () => (
  <Model showTimer={false} initialParams={{ 'my-param': 50 }}>
    <Flex flexDirection="column">
      <CustomFrame />
      <CustomRange />
    </Flex>
  </Model>
);
