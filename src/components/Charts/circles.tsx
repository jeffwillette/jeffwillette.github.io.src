import { forceCollide, forceManyBody, forceSimulation, select, SimulationNodeDatum } from 'd3';
import React from 'react';
import { GeneratedColor, margin, randomColor } from './utils';

interface Props {
  width: number;
}

interface Planet extends SimulationNodeDatum {
  cx: number;
  cy: number;
  r: number;
  color: GeneratedColor;
}

interface State {
  height: number;
  width: number;
  objects: Planet[];
}

export class Circles extends React.Component<Props, State> {
  public node: SVGSVGElement | null = null;

  constructor(props) {
    super(props);

    const width = 768 - margin * 2;
    const height = 768 / 1.618 - margin * 2;

    this.state = {
      width,
      height,
      objects: Array.from({ length: 20 }).map(_ => ({
        cx: Math.floor(Math.random() * width),
        cy: Math.floor(Math.random() * height),
        r: Math.floor(Math.random() * 10),
        color: randomColor()
      }))
    };
  }

  public componentDidMount() {
    this.update();
  }

  public componentDidUpdate() {
    this.update();
  }

  public update = () => {
    const { objects } = this.state;
    forceSimulation<Planet>(objects)
      .force('charge', forceManyBody().strength(10))
      .force('collide', forceCollide().radius(2))
      .on('tick', this.tick);
  }

  public tick = () => {
    const { width, height, objects } = this.state;

    if (this.node) {
      this.node.style.width = `${width + margin * 2}`;
      this.node.style.height = `${height + margin * 2}`;

      const s = select(this.node)
        .select('.innerG')
        .selectAll('circle')
        .data(objects);

      s.enter()
        .merge(s)
        .append('circle')
        .attr('cx', d => d.cx)
        .attr('cy', d => d.cy)
        .attr('r', d => d.r)
        .style('stroke', d => d.color('0.5'))
        .style('fill', d => d.color('0.3'));

      s.exit().remove();
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
    return (
      <svg ref={this.refCb}>
        <g className="innerG" transform={`translate(${margin}, ${margin})`} />
        ;;
      </svg>
    );
  }
}
