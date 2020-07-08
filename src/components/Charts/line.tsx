import { Tooltip } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, curveMonotoneX, line, max, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import { withDrawerOpen } from '../../utils';
import { useStyles } from './styles';
import { clearChart, margin, randomColor } from './utils';

const createLineChart = (node: SVGSVGElement, data: Props['data']) =>
  setTimeout(() => {
    if (node) {
      const width = parseInt(select(node).style('width'), 10) - margin * 2;
      const height = parseInt(select(node).style('height'), 10) - margin * 2;

      let dataMax = 0;
      let lenMax = 0;
      Object.keys(data).forEach((k) => {
        const m = max(data[k]) || 0;
        if (m > dataMax) {
          dataMax = m || 0;
        }

        if (data[k].length > lenMax) {
          lenMax = data[k].length;
        }
      });

      const xScale = scaleLinear() // set the x scale and fit to width
        .domain([0, lenMax - 1])
        .range([0, width]);

      const yScale = scaleLinear() // set the y scale and fit to width
        .domain([0, dataMax || 0])
        .range([height, 0]);

      const s = select(node).select('.innerG'); // select the inner g container where elements will be

      s.selectAll('.xAxis').remove();
      s.append('g').attr('class', 'xAxis').attr('transform', `translate(0, ${height})`).call(axisBottom(xScale)); // add the axis

      s.selectAll('.yAxis').remove();
      s.append('g')
        .attr('class', 'yAxis') // set the class for the y axis
        .call(axisLeft(yScale)); // set the axis

      makeLinesFromDataProps(node, data, xScale, yScale);
    }
  }, 1000);

const makeLinesFromDataProps = (node: SVGSVGElement, data: Props['data'], xScale, yScale) => {
  const chartLine = line() // make the line generator function
    .x((_, i) => xScale(i))
    .y((d) => yScale(d[1]))
    .curve(curveMonotoneX);

  const s = select(node).select('.innerG');

  Object.keys(data).forEach((k) => {
    const dataset = data[k].map((y, x) => [x, y] as [number, number]);
    const color = randomColor();

    s.select(`.line-${k}`) // select the line for the current data key
      .datum(dataset)
      .transition()
      .duration(1000)
      .style('stroke', color('.2')) // give a dynamic stroke color
      .attr('d', chartLine);

    s.selectAll(`.dot-${k}`) // select the dot for the current data key
      .data(dataset)
      .transition()
      .duration(1000)
      .style('stroke', color('.5')) // add a dynamic color
      .style('fill', 'rgba(255,255,255,.8)')
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', (d) => yScale(d[1]))
      .attr('r', 3);
  });

  s.selectAll('.dot').style('stroke-width', 3);
};

interface Props {
  data: { [k: string]: number[] };
  width?: string; // a percentage
}

const lChart = ({ data, width }: Props) => {
  const classes = useStyles();

  const node = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (node.current) {
      clearChart(node.current);
      createLineChart(node.current, data);
    }
  });

  return (
    <div className={classes.svgContainer}>
      <svg ref={node} width={width} className={classes.svg}>
        <g className="innerG" transform={`translate(${margin}, ${margin})`}>
          {/* lines are blaced before (under) dots */}
          {Object.keys(data).map((k) => (
            <Tooltip key={k} title={k}>
              <path className={c('line', `line-${k}`)} />
            </Tooltip>
          ))}
          {Object.keys(data).map((k) =>
            data[k].map((d, i) => (
              <Tooltip key={`${k}${i}`} title={`${k}: ${d}`}>
                <circle className={c('dot', `dot-${k}`)} />
              </Tooltip>
            ))
          )}
        </g>
      </svg>
    </div>
  );
};

lChart.defaultProps = {
  width: '100%',
};

export const LineChart = withDrawerOpen(lChart);
