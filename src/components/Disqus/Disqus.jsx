import React, { Component } from 'react';
import ReactDisqusComments from 'react-disqus-comments';

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
    const { postNode, siteMetadata } = this.props;
    if (!siteMetadata.disqusShortname) {
      return null;
    }
    const post = postNode.frontmatter;
    const url = siteMetadata.url + postNode.fields.slug;
    return (
      <ReactDisqusComments
        shortname={siteMetadata.disqusShortname}
        identifier={post.title}
        title={post.title}
        url={url}
        category_id={post.category_id}
        onNewComment={this.notifyAboutComment}
      />
    );
  }
}

export default Disqus;
