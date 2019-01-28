import { forceCollide, forceManyBody, forceSimulation, select, Simulation, SimulationNodeDatum } from 'd3';
import React from 'react';
import { GeneratedColor, margin, randomColor } from './utils';

interface Props {
  width?: number;
}

interface Planet extends SimulationNodeDatum {
  r: number;
  color: GeneratedColor;
}

interface State {
  height: number;
  width: number;
  planets: Planet[];
  simulation: Simulation<Planet, undefined>;
}

const w = 768 - margin * 2;
const h = 768 / 1.618 - margin * 2;

const makePlanet = (width: number, height: number): Planet => ({
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
  r: Math.floor(Math.random() * 20),
  color: randomColor()
});

export class Circles extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    width: 100
  };

  public node: SVGSVGElement | null = null;

  constructor(props) {
    super(props);
    const planets = [makePlanet(w, h)];

    this.state = {
      width: w,
      height: h,
      planets,
      simulation: forceSimulation<Planet>(planets)
        .force('charge', forceManyBody().strength(d => d.r / 10))
        .alphaDecay(0)
        .force('collide', forceCollide().radius(d => d.r))
        .on('tick', this.tick)
    };

    setInterval(() => {
      this.setState(prev => {
        const newPlanets = [...prev.planets, makePlanet(prev.width, prev.height)];

        return {
          planets: newPlanets,
          simulation: prev.simulation.nodes(newPlanets)
        };
      });
    }, 1000);
  }

  public tick = () => {
    const { width, planets, height, simulation } = this.state;

    if (this.node && simulation) {
      this.node.style.width = `${width + margin * 2}`;
      this.node.style.height = `${height + margin * 2}`;

      const s = select(this.node)
        .select('.innerG')
        .selectAll('circle')
        .data(planets);

      s.enter()
        .append('circle')
        .attr('r', d => d.r)
        .style('fill', d => d.color('0.3'))
        .merge(s)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('stroke', d => d.color('0.5'));

      s.exit().remove();
    }
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
    return (
      <svg ref={this.refCb}>
        <g className="innerG" transform={`translate(${margin}, ${margin})`} />
      </svg>
    );
  }
}
