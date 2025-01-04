(function () {
  {% js %} {% include 'js/_comments/bluesky/comment.js' %} {% endjs %}
  {% js %} {% include 'js/_comments/bluesky/media.js' %} {% endjs %}
  {% js %} {% include 'js/_comments/bluesky/client.js' %} {% endjs %}

  {% js %} {% include 'js/_comments/dom/date-formatter.js' %} {% endjs %}
  {% js %} {% include 'js/_comments/dom/media-dom.js' %} {% endjs %}
  {% js %} {% include 'js/_comments/dom/comment-dom.js' %} {% endjs %}
  {% js %} {% include 'js/_comments/dom/ui.js' %} {% endjs %}

  const username = '{{ handle }}';
  const postId = '{{ hascomments }}';
  const commentsId = '{{ commentsId }}';

  const ui = new UI(commentsId)
  const client = new Client(ui)
  client.getReplies(username, postId);
})();
