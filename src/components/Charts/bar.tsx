import { Tooltip } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import { withDrawerOpen } from '../../utils';
import { useStyles } from './styles';
import { clearChart, margin, randomColor } from './utils';

const createBarChart = (node: SVGSVGElement, data: Props['data']) =>
  setTimeout(() => {
    if (node) {
      const width = parseInt(select(node).style('width'), 10) - margin * 2;
      const height = parseInt(select(node).style('height'), 10) - margin * 2;

      const keys = Object.keys(data);

      let dataMax = 0;
      keys.forEach((k) => {
        if (data[k] > dataMax) {
          dataMax = data[k];
        }
      });

      const xScale = scaleBand() // set the x scale and fit to width
        .domain(keys)
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([dataMax || 0, 0])
        .range([0, height]);

      const s = select(node).select('.innerG');

      s.selectAll('.xAxis').remove();
      s.append('g')
        .attr('class', 'xAxis') // set the class for the x axis
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale)); // add the axis

      s.selectAll('.yAxis').remove();
      s.append('g')
        .attr('class', 'yAxis') // set the class for the y axis
        .call(axisLeft(yScale)); // set the axis

      Object.keys(data).forEach((k) => {
        const color = randomColor();
        s.select(`.rect-${k}`)
          .datum(data[k])
          .transition()
          .duration(1000)
          .style('fill', color('0.4'))
          .style('stroke-width', 2)
          .style('stroke', 'rgba(255,255,255,.5)')
          .attr('x', xScale(k) || '')
          .attr('y', yScale(data[k]))
          .attr('height', yScale(0) - yScale(data[k]))
          .attr('width', width / keys.length);
      });
    }
  }, 1000);

interface Props {
  data: { [k: string]: number };
  width?: string;
}

const bChart = ({ data, width }: Props) => {
  const classes = useStyles();

  const node = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (node.current) {
      clearChart(node.current);
      createBarChart(node.current, data);
    }
  });

  return (
    <div className={classes.svgContainer}>
      <svg ref={node} width={width} className={classes.svg}>
        <g className="innerG" transform={`translate(${margin}, ${margin})`}>
          {Object.keys(data).map((k) => (
            <Tooltip key={k} title={`${k}: ${data[k]}`}>
              <rect className={c('rect', `rect-${k}`)} />
            </Tooltip>
          ))}
        </g>
      </svg>
    </div>
  );
};

bChart.defaultProps = {
  width: '100%',
};

export const BarChart = withDrawerOpen(bChart);
