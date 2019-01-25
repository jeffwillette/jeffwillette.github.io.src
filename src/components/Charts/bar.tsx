import { BaseType, max, scaleLinear, select } from 'd3';
import React from 'react';

interface Props {
  data: number[];
  size: [number, number];
}

export class BarChart extends React.Component<Props, {}> {
  public node: BaseType | null = null;
  public componentDidMount() {
    this.createBarChart();
  }

  public componentDidUpdate() {
    this.createBarChart();
  }

  public createBarChart = () => {
    const node = this.node;
    const dataMax = max(this.props.data);
    const yScale = scaleLinear()
      .domain([0, dataMax || 0])
      .range([0, this.props.size[1]]);

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (_, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25);
  }

  public render() {
    return <svg ref={node => (this.node = node)} width={500} height={500} />;
  }
}
