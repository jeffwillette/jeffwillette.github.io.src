import { Tooltip } from '@material-ui/core';
import { axisBottom, axisLeft, BaseType, curveMonotoneX, line, max, min, scaleLinear, select } from 'd3';
import React from 'react';

interface Props {
  data: number[];
}

interface State {
  width: number;
  height: number;
  node: BaseType & SVGSVGElement | null;
}

const margin = 50;
type GeneratedColor = (opacity: string) => string;

export class LineChart extends React.Component<Props, {}> {
  // height and width need to be a part of state so that a re-render will happen if they are changed
  public state = {
    width: 768 - margin * 2,
    height: 768 / 1.618 - margin * 2,
    node: null
  };

  public componentDidMount() {
    this.createBarChart();
  }

  public componentDidUpdate() {
    this.createBarChart();
  }

  public randomRGBAValue = () => Math.floor(Math.random() * 255);
  public randomColor = (): GeneratedColor => {
    const r = this.randomRGBAValue();
    const g = this.randomRGBAValue();
    const b = this.randomRGBAValue();

    return (opacity: string) => `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  public createBarChart = () => {
    const { data } = this.props;
    const { width, height, node } = this.state;

    const dataMax = max(data); // get the max of the data to know how high we need to scale

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, dataMax || 0])
      .range([height, 0]);

    const chartLine = line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d[0]))
      .curve(curveMonotoneX);

    const s = select(node) // select the ref to operate on it with the d3 API
      .append('g') // append a <g> container
      .attr('transform', `translate(${margin}, ${margin})`); // add back in the margins

    s.append('g')
      .attr('class', 'x axis') // set the class for the x axis
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale)); // add the axis

    s.append('g')
      .attr('class', 'y axis') // set the class for the y axis
      .style('stroke-width', 1.5)
      .style('stroke', 'rgba(0,0,0,.5)')
      .call(axisLeft(yScale)); // set the axis

    // the incoming data is an array of numbers, and mapping through it gives the [value, index] which is y and x
    const dataset = data.map((y, x) => [y, x] as [number, number]);
    const color = this.randomColor();

    s.append('path')
      .datum(dataset)
      .attr('class', 'line')
      .style('stroke', color('.2'))
      .style('fill', 'none')
      .style('stroke-width', 3)
      .attr('d', chartLine);

    select(node)
      .selectAll('.dot')
      .data(dataset)
      .style('stroke', color('.5'))
      .style('fill', color('.5'))
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', d => yScale(d[0]))
      .attr('r', 4);
  }

  public refCb = node => {
    // this check for the window is for the build step of gatsbyjs which doesn't have the window defined. It's set to
    // be a rectangle based on teh width of the container div
    if (typeof window !== 'undefined') {
      const width = node.parentElement.clientWidth - margin * 2;
      this.setState({
        node,
        width,
        height: width / 1.618 - margin * 2
      });
    }
  }

  public render() {
    const { data } = this.props;
    const { width, height } = this.state;

    return (
      <svg ref={this.refCb} width={width + 2 * margin} height={height + 2 * margin}>
        <g transform={`translate(${margin}, ${margin})`}>
          {data.map((d, i) => (
            <Tooltip key={i} title={`datum value: ${d} index: ${i}`}>
              <circle className="dot" />
            </Tooltip>
          ))}
        </g>
      </svg>
    );
  }
}
