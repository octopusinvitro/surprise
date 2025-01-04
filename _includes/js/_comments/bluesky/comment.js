class Comment {
  static PROFILE_URL = 'https://bsky.app/profile/';
  static DEFAULT_AVATAR = '/img/default-comment-avatar.svg';

  static sortByDate(comments) {
    return comments.toSorted((previous, current) => {
      return new Date(current.post.indexedAt) - new Date(previous.post.indexedAt)
    });
  }

  constructor(reply) {
    this._reply = reply
    this._author = reply.post.author;
  }

  get datetime() {
    return this._reply.post.indexedAt;
  }

  get userURL() {
    return `${this.constructor.PROFILE_URL}${this._author.did}`
  }

  get src() {
    return this._author.avatar || this.constructor.DEFAULT_AVATAR;
  }

  get username() {
    return this._author.displayName || this._author.handle;
  }

  get text() {
    return this._reply.post.record.text;
  }

  get embeds() {
    if (!this._reply.post.hasOwnProperty('embed')) {
      return []
    }
    return (new Media(this._reply.post.embed)).embeds();
  }

  get replyCount() {
    return this._reply.post.replyCount || 0;
  }

  get repostCount() {
    return this._reply.post.repostCount || 0;
  }

  get likeCount() {
    return this._reply.post.likeCount || 0;
  }

  get postURL() {
    const parts = this._reply.post.uri.split('/')
    const postId = parts[parts.length - 1]
    return `${this.constructor.PROFILE_URL}${this._author.did}/post/${postId}`
  }

  get replies() {
    return this.constructor.sortByDate(this._reply.replies).map(reply => {
      return new this.constructor(reply);
    });
  }
}
