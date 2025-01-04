---
title: Bluesky JSON of different media types
date: 2025-01-05
tags:
  - bluesky
  - media
summary: Document the different JSON formats coming in the BS API
hascode: true
draft: true
---

# Youtube

```json
"embed": {
  "$type": "app.bsky.embed.external#view",
    "external": {
      "uri": "https://www.youtube.com/watch?v=N5FNZoT-DMc",
      "title": "Los Punsetes - Opinión de mierda",
      "description": "YouTube video by CANADA Editorial",
      "thumb": "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k2kgikmkv3hrouhebbzlfrlb/bafkreigjhw2etgwibxnqs2zaahtiskezoag5l37nk5ajvlre63i444hdkm@jpeg"
    }
  }
}
```

# Link

```json
"embed": {
  "$type": "app.bsky.embed.external",
  "external": {
    "description": "",
    "title": "CSS Text Module Level 3",
    "uri": "https://drafts.csswg.org/css-text/#letter-spacing-property"
  }
}
```

# Images from `post.record.embed`

```json
{
  "$type": "app.bsky.embed.images",
  "images": [
    {
      "alt": "",
      "aspectRatio": { "height": 1505, "width": 2000 },
      "image": {
        "$type": "blob",
        "ref": { "$link": "bafkreidpcyhol4vlq2kaclvticsrwuz7cyckefirqoch5onx2ebufp3bre" },
        "mimeType": "image/jpeg",
        "size": 680176
      }
    }
  ]
}
```

# Images from `post.embed`

```json
{
  "$type": "app.bsky.embed.images#view",
  "images": [
    {
      "thumb": "https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:gup7ro7z465rslau4rbi3mjz/bafkreidpcyhol4vlq2kaclvticsrwuz7cyckefirqoch5onx2ebufp3bre@jpeg",
      "fullsize": "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:gup7ro7z465rslau4rbi3mjz/bafkreidpcyhol4vlq2kaclvticsrwuz7cyckefirqoch5onx2ebufp3bre@jpeg",
      "alt": "",
      "aspectRatio": { "height": 1505, "width": 2000 }
    }
  ]
}
```

# Vimeo from `post.record.embed`

```json
"embed": {
  "$type": "app.bsky.embed.external",
  "external": {
    "description": "WRITTEN & DIRECTED BY  Joseph Bennett Charles Huettner  EXECUTIVE PRODUCERS Matt Harrigan Dave Newberg  ANIMATION Joseph Bennett Charles Huettner Caleb…",
    "thumb": {
      "$type": "blob",
      "ref": { "$link": "bafkreihiccnsgtgtk43umjq3devknew4jnqpcnmmfhjec2uzetdhtru72q" },
      "mimeType": "image/jpeg",
      "size": 583071
    },
    "title": "Scavengers",
    "uri": "https://vimeo.com/179779722"
  }
}
```
