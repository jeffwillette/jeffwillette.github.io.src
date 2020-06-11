import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const useStyles = makeStyles((theme: Theme) => ({
  code: {
    fontSize: theme.typography.fontSize,
    borderRadius: theme.spacing(1),
    padding: `${theme.spacing(2)}px !important`,
    border: `3px solid rgba(255,255,255,0.50)`
  }
}));

export interface CodeProps {
  className: string; // className in this case is the markdown language after the backticks
  children: string | JSX.Element;
}

export const Code = ({ className, children }: CodeProps) => {
  const lang = className ? className.replace('language-', '') : 'text';
  const classes = useStyles();
  return (
    <SyntaxHighlighter showLineNumbers className={classes.code} language={lang} style={atomDark} children={children} />
  );
};
