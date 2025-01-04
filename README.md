# README

This is the personal site of Phil Downer.


## Dependencies

* [@11ty/eleventy](https://www.youtube.com/watch?v=kzf9A9tkkl4), which uses [Liquid](https://shopify.github.io/liquid/) by default for templates

Eleventy requires Node.js v18 minimum.


## Setup

```sh
npm install
```


## To run

```sh
npm run serve:dev
```

and go to <http://localhost:8080/>.


## Development

* If you make updates, the page refreshes automatically.
* If you update eleventy.config.js, restart the server.
* If something gets borked, delete the `_site` folder so it's regenerated.


### Production preview

When your changes are ready to publish, run this to generate the production site:

```sh
npm run serve:prod
```
and make sure everything looks OK. This is what will be served.


### Draft posts

Just add `draft: true` to the frontmatter of the markdown file.


### Project structure

```plaintext
.
├── .github/
│   └── workflows/
│       └── static.yml
├── public/ ...................... # static files, will be copied
├── _site/ ....................... # where the site is generated
├── _includes/ ................... # where Liquid include-files go
│   ├── css
│   │   ├── style.liquid ......... # styles used in all pages
│   │   ├── base.css ............. # basic HTML element styles
│   │   ├── layout.css ........... # page layout
│   │   ├── _post.css ............ # partial css, included where relevant
│   │   ├── prism.css ............ # syntax higlighting for code blocks
│   │   └── prism-overwrites.css . # customization of prism theme
│   ├── icons/
│   ├── js/
│   ├── base.html ..... # base template for all pages
│   ├── _share.html ... # partial template, included where relevant
│   ├── post.html ..... # base template for posts
│   └── project.html .. # base template for projects
├── blog/ ........................ # where blog posts go
│   ├── blog.json ................ # 11ty folder configuration
│   ├── hello-world.md ........... # write posts as md files
│   ├── another-post.md
│   ├── index.html ............... # what loads when clicking "blog"
│   └── tag.html ................. # a tag page
├── projects/ .................... # where projects go
│   ├── index.html ............... # what loads when clicking "projects"
│   └── projects.json ............ # 11ty folder configuration
├── eleventy.config.js
├── .eleventyignore
├── .gitignore
├── index.html
├── .nojekyll
├── package.json
├── package-lock.json
└── README.md
```


## Deploying

The site is built and deployed on Github using a Github action.


## To do

- [x] Add bluesky comments
  - [ ] Check if some media types are missing
  - [ ] Unroll links in `record.text` using informtation from `facets`
- [ ] [Treat images properly with the image plugin](https://www.aleksandrhovhannisyan.com/blog/eleventy-image-plugin/) ([Eleventy docs](https://www.11ty.dev/docs/plugins/image/)).
- [ ] Minify CSS and SVGs. See [Eleventy asset pipeline](https://mxb.dev/blog/eleventy-asset-pipeline/).
- [ ] Find a proper social-media icons pack
- [ ]  {% if page.url == post.url %} aria-current="page"{% endif %}


## Resources

Assets in Eleventy:
  - <https://github.com/11ty/eleventy-plugin-bundle>
  - <https://mxb.dev/blog/eleventy-asset-pipeline/>

Collections in Eleventy:
  - <https://www.11ty.dev/docs/collections/>

Open Graph card:
  - Homepage: <https://ogp.me/>
  - Tester: <https://opengraph.dev/>
