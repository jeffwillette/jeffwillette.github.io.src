import React from 'react';

interface Props {
  htmlAttributes: Pick<JSX.IntrinsicElements, 'html'>;
  bodyAttributes: Pick<JSX.IntrinsicElements, 'body'>;
  preBodyComponents: JSX.Element[];
  headComponents: JSX.Element[];
  body: string;
  postBodyComponents: JSX.Element[];
}

export default (props: Props) => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
      {props.postBodyComponents}
    </body>
  </html>
);
