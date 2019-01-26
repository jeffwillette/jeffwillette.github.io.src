import { select } from 'd3';

type GeneratedColor = (opacity: string) => string;

export const randomRGBAValue = () => Math.floor(Math.random() * 150);

export const randomColor = (): GeneratedColor => {
  const r = randomRGBAValue();
  const g = randomRGBAValue();
  const b = randomRGBAValue();

  // returns a color generator function to generate different opacities of the same color
  return (opacity: string) => `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// clear all inner g containers in order to clear the whole chart on update.
export const clearChart = (node: SVGSVGElement | null) =>
  node &&
  select('#innerG')
    .selectAll('g')
    .remove();

export const margin = 50;
