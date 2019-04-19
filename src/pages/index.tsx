import { makeStyles, Theme } from '@material-ui/core';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { FlatButton } from '../components/button';
import { BarChart } from '../components/Charts/bar';
import { Circles } from '../components/Charts/circles';
import { Graph } from '../components/Charts/graph';
import { LineChart } from '../components/Charts/line';
import { TreeChart } from '../components/Charts/tree';
import { GlobalLayout } from '../components/Layout/global';
import { M } from '../components/math';
import { IndexQuery } from '../gatsby-queries';
import { safe } from '../utils';

const useStyles = makeStyles((_: Theme) => ({
  button: {
    margin: 'auto'
  }
}));

interface Props {
  data: IndexQuery;
}

const randomNum = () => Math.floor(Math.random() * 100);

const getBarData = () => ({
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

const getLineData = () => ({
  one: Array.from({ length: 20 }).map(_ => randomNum()),
  two: Array.from({ length: 20 }).map(_ => randomNum()),
  three: Array.from({ length: 20 }).map(_ => randomNum())
});

export default ({ data }: Props) => {
  const [barData, setBarData] = useState(getBarData());
  const [lineData, setLineData] = useState(getLineData());

  const { site } = safe(data);
  const { siteMetadata } = safe(site);
  const { title, description, author, keywords } = safe(siteMetadata);
  const classes = useStyles();

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
        <BarChart data={barData} />
        <FlatButton
          fullWidth
          className={classes.button}
          onClick={() => setBarData(getBarData())}
          children="randomize"
        />
        <LineChart data={lineData} />
        <FlatButton
          fullWidth
          color="inherit"
          className={classes.button}
          onClick={() => setLineData(getLineData())}
          children="randomize"
        />
        <Graph
          xMin={-10}
          xMax={10}
          xLabel={<M i="\check{y}_1" />}
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
};

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
