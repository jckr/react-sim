import React, { useEffect, useRef } from 'react';
import { Flex, Box, Text } from 'rebass';
import { Label } from '@rebass/forms';
import { withFrame } from './';

function getMaxMinDatapoint(
  datapoint = {},
  series = [],
  prev = [-Infinity, Infinity]
) {
  return series.reduce((p, c) => {
    const [currentMax, currentMin] = p;
    const value = c.accessor ? c.accessor(datapoint) : datapoint;
    return [Math.max(currentMax, value), Math.min(currentMin, value)];
  }, prev);
}

function getMaxMin(data = [], series = []) {
  return data.reduce((prev, curr) => getMaxMinDatapoint(curr, series, prev), [
    -Infinity,
    Infinity
  ]);
}

export const TimeSeriesComponent = ({
  cachedData,
  data,
  height = 80,
  width = 500,
  padding = 10,
  tick,
  params,
  series,
  stacked = false
}) => {
  const { minTime, maxTime } = params;
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    if (!cachedData || Object.keys(cachedData).length < 2) {
      return;
    }
    const seriesArray = Array.isArray(series) ? series : [series];

    const scaleX = (x) => (1 + (w - 2) * (x - minTime)) / (maxTime - minTime);
    if (stacked === false) {
      drawLineSeries({
        ctx,
        scaleX,
        h,
        series: seriesArray,
        cachedData,
        data,
        minTime,
        tick
      });
    } else {
      drawStackedSeries({
        ctx,
        scaleX,
        h,
        series: seriesArray,
        cachedData,
        data,
        minTime,
        tick
      });
    }
  }, [tick]);

  function drawLineSeries({
    ctx,
    scaleX,
    h,
    series,
    cachedData,
    data,
    minTime,
    tick
  }) {
    const [maxY, minY] = getMaxMin(Object.values(cachedData), series);
    const scaleY = (y) => (1 + (h - 2) * (maxY - y)) / (maxY - minY);

    series.forEach((s) => {
      ctx.strokeStyle = s.color || '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let x = 0;
      let y = scaleY(
        s.accessor ? s.accessor(cachedData[minTime]) : cachedData[minTime]
      );
      ctx.moveTo(x, y);
      for (let i = minTime; i < tick; i++) {
        const d = i < tick ? cachedData[i] : data;
        x = scaleX(i);
        y = scaleY(s.accessor ? s.accessor(d) : d);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
  }

  function drawStackedSeries({
    ctx,
    scaleX,
    h,
    series,
    data,
    cachedData,
    minTime,
    tick
  }) {
    const maxmins = Object.entries(cachedData).reduce((prev, [key, value]) => {
      prev[key] = {
        max: series.reduce(
          (p, c) => (c.accessor ? c.accessor(value) : value) + p,
          0
        ),
        min: 0
      };
      return prev;
    }, {});
    const scaleY = (x, y) =>
      (1 + (h - 2) * (maxmins[x].max - y)) / maxmins[x].max;

    series.forEach((s, j) => {
      ctx.fillStyle = s.color || '#000';
      ctx.beginPath();
      let x = scaleX(tick);
      let y = scaleY(tick, maxmins[tick].min);
      ctx.moveTo(x, y);
      for (let i = tick; i >= minTime; i--) {
        const d = maxmins[i].min;
        x = scaleX(i);
        y = scaleY(i, d);
        ctx.lineTo(x, y);
      }

      for (let i = minTime; i <= tick; i++) {
        const value = i < tick ? cachedData[i] : data;
        const d = (s.accessor ? s.accessor(value) : value) + maxmins[i].min;
        x = scaleX(i);
        y = scaleY(i, d);
        ctx.lineTo(x, y);
        maxmins[i].min = d;
      }
      ctx.fill();
    });
  }

  return (
    <Box sx={{ width: [width], height: [height], padding: [padding] }}>
      <canvas
        width={`${width - 2 * padding}px`}
        height={`${height - 2 * padding}px`}
        ref={canvasRef}
      />
    </Box>
  );
};

export const IndicatorComponent = ({ data, series }) => {
  return (
    <Flex flexDirection='column' sx={{ flex: '1 1 0' }}>
      <Flex flexDirection='row' alignItems='center'>
        <Box
          sx={{
            bg: [series.color],
            padding: 1,
            height: 0,
            borderRadius: '100%',
            mr: 2
          }}
        />
        <Label>{series.label}</Label>
      </Flex>
      <Text sx={{ fontSize: 5, ml: 3, fontWeight: 'normal' }}>
        {String(series.accessor ? series.accessor(data) : data)}
      </Text>
    </Flex>
  );
};

export const CounterComponent = ({
  data,
  series,
  height = 50,
  width = 500,
  padding = 10,
  ...props
}) => {
  const seriesArray = Array.isArray(series) ? series : [series];
  return (
    <Flex
      flexDirection='row'
      sx={{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: [height],
        width: [width],
        padding: [padding],
        mb: 2
      }}
      {...props}
    >
      {seriesArray.map((s, i) => (
        <Indicator key={`indicator-${i}`} series={s} data={data} />
      ))}
    </Flex>
  );
};

export const TimeSeries = withFrame(TimeSeriesComponent);
export const Counter = withFrame(CounterComponent);
export const Indicator = withFrame(IndicatorComponent);
