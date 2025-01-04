class Client {
  constructor(ui) {
    this._ui = ui;
  }

  getReplies(username, postId) {
    fetch(
      this._endpoint(username, postId),
      { method: 'GET', headers: { 'Accept': 'application/json' } }
    )
      .then(this._processResponse)
      .then(this._processData).catch(error => {
        this._ui.displayError(error.message)
      });
  }

  _endpoint(username, postId) {
    const uri = `at://${username}/app.bsky.feed.post/${postId}`
    const encoded = encodeURIComponent(uri)
    return `https://api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encoded}&depth=1000&parentHeight=1000`;
  }

  _processResponse(response) {
    if (!response.ok) {
      throw new APIError(response.status, postId);
    }

    return response.json();
  }

  _processData = (data) => {
    const replies = data.thread.replies;
    if (replies.length === 0) {
      return this._ui.displayEmpty()
    }

    this._ui.displayComments(Comment.sortByDate(replies));
  }
}



class APIError extends Error {
  constructor(status, postId) {
    const message = `Failed to fetch comments from post ${postId} with ${status} status`;
    super(message, status);
  }
}
