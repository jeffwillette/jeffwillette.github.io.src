import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { FlatButton } from '../components/button';
import { BarChart } from '../components/Charts/bar';
import { Circles } from '../components/Charts/circles';
import { Graph } from '../components/Charts/graph';
import { LineChart } from '../components/Charts/line';
import { TreeChart } from '../components/Charts/tree';
import { GlobalLayout } from '../components/Layout/global';
import { InlineMath } from '../components/math';
import { IndexQuery } from '../gatsby-queries';
import { safe } from '../utils';

const styles = (_: Theme) =>
  createStyles({
    button: {
      margin: 'auto'
    }
  });

interface Props extends WithStyles<typeof styles> {
  data: IndexQuery;
}

interface State {
  barData: { [k: string]: number };
  lineData: { [k: string]: number[] };
}

const randomNum = () => Math.floor(Math.random() * 100);
const barData = () => ({
  one: randomNum(),
  two: randomNum(),
  three: randomNum(),
  four: randomNum(),
  five: randomNum(),
  six: randomNum(),
  seven: randomNum(),
  eight: randomNum(),
  nine: randomNum(),
  ten: randomNum()
});

const lineData = () => ({
  one: Array.from({ length: 20 }).map(_ => randomNum()),
  two: Array.from({ length: 20 }).map(_ => randomNum()),
  three: Array.from({ length: 20 }).map(_ => randomNum())
});

export const Index = withStyles(styles)(
  class extends React.Component<Props, State> {
    public state = {
      barData: barData(),
      lineData: lineData()
    };

    public render() {
      const { data, classes } = this.props;
      const { site } = safe(data);
      const { siteMetadata } = safe(site);
      const { title, description, author, keywords } = safe(siteMetadata);

      return (
        <GlobalLayout>
          <Helmet
            title={title || undefined}
            meta={[
              { name: 'description', content: description || '' },
              { name: 'keywords', content: keywords || '' },
              { name: 'author', content: author || '' }
            ]}
          />
          <div>
            <Circles />
            <BarChart data={this.state.barData} />
            <FlatButton
              fullWidth
              className={classes.button}
              onClick={() => this.setState({ barData: barData() })}
              children="randomize"
            />
            <LineChart data={this.state.lineData} />
            <FlatButton
              fullWidth
              color="inherit"
              className={classes.button}
              onClick={() => this.setState({ lineData: lineData() })}
              children="randomize"
            />
            <Graph
              xMin={-10}
              xMax={10}
              xLabel={<InlineMath math="\check{y}_1" />}
              width="100%"
              fx={x => 2 * (x * x) + 3 * x + 4}
              points={[[1, 1], [1, 2], [5, 5]]}
            />
            <TreeChart
              data={{
                name: 'winner',
                children: [
                  {
                    name: 'loser-1-1',
                    children: [
                      {
                        name: 'loser2-1',
                        children: [
                          { name: 'loser3-1', children: [{ name: 'loser4-1' }, { name: 'loser4-2' }] },
                          { name: 'loser3-2', children: [{ name: 'loser4-1' }, { name: 'loser4-2' }] }
                        ]
                      },
                      {
                        name: 'loser2-2',
                        children: [
                          { name: 'loser3-1', children: [{ name: 'loser4-1' }, { name: 'loser4-2' }] },
                          { name: 'loser3-2', children: [{ name: 'loser4-1' }, { name: 'loser4-2' }] }
                        ]
                      }
                    ]
                  }
                ]
              }}
            />
          </div>
        </GlobalLayout>
      );
    }
  }
);

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        keywords
        author
      }
    }
  }
`;

export default Index;
