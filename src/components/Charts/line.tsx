import { Tooltip, WithStyles, withStyles } from '@material-ui/core';
import c from 'classnames';
import { axisBottom, axisLeft, curveMonotoneX, line, max, scaleLinear, select } from 'd3';
import React from 'react';
import { styles } from './styles';
import { clearChart, margin, randomColor } from './utils';

interface Props {
  data: { [k: string]: number[] };
  width?: number; // should match a percentage
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

interface State {
  width: number;
  height: number;
}

export const LineChart = withStyles(styles)(
  class extends React.Component<ExtendedProps, State> {
    public static defaultProps: Partial<Props> = {
      width: 100
    };

    public node: SVGSVGElement | null = null;

    // height and width need to be a part of state so that a re-render will happen if they are changed
    public state = {
      width: 768 - margin * 2,
      height: 768 / 1.618 - margin * 2
    };

    public componentDidMount() {
      clearChart(this.node);
      this.createLineChart();
    }

    public componentDidUpdate() {
      clearChart(this.node);
      this.createLineChart();
    }

    public createLineChart = () => {
      const { data } = this.props;
      const { width, height } = this.state;

      if (this.node) {
        this.node.style.width = `${width + margin * 2}`;
        this.node.style.height = `${height + margin * 2}`;

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
    };

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

    // check for the window is for the build step of gatsbyjs which doesn't have the window defined. It's set to
    // be a rectangle based on teh width of the container div
    public refCb = node => {
      if (node) {
        this.node = node;
        const baseWidth = node.parentElement.clientWidth * (this.props.width! / 100);
        const width = baseWidth - margin * 2;
        const height = baseWidth / 2 - margin * 2;
        this.setState({ width, height });
      }
    };

    public render() {
      const { classes, data } = this.props;

      return (
        <svg ref={this.refCb} className={classes.svg}>
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
      );
    }
  }
);
