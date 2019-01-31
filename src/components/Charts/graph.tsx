import { withStyles, WithStyles } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, curveMonotoneX, line, scaleLinear, select } from 'd3';
import React from 'react';
import { compose } from 'recompose';
import { withDrawerOpen } from '../../utils';
import { styles } from './styles';
import { clearChart, margin, randomColor } from './utils';

interface Props {
  fx: (x: number) => number;
  samples?: number;
  xMin: number;
  xMax: number;
  width?: string;
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

interface Point {
  x: number;
  y: number;
}

export const Graph = compose<ExtendedProps, Props>(
  withStyles(styles),
  withDrawerOpen
)(
  class extends React.Component<ExtendedProps, {}> {
    public static defaultProps: Partial<Props> = {
      width: '100%',
      samples: 1000
    };

    public node: SVGSVGElement | null = null;

    public componentDidMount() {
      clearChart(this.node);
      this.createChart();
    }

    public componentDidUpdate() {
      this.createChart();
    }

    public createChart = () =>
      setTimeout(() => {
        const { fx, xMin, xMax, samples } = this.props;

        if (this.node) {
          const sample = (xMax - xMin) / samples!;
          const points = Array.from({ length: samples! }).map((_, i) => ({
            x: xMin + i * sample,
            y: fx(xMin + i * sample)
          }));

          const width = parseInt(select(this.node).style('width'), 10) - margin * 2;
          const height = parseInt(select(this.node).style('height'), 10) - margin * 2;

          const xScale = scaleLinear() // set the x scale and fit to width
            .domain([xMin, xMax])
            .range([0, width]);

          const yScale = scaleLinear()
            .domain([xMin, xMax])
            .range([height, 0]);

          const s = select(this.node).select('.innerG');

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
            .datum(points)
            .attr('d', chartLine)
            .style('stroke', color('0.4'))
            .style('fill', 'none')
            .style('stroke-width', 3);
        }
      }, 1000);

    public render() {
      const { classes } = this.props;

      return (
        <div className={classes.svgContainer}>
          <svg ref={n => (this.node = n)} width={this.props.width} className={c(classes.svg)} style={{ margin: 20 }}>
            <g className="innerG" transform={`translate(${margin}, ${margin})`}>
              <path className="curve" />
            </g>
          </svg>
        </div>
      );
    }
  }
);
