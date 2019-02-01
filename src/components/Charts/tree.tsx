import { withStyles, WithStyles } from '@material-ui/core';
import c from 'classnames';
import { hierarchy, select, tree } from 'd3';
import React from 'react';
import { compose } from 'recompose';
import { withDrawerOpen } from '../../utils';
import { styles } from './styles';
import { clearChart, margin, randomColor } from './utils';

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

interface ExtendedProps extends Props, WithStyles<typeof styles> {}

export const TreeChart = compose<ExtendedProps, Props>(
  withStyles(styles),
  withDrawerOpen
)(
  class extends React.Component<ExtendedProps, {}> {
    public static defaultProps: Partial<Props> = {
      width: '100%'
    };

    public node: SVGSVGElement | null = null;

    public componentDidMount() {
      clearChart(this.node);
      this.createTreeChart();
    }

    public componentDidUpdate() {
      this.createTreeChart();
    }

    public createTreeChart = () =>
      setTimeout(() => {
        const { data } = this.props;

        if (this.node) {
          const width = parseInt(select(this.node).style('width'), 10) - margin * 2;
          const height = parseInt(select(this.node).style('height'), 10) - margin * 2;

          const root = hierarchy(data);
          const treeChart = tree().size([width, height]);
          const nodes = treeChart(root);

          const color = randomColor();

          const s = select(this.node).select('.innerG');

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

    public render() {
      const { classes, align, width } = this.props;

      return (
        <div
          className={c(classes.svgContainer, {
            [classes.left]: align === 'left',
            [classes.right]: align === 'right',
            [classes.center]: align === 'center'
          })}
          style={{ width }}
        >
          <svg ref={n => (this.node = n)} width="100%" className={classes.svg}>
            <g className="innerG" transform={`translate(${margin}, ${margin})`} />
          </svg>
        </div>
      );
    }
  }
);
