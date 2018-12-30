import React from 'react';

interface Props {
  htmlAttributes: Pick<JSX.IntrinsicElements, 'html'>;
  bodyAttributes: Pick<JSX.IntrinsicElements, 'body'>;
  preBodyComponents: JSX.Element[];
  headComponents: JSX.Element[];
  body: string;
  postBodyComponents: JSX.Element[];
}

export default class HTML extends React.Component<Props, {}> {
  public render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
