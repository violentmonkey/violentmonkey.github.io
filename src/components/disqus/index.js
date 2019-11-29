import React, { Component } from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import { StaticQuery, graphql } from 'gatsby';

class Disqus extends Component {
  constructor(props) {
    super(props);
    this.state = { toasts: [] };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }

  onSnackbarDismiss() {
    const { toasts } = this.state;
    this.setState({ toasts: toasts.slice(1) });
  }

  notifyAboutComment() {
    const { toasts } = this.state;
    this.setState({
      toasts: [...toasts, { text: 'New comment available!!' }],
    });
  }

  render() {
    const {
      postNode,
      data: {
        site: { siteMetadata },
      },
    } = this.props;
    if (!siteMetadata.disqusShortname) {
      return null;
    }
    const post = postNode.frontmatter;
    const url = siteMetadata.siteUrl + postNode.fields.slug;
    return (
      <ReactDisqusComments
        shortname={siteMetadata.disqusShortname}
        identifier={post.title}
        title={post.title}
        url={url}
        onNewComment={this.notifyAboutComment}
      />
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            disqusShortname
            siteUrl
          }
        }
      }
    `}
    render={data => (
      <Disqus {...props} data={data} />
    )}
  />
);
