import { withStyles, WithStyles } from '@material-ui/core';
import { forceCollide, forceManyBody, forceSimulation, select, Simulation, SimulationNodeDatum } from 'd3';
import React from 'react';
import { compose } from 'recompose';
import { withDrawerOpen } from '../../utils';
import { styles } from './styles';
import { GeneratedColor, getWidthAndHeight, margin, randomColor } from './utils';

interface Props {
  width?: number;
}

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

interface Planet extends SimulationNodeDatum {
  r: number;
  color: GeneratedColor;
}

interface State {
  planets: Planet[];
  simulation: Simulation<Planet, undefined>;
  timer: NodeJS.Timeout;
}

const makePlanet = (width: number, height: number): Planet => ({
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
  r: Math.floor(Math.random() * 20),
  color: randomColor()
});

export const Circles = compose<ExtendedProps, Props>(
  withStyles(styles),
  withDrawerOpen
)(
  class extends React.Component<ExtendedProps, State> {
    public static defaultProps: Partial<Props> = {
      width: 100
    };

    public node: SVGSVGElement | null = null;

    constructor(props) {
      super(props);
      const planets = [] as Planet[];

      this.state = {
        planets,
        simulation: forceSimulation<Planet>(planets)
          .force('charge', forceManyBody().strength(d => d.r / 10))
          .alphaDecay(0)
          .force('collide', forceCollide().radius(d => d.r))
          .on('tick', this.tick),
        timer: setInterval(this.timer, 1000)
      };
    }

    public timer = () => {
      if (this.state.planets.length === 75) {
        clearInterval(this.state.timer);
        console.log('cleared');
      }

      this.setState(prev => {
        const [width, height] = getWidthAndHeight(this.node, margin);
        const newPlanets = [...prev.planets, makePlanet(width, height)];

        return {
          planets: newPlanets,
          simulation: prev.simulation.nodes(newPlanets)
        };
      });
    };

    public tick = () => {
      const { planets, simulation } = this.state;

      if (this.node && simulation) {
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

    public render() {
      const { classes } = this.props;
      return (
        <div className={classes.svgContainer}>
          <svg ref={n => (this.node = n)} width="100%" className={classes.svg}>
            <g className="innerG" transform={`translate(${margin}, ${margin})`} />
          </svg>
        </div>
      );
    }
  }
);
