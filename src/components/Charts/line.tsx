import { Tooltip, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, curveMonotoneX, line, max, scaleLinear, select } from 'd3';
import React from 'react';
import { compose } from 'recompose';
import { withDrawerOpen } from '../../utils';
import { styles } from './styles';
import { clearChart, margin, randomColor } from './utils';

interface Props {
  data: { [k: string]: number[] };
  width?: string; // a percentage
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

export const LineChart = compose<ExtendedProps, Props>(
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
      this.createLineChart();
    }

    public componentDidUpdate() {
      this.createLineChart();
    }

    public createLineChart = () =>
      setTimeout(() => {
        const { data } = this.props;

        if (this.node) {
          const width = parseInt(select(this.node).style('width'), 10) - margin * 2;
          const height = parseInt(select(this.node).style('height'), 10) - margin * 2;

          let dataMax: number = 0;
          let lenMax: number = 0;
          Object.keys(data).forEach(k => {
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

          const s = select(this.node).select('.innerG'); // select the inner g container where elements will be

          s.append('g')
            .attr('class', 'xAxis') // set the class for the x axis
            .attr('transform', `translate(0, ${height})`)
            .call(axisBottom(xScale)); // add the axis

          s.append('g')
            .attr('class', 'yAxis') // set the class for the y axis
            .call(axisLeft(yScale)); // set the axis

          this.makeLinesFromDataProps(xScale, yScale);
        }
      }, 1000);

    public makeLinesFromDataProps = (xScale, yScale) => {
      const { data } = this.props;

      const chartLine = line() // make the line generator function
        .x((_, i) => xScale(i))
        .y(d => yScale(d[1]))
        .curve(curveMonotoneX);

      const s = select(this.node).select('.innerG');

      Object.keys(data).forEach(k => {
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
          .attr('cy', d => yScale(d[1]))
          .attr('r', 3);
      });

      s.selectAll('.dot').style('stroke-width', 3);
    };

    public render() {
      const { classes, data, width } = this.props;

      return (
        <div className={classes.svgContainer}>
          <svg ref={n => (this.node = n)} width={width} className={classes.svg}>
            <g className="innerG" transform={`translate(${margin}, ${margin})`}>
              {/* lines are blaced before (under) dots */}
              {Object.keys(data).map(k => (
                <Tooltip key={k} title={k}>
                  <path className={c('line', `line-${k}`)} />
                </Tooltip>
              ))}
              {Object.keys(data).map(k =>
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
    }
  }
);
