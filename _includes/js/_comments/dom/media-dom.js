class MediaDOM {
  embed(embed) {
    const MEDIA_TYPES = {
      image: this._image,
      gif: this._gif,
      video: this._video,
      vimeo: this._vimeo,
      youtube: this._youtube,
      record: this._record,
      link: this._link
    }

    if (!MEDIA_TYPES.hasOwnProperty(embed.type)) {
      return '';
    }

    return MEDIA_TYPES[embed.type](embed);
  }

  _image(embed) {
    const img = document.createElement('img');
    img.setAttribute('src', embed.src);
    img.setAttribute('width', embed.width);
    img.setAttribute('height', embed.height);
    img.setAttribute('alt', embed.alt);

    const link = document.createElement('a');
    link.setAttribute('href', embed.src);
    link.setAttribute('class', 'embed');
    link.append(img);
    return link;
  }

  _gif(embed) {
    const img = document.createElement('img');
    img.setAttribute('src', embed.src);
    img.setAttribute('alt', embed.alt);
    img.setAttribute('class', 'embed');

    const link = document.createElement('a');
    link.setAttribute('href', embed.src);
    link.setAttribute('class', 'embed');
    link.append(img);
    return link;
  }

  _video(embed) {
    const source = document.createElement('source');
    source.setAttribute('src', embed.src);
    source.setAttribute('type', 'application/x-mpegURL'); // .m3u8

    const video = document.createElement('video');
    video.setAttribute('width', embed.width);
    video.setAttribute('height', embed.height);
    video.setAttribute('controls', true);
    video.setAttribute('class', 'embed');
    video.append(source)

    return video;
  }

  _vimeo(embed) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://player.vimeo.com/video/${embed.id}?app_id=122963`);
    iframe.setAttribute('title', embed.title);
    iframe.setAttribute('class', 'embed');
    iframe.setAttribute('allow', 'fullscreen; clipboard-write');
    return iframe
  }

  _youtube(embed) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${embed.id}?si=2uFPiect0QEdAUvU`);
    iframe.setAttribute('title', embed.title);
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('class', 'embed');
    return iframe;
  }

  _record(embed) {
    const link = document.createElement('a');
    link.setAttribute('href', embed.url);
    link.setAttribute('class', 'embed-link');
    link.textContent = embed.text;
    return link;
  }

  _link(embed) {
    const link = document.createElement('a');
    link.setAttribute('href', embed.url);
    link.setAttribute('class', 'embed-link');
    link.textContent = embed.text;
    return link;
  }
}
