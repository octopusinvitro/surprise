class ImageParser {
  static isOfType(embed) {
    return embed.$type == 'app.bsky.embed.images#view';
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return this._embed.images.map(image => {
      return this._getImage(image);
    });
  }

  _getImage(image) {
    return {
      type: 'image',
      src: image.thumb,
      width: image.aspectRatio.width,
      height: image.aspectRatio.height,
      alt: image.alt
    }
  }
}

class VideoParser {
  static isOfType(embed) {
    return embed.$type == 'app.bsky.embed.video#view';
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return [this._getVideo()];
  }

  _getVideo() {
    return {
      type: 'video',
      src: this._embed.playlist,
      width: this._embed.aspectRatio.width,
      height: this._embed.aspectRatio.height
    }
  }
}

class GIFParser {
  static isOfType(embed) {
    return embed.external?.uri.includes('tenor.com');
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return [this._getGIF()];
  }

  _getGIF() {
    return {
      type: 'gif',
      src: this._embed.external?.uri,
      alt: this._embed.external?.description || this._embed.external?.title
    }
  }
}

class VimeoParser {
  static isOfType(embed) {
    return embed.external?.uri.includes('vimeo.com');
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return [this._getVimeo()];
  }

  _getVimeo() {
    const uriParts = this._embed.external?.uri.split('/');
    return {
      type: 'vimeo',
      title: this._embed.external?.title,
      id: uriParts[uriParts.length - 1]
    };
  }
}

class YoutubeParser {
  static isOfType(embed) {
    return embed.external?.uri.includes('youtube.com') ||
      embed.external?.uri.includes('youtu.be')
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return [this._getYoutube()];
  }

  _getYoutube() {
    return {
      type: 'youtube',
      title: this._embed.external?.title,
      id: this._extractId()
    };
  }

  _extractId() {
    const uri = this._embed.external?.uri;
    return uri.split(/watch\?v=|&/)[1] || uri.split(/youtu\.be\/|\?/)[1];
  }
}

class RecordParser {
  static isOfType(embed) {
    return embed.$type == 'app.bsky.embed.record#view';
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return [this._getRecord()];
  }

  _getRecord() {
    const url = this._extractURL()
    return {
      type: 'record',
      text: url,
      url: url
    };
  }

  _extractURL() {
    const handle = this._embed.record.author.handle;
    const uriParts = this._embed.record.uri.split('/');
    const postId = uriParts[uriParts.length - 1]
    return `https://bsky.app/profile/${handle}/post/${postId}`;
  }
}

class LinkParser {
  static isOfType(embed) {
    return embed.$type == 'app.bsky.embed.external#view';
  }

  constructor(embed) {
    this._embed = embed;
  }

  parse() {
    return [this._getLink()];
  }

  _getLink() {
    return {
      type: 'link',
      text: this._embed.external?.title,
      url: this._embed.external?.uri
    };
  }
}

class NullParser {
  parse() {
    return []
  }
}

class Media {
  static MEDIA_PARSERS = [
    ImageParser,
    VideoParser,
    GIFParser,
    VimeoParser,
    YoutubeParser,
    RecordParser,
    LinkParser
  ];

  constructor(embed) {
    this._embed = embed;
  }

  embeds() {
    const selectedParser = this._parserSelector();
    const parser = new selectedParser(this._embed);
    return parser.parse();
  }

  _parserSelector() {
    for (const parser of this.constructor.MEDIA_PARSERS) {
      if (parser.isOfType(this._embed)) {
        return parser;
      }
    }

    return NullParser;
  }
}
