class UI {
  constructor(commentsId) {
    this._commentsId = commentsId
    this._comments = document.getElementById(commentsId);
  }

  displayComments(replies) {
    const fragment = new DocumentFragment();
    const types = this._appendComments(fragment, replies);
    this._appendScript(fragment, types);

    this._comments.innerHTML = '';
    this._comments.append(fragment);
  }

  displayError(trace) {
    this._comments.innerHTML = '';
    this._comments.append(this._commentError(trace));
  }

  displayEmpty() {
    this._comments.innerHTML = '';
    this._comments.append(this._commentEmpty());
  }

  _appendComments(fragment, replies) {
    const types = new Set();

    for (const reply of replies) {
      const comment = new Comment(reply)
      const formatter = new DateFormatter(comment.datetime);
      const dom = new CommentDOM(comment, formatter);
      fragment.append(dom.anchor(), dom.article());

      this._collectMediaTypes(comment, types);
    }

    return types;
  }

  _appendScript(fragment, types) {
    if (types.has('video')) {
      fragment.append(this._mediaScriptTag());
    }
  }

  _collectMediaTypes(comment, types) {
    for (const embed of comment.embeds) {
      types.add(embed.type)
    }

    for (const reply of comment.replies) {
      this._collectMediaTypes(reply, types)
    }
  }

  _mediaScriptTag() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/hls.js@latest');
    script.addEventListener('load', this._appendHLS, false);
    return script;
  }

  _appendHLS() {
    const videos = document.querySelectorAll(`#${this._commentsId} video.embed`);

    for (const video of videos) {
      const hls = new Hls();
      hls.loadSource(video.querySelector('source').getAttribute('src'));
      hls.attachMedia(video);
    }
  }

  _commentError(trace) {
    const error = document.createElement('p');
    error.setAttribute('class', 'error')
    error.textContent = 'Error loading comments. ' + trace;
    return error;
  }

  _commentEmpty() {
    const noComments = document.createElement('p');
    noComments.setAttribute('class', 'no-comments')
    noComments.textContent = 'No comments yet. Be the first to comment!';
    return noComments;
  }
}
