import { Tooltip, withStyles, WithStyles } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, scaleBand, scaleLinear, scaleOrdinal, select, svg } from 'd3';
import React from 'react';
import { styles } from './styles';
import { clearChart, margin, randomColor } from './utils';

interface Props {
  data: { [k: string]: number };
  width: number;
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

interface State {
  height: number;
  width: number;
}

export const BarChart = withStyles(styles)(
  class extends React.Component<ExtendedProps, State> {
    public node: SVGSVGElement | null = null;
    public state = {
      width: 768 - margin * 2,
      height: 768 / 1.618 - margin * 2
    };

    public componentDidMount() {
      clearChart(this.node);
      this.createBarChart();
    }

    public componentDidUpdate() {
      clearChart(this.node);
      this.createBarChart();
    }

    public createBarChart = () => {
      const { data } = this.props;
      const { width, height } = this.state;

      if (this.node) {
        this.node.style.width = `${width + margin * 2}`;
        this.node.style.height = `${height + margin * 2}`;

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

        Object.keys(data).forEach((k, i) => {
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
    };

    // check for the window is for the build step of gatsbyjs which doesn't have the window defined. It's set to
    // be a rectangle based on teh width of the container div
    public refCb = node => {
      this.node = node;
      const baseWidth = node.parentElement.clientWidth * (this.props.width / 100);
      const width = baseWidth - margin * 2;
      const height = baseWidth / 2 - margin * 2;
      this.setState({ width, height });
    };

    public render() {
      const { data, classes } = this.props;
      return (
        <svg className={classes.svg} ref={this.refCb}>
          <g className="innerG" transform={`translate(${margin}, ${margin})`}>
            {Object.keys(data).map(k => (
              <Tooltip key={k} title={`${k}: ${data[k]}`}>
                <rect className={c('rect', `rect-${k}`)} />
              </Tooltip>
            ))}
          </g>
        </svg>
      );
    }
  }
);
