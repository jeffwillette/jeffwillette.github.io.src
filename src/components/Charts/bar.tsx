import { Tooltip } from '@material-ui/core';
import c from 'classnames';
import { scaleLinear, select } from 'd3';
import React from 'react';
import { clearChart, margin, randomColor } from './utils';

interface Props {
  data: { [k: string]: number };
  width: number;
}

interface State {
  height: number;
  width: number;
}

export class BarChart extends React.Component<Props, State> {
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

      const xScale = scaleLinear() // set the x scale and fit to width
        .domain([0, keys.length])
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([0, dataMax || 0])
        .range([0, height]);

      const s = select(this.node).select('.innerG');
      const colors = Array.from({ length: keys.length }).map(() => randomColor());

      const dp = Object.keys(data).map(k => data[k]);
      s.selectAll('.rect')
        .data(dp)
        .style('fill', (_, i) => colors[i]('0.3'))
        .attr('x', (_, i) => xScale(i))
        .attr('y', d => height - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', width / keys.length);
    }
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
    const { data } = this.props;
    return (
      <svg ref={this.refCb}>
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
