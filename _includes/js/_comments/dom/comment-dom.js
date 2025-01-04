class CommentDOM {
  constructor(comment, formatter) {
    this._comment = comment;
    this._formatter = formatter;
  }

  anchor() {
    const anchor = document.createElement('a');
    anchor.setAttribute('id', this._formatter.displayId())
    return anchor;
  }

  article() {
    const article = document.createElement('article');
    article.append(this._header(), this._body(), this._footer(), this._replies())
    return article;
  }

  _header() {
    const link = document.createElement('a');
    link.setAttribute('class', 'comment-header');
    link.setAttribute('href', this._comment.userURL);
    link.append(this._avatar(), this._heading());

    const header = document.createElement('header');
    header.append(link);
    return header;
  }

  _body() {
    const div = document.createElement('div');
    div.setAttribute('class', 'comment-body');

    for (const part of this._comment.text.split('\n')) {
      const subdiv = document.createElement('div');
      subdiv.textContent = part;
      div.append(subdiv);
    }

    const embeds = this._embeds();
    div.append(embeds);
    return div;
  }

  _footer() {
    const footer = document.createElement('footer');
    footer.setAttribute('class', 'comment-footer');
    footer.append(this._time(), this._interactions());
    return footer;
  }

  _replies() {
    const section = document.createElement('section');
    section.setAttribute('class', 'replies');

    for (const comment of this._comment.replies) {
      const formatter = new this._formatter.constructor(comment.datetime);
      const commentDOM = new CommentDOM(comment, formatter)
      section.append(commentDOM.article())
    }

    return section;
  }

  _avatar() {
    const img = document.createElement('img');
    img.setAttribute('src', this._comment.src);
    img.setAttribute('width', 48);
    img.setAttribute('height', 48);
    img.setAttribute('alt', `${this._comment.username}'s avatar`);
    return img;
  }

  _heading() {
    const h4 = document.createElement('h4');
    h4.textContent = this._comment.username;
    return h4;
  }

  _embeds() {
    if (this._comment.embeds.length > 0) {
      const subdiv = document.createElement('div');
      subdiv.setAttribute('class', 'embeds')

      for (const embed of this._comment.embeds) {
        subdiv.append((new MediaDOM()).embed(embed));
      }

      return subdiv;
    }

    return '';
  }

  _time() {
    const datetime = this._formatter.displayDate();

    const time = document.createElement('time');
    time.setAttribute('class', 'post-date');
    time.setAttribute('datetime', datetime);
    time.textContent = datetime;

    const link = document.createElement('a');
    link.setAttribute('href', '#' + this._formatter.displayId());
    link.append(time);
    return link;
  }

  _interactions() {
    const link = document.createElement('a');
    link.setAttribute('href', this._comment.postURL)
    link.textContent = `
      💬 ${this._comment.replyCount}
      🔁 ${this._comment.repostCount}
      ❤️ ${this._comment.likeCount}
    `;
    return link;
  }
}
