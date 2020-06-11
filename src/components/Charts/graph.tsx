import { Tooltip } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, curveMonotoneX, line, scaleLinear, select } from 'd3';
import React, { useEffect, useRef } from 'react';
import { withDrawerOpen } from '../../utils';
import { useStyles } from './styles';
import { clearChart, margin, randomColor } from './utils';

const createChart = (node: SVGSVGElement, props: Props) =>
  setTimeout(() => {
    const { fx, xMin, xMax, samples, points } = props;

    if (node) {
      const sample = (xMax - xMin) / samples!;
      const curvePoints = Array.from({ length: samples! }).map((_, i) => ({
        x: xMin + i * sample,
        y: fx(xMin + i * sample)
      }));

      const width = parseInt(select(node).style('width'), 10) - margin * 2;
      const height = parseInt(select(node).style('height'), 10) - margin * 2;

      const xScale = scaleLinear() // set the x scale and fit to width
        .domain([xMin, xMax])
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([xMin, xMax])
        .range([height, 0]);

      const s = select(node).select('.innerG');

      s.selectAll('.xAxis').remove();
      s.append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height / 2})`)
        .call(axisBottom(xScale));

      s.selectAll('.yAxis').remove();
      s.append('g')
        .attr('class', 'yAxis')
        .attr('transform', `translate(${width / 2}, 0)`)
        .call(axisLeft(yScale));

      const chartLine = line<Point>() // make the line generator function
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(curveMonotoneX);

      const color = randomColor();

      s.select('.curve')
        .datum(curvePoints)
        .attr('d', chartLine)
        .style('stroke', color('0.4'))
        .style('fill', 'none')
        .style('stroke-width', 3);

      const pointColor = randomColor();
      s.selectAll('.graph-point')
        .data(points || [])
        .attr('r', 3)
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .style('fill', pointColor('0.3'));
    }
  }, 1000);

type PointProp = [number, number];

interface Props {
  fx: (x: number) => number;
  samples?: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xLabel: string | React.ReactNode;
  yLabel: string | React.ReactNode;
  width?: string;
  points?: PointProp[];
}

interface Point {
  x: number;
  y: number;
}

const graph = (props: Props) => {
  const classes = useStyles();

  const node = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (node.current) {
      clearChart(node.current);
      createChart(node.current, props);
    }
  });
  const textColor = randomColor();
  return (
    <div className={classes.svgContainer}>
      <svg ref={node} width={props.width} className={c(classes.svg)} style={{ margin: 20 }}>
        <g className="axisLabels">
          <foreignObject y="100" children={<span style={{ color: textColor('0.4') }}>{props.xLabel}</span>} />
        </g>
        <g className="innerG" transform={`translate(${margin}, ${margin})`}>
          <path className="curve" />
          {props.points &&
            props.points.map((p, i) => (
              <Tooltip key={`point-${i}`} title={`x: ${p[0]} y: ${p[1]}`}>
                <circle className="graph-point" />
              </Tooltip>
            ))}
        </g>
      </svg>
    </div>
  );
};

graph.defaultProps = {
  width: '100%',
  samples: 1000,
  yLabel: 'Y',
  xLabel: 'X',
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10
};

export const Graph = withDrawerOpen(graph);
