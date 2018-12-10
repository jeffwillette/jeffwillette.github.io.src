import React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/styles/hljs';

const styles = (theme: Theme) =>
  createStyles({
    code: {
      fontSize: theme.typography.fontSize,
      borderRadius: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px !important`,
      border: `3px solid rgba(255,255,255,0.50)`
    }
  });

interface Props extends WithStyles<typeof styles> {
  className: string; // className in this case is the markdown language after the backticks
  children: string | JSX.Element;
}

const Code = ({ className, classes, children }: Props) => {
  // the className comes in like language-javascript so I have to strip out the prefix
  return (
    <SyntaxHighlighter
      showLineNumbers
      className={classes.code}
      language={className}
      style={obsidian}
      children={children}
    />
  );
};

export default withStyles(styles)(Code);
