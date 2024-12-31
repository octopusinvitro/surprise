import { IdAttributePlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {
  const inProduction = process.env.ENVIRONMENT == 'production';

  eleventyConfig.addGlobalData('author', 'Phil Downer');
  eleventyConfig.addGlobalData('webmaster', 'Octopus in Vitro');
  eleventyConfig.addGlobalData('handle', 'pjd.me.uk');
  eleventyConfig.addGlobalData('prodURL', 'https://pjd.me.uk');
  eleventyConfig.addGlobalData('devURL', 'http://localhost:8080');
  eleventyConfig.addGlobalData('baseURL', function () {
    if (inProduction) {
      return eleventyConfig.globalData.prodURL;
    }
    return eleventyConfig.globalData.devURL;
  }());

  function getPosts(api) {
    return api.getFilteredByGlob('blog/**/*.md').filter(post => !(inProduction && post.data.draft));
  };

  function getProjects(api) {
    return api.getFilteredByGlob('projects/**/*.md');
  }

  eleventyConfig.addCollection('blog', getPosts);
  eleventyConfig.addCollection('projects', getProjects);
  eleventyConfig.addCollection('tags', function (api) {
    let set = new Set();
    getPosts(api).forEach((post) => {
      (post.data.tags || []).forEach((tag) => set.add(tag));
    });

    return (Array.from(set) || []).filter(
      (tag) => !['all', 'blog', 'projects'].includes(tag)
    );
  });

  eleventyConfig.addPassthroughCopy({ './public/': '/' })

  eleventyConfig.addBundle('css', { toFileDirectory: 'css' });
  eleventyConfig.addBundle('js', { toFileDirectory: 'js' });

  eleventyConfig.addPlugin(IdAttributePlugin, { checkDuplicates: 'false' });
};
