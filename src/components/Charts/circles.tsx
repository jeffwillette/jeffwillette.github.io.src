import { forceCollide, forceManyBody, forceSimulation, select, Simulation, SimulationNodeDatum } from 'd3';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { withDrawerOpen } from '../../utils';
import { useStyles } from './styles';
import { GeneratedColor, getWidthAndHeight, margin, randomColor } from './utils';

interface Props {
  width?: number;
}

type SetPlanets = Dispatch<SetStateAction<Planet[]>>;
type SetSimulation = Dispatch<SetStateAction<Simulation<Planet, undefined>>>;

interface Planet extends SimulationNodeDatum {
  r: number;
  color: GeneratedColor;
}

const makePlanet = (width: number, height: number): Planet => ({
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
  r: Math.floor(Math.random() * 20),
  color: randomColor()
});

const tick = (node: SVGSVGElement | null, simulation: Simulation<Planet, undefined>, planets: Planet[]) => {
  if (node && simulation) {
    const s = select(node)
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

const timer = (
  node: SVGSVGElement | null,
  timerSt: number,
  planets: Planet[],
  setPlanets: SetPlanets,
  setSimulation: SetSimulation
) => {
  if (planets.length === 75) {
    clearInterval(timerSt);
  }

  let newPlanets: Planet[];

  setPlanets(prevPlanets => {
    if (node) {
      const [width, height] = getWidthAndHeight(node, margin);
      newPlanets = [...prevPlanets, makePlanet(width, height)];
      return newPlanets;
    }
    return prevPlanets;
  });

  if (setSimulation) {
    setSimulation(prevSim => (prevSim ? prevSim.nodes(newPlanets) : prevSim));
  }
};

const circles = (_: Props) => {
  const classes = useStyles();
  const node = useRef<SVGSVGElement | null>(null);

  const [planets, setPlanets] = useState<Planet[]>([]);
  const [simulation, setSimulation] = useState<Simulation<Planet, undefined>>(
    forceSimulation<Planet>(planets)
      .force('charge', forceManyBody<Planet>().strength(d => d.r / 10))
      .alphaDecay(0)
      .force('collide', forceCollide<Planet>().radius(d => d.r))
      .on('tick', () => tick(node.current, simulation, planets))
  );

  const [timerState, setTimerState] = useState<number>(0);
  if (!timerState && typeof window !== 'undefined') {
    setTimerState(window.setInterval(() => timer(node.current, timerState, planets, setPlanets, setSimulation), 1000));
  }

  return (
    <div className={classes.svgContainer}>
      <svg ref={node} width="100%" className={classes.svg}>
        <g className="innerG" transform={`translate(${margin}, ${margin})`} />
      </svg>
    </div>
  );
};

circles.defaultProps = {
  width: 100
};

export const Circles = withDrawerOpen(circles);
