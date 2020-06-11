import c from 'classnames';
import { hierarchy, select, tree } from 'd3';
import React, { useEffect, useRef } from 'react';
import { withDrawerOpen } from '../../utils';
import { useStyles } from './styles';
import { clearChart, margin, randomColor } from './utils';

const createTreeChart = (node: SVGSVGElement, data: TreeData) =>
  setTimeout(() => {
    if (node) {
      const width = parseInt(select(node).style('width'), 10) - margin * 2;
      const height = parseInt(select(node).style('height'), 10) - margin * 2;

      const root = hierarchy(data);
      const treeChart = tree().size([width, height]);
      const nodes = treeChart(root);

      const color = randomColor();

      const s = select(node).select('.innerG');

      s.selectAll('.treeLink').remove();
      s.selectAll('.treeNode').remove();

      s.selectAll('.treeLink')
        .data(nodes.links())
        .enter()
        .append('line')
        .attr('class', 'treeLink')
        .style('stroke', color('0.3'))
        .style('stroke-width', 3)
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .transition()
        .duration(1000);

      s.selectAll('.treeNode')
        .data(nodes.descendants())
        .enter()
        .append('circle')
        .attr('class', 'treeNode')
        .style('fill', 'rgba(255,255,255)')
        .style('stroke', color('0.5'))
        .style('stroke-width', 3)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 8)
        .transition()
        .duration(1000);
    }
  }, 1000);

interface TreeData {
  name: string;
  value: string | number;
  children?: TreeData[];
}

interface Props {
  data: TreeData;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

const tChart = ({ data, width, align }: Props) => {
  const classes = useStyles();

  const node = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (node.current) {
      clearChart(node.current);
      createTreeChart(node.current, data);
    }
  });

  return (
    <div
      className={c(classes.svgContainer, {
        [classes.left]: align === 'left',
        [classes.right]: align === 'right',
        [classes.center]: align === 'center'
      })}
      style={{ width }}
    >
      <svg ref={node} width="100%" className={classes.svg}>
        <g className="innerG" transform={`translate(${margin}, ${margin})`} />
      </svg>
    </div>
  );
};

tChart.defaultProps = {
  width: '100%'
};

// this is needed so that a re-render is triggered when the drawer state changes
export const TreeChart = withDrawerOpen(tChart);
