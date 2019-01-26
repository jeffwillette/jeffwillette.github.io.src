import { createStyles, Theme, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import { axisBottom, axisLeft, BaseType, curveMonotoneX, line, max, scaleLinear, select } from 'd3';
import React from 'react';

const styles = (_: Theme) =>
  createStyles({
    svg: {
      '& .yAxis path, & .xAxis path': {
        stroke: 'rgba(0,0,0,.2)',
        strokeWidth: 3,
        fill: 'none'
      },
      '& .tick line, & .tick text': {
        stroke: 'rgba(0,0,0,.2)',
        fill: 'rgba(0,0,0,.2)'
      }
    }
  });

interface Props {
  data: { [k: string]: number[] };
  width: number; // should match a percentage
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

interface State {
  width: number;
  height: number;
}

const margin = 50;
type GeneratedColor = (opacity: string) => string;

class lineChart extends React.Component<ExtendedProps, State> {
  public node: SVGSVGElement | null = null;

  // height and width need to be a part of state so that a re-render will happen if they are changed
  public state = {
    width: 768 - margin * 2,
    height: 768 / 1.618 - margin * 2,
    circles: []
  };

  // clear all inner g containers in order to clear the whole chart on update.
  public clearChart = () =>
    this.node &&
    select('#innerG')
      .selectAll('g')
      .remove()

  public componentDidMount() {
    this.clearChart();
    this.createBarChart();
  }

  public componentDidUpdate() {
    this.clearChart();
    this.createBarChart();
  }

  public randomRGBAValue = () => Math.floor(Math.random() * 150);
  public randomColor = (): GeneratedColor => {
    const r = this.randomRGBAValue();
    const g = this.randomRGBAValue();
    const b = this.randomRGBAValue();

    // returns a color generator function to generate different opacities of the same color
    return (opacity: string) => `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  public createBarChart = () => {
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

      const s = select('#innerG'); // select the inner g container where elements will be

      s.append('g')
        .attr('class', 'xAxis') // set the class for the x axis
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale)); // add the axis

      s.append('g')
        .attr('class', 'yAxis') // set the class for the y axis
        .call(axisLeft(yScale)); // set the axis

      this.makeLinesFromDataProps(xScale, yScale);
    }
  }

  public makeLinesFromDataProps = (xScale, yScale) => {
    const { data } = this.props;

    const s = select('#innerG');
    Object.keys(data).forEach(k => {
      const chartLine = line() // make the line generator function
        .x((_, i) => xScale(i))
        .y(d => yScale(d[1]))
        .curve(curveMonotoneX);

      const dataset = data[k].map((y, x) => [x, y] as [number, number]);
      const color = this.randomColor();

      s.select(`.line${k}`)
        .datum(dataset)
        .style('fill', 'none')
        .style('stroke-width', 4)
        .style('stroke', color('.2'))
        .attr('d', chartLine);

      s.selectAll(`.dot${k}`)
        .data(dataset)
        .style('stroke', color('.5'))
        .style('fill', color('.5'))
        .attr('cx', (_, i) => xScale(i))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 5);
    });
  }

  // check for the window is for the build step of gatsbyjs which doesn't have the window defined. It's set to
  // be a rectangle based on teh width of the container div
  public refCb = node => {
    this.node = node;

    const baseWidth = node.parentElement.clientWidth * (this.props.width / 100);
    const width = baseWidth - margin * 2;
    const height = baseWidth / 2 - margin * 2;
    this.setState({ width, height });
  }

  public render() {
    const { classes, data } = this.props;

    return (
      <svg ref={this.refCb} className={classes.svg}>
        <g id="innerG" transform={`translate(${margin}, ${margin})`}>
          {Object.keys(data).map(k =>
            data[k].map((d, i) => (
              <Tooltip key={`${k}${i}`} title={`${k}: ${d}`}>
                <circle className={`dot${k}`} />
              </Tooltip>
            ))
          )}
          {Object.keys(data).map(k => (
            <Tooltip key={k} title={k}>
              <path className={`line${k}`} />
            </Tooltip>
          ))}
        </g>
      </svg>
    );
  }
}

export const LineChart = withStyles(styles)(lineChart);
