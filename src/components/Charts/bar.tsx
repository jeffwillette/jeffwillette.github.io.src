import { Tooltip, withStyles, WithStyles } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import React from 'react';
import { compose } from 'recompose';
import { withDrawerOpen } from '../../utils';
import { styles } from './styles';
import { clearChart, margin, randomColor } from './utils';

interface Props {
  data: { [k: string]: number };
  width?: string;
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

export const BarChart = compose<ExtendedProps, Props>(
  withStyles(styles),
  withDrawerOpen
)(
  class extends React.Component<ExtendedProps, {}> {
    public static defaultProps: Partial<Props> = {
      width: '100%'
    };

    public node: SVGSVGElement | null = null;

    public componentDidMount() {
      clearChart(this.node);
      this.createBarChart();
    }

    public componentDidUpdate() {
      this.createBarChart();
    }

    public createBarChart = () =>
      setTimeout(() => {
        const { data } = this.props;

        if (this.node) {
          const width = parseInt(select(this.node).style('width'), 10) - margin * 2;
          const height = parseInt(select(this.node).style('height'), 10) - margin * 2;

          const keys = Object.keys(data);

          let dataMax: number = 0;
          keys.forEach(k => {
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

          const s = select(this.node).select('.innerG');

          s.append('g')
            .attr('class', 'xAxis') // set the class for the x axis
            .attr('transform', `translate(0, ${height})`)
            .call(axisBottom(xScale)); // add the axis

          s.append('g')
            .attr('class', 'yAxis') // set the class for the y axis
            .call(axisLeft(yScale)); // set the axis

          Object.keys(data).forEach(k => {
            const color = randomColor();
            s.select(`.rect-${k}`)
              .datum(data[k])
              .transition()
              .duration(1000)
              .style('fill', color('0.4'))
              .style('stroke-width', 2)
              .style('stroke', 'rgba(255,255,255,.5)')
              .attr('x', xScale(k))
              .attr('y', yScale(data[k]))
              .attr('height', yScale(0) - yScale(data[k]))
              .attr('width', width / keys.length);
          });
        }
      }, 1000);

    public render() {
      const { data, classes } = this.props;

      return (
        <div className={classes.svgContainer}>
          <svg ref={n => (this.node = n)} width={this.props.width} className={classes.svg}>
            <g className="innerG" transform={`translate(${margin}, ${margin})`}>
              {Object.keys(data).map(k => (
                <Tooltip key={k} title={`${k}: ${data[k]}`}>
                  <rect className={c('rect', `rect-${k}`)} />
                </Tooltip>
              ))}
            </g>
          </svg>
        </div>
      );
    }
  }
);
