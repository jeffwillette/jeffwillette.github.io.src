import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
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

const code = ({ className, classes, children }: Props) => {
  const lang = className ? className.replace('language-', '') : 'text';
  return (
    <SyntaxHighlighter showLineNumbers className={classes.code} language={lang} style={obsidian} children={children} />
  );
};

export const Code = withStyles(styles)(code);
