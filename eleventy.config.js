import pluginRss from '@11ty/eleventy-plugin-rss';
import Image from '@11ty/eleventy-img';
import { minify } from 'html-minifier-terser';
import filters from './src/_lib/filters.js';

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [400, 800, 1280, 1920],
    formats: ['webp', 'jpeg'],
    outputDir: '_site/assets/images',
    urlPath: '/assets/images',
  });

  let imageAttributes = {
    alt,
    sizes: sizes || '100vw',
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  Object.keys(filters).forEach((name) => {
    eleventyConfig.addFilter(name, filters[name]);
  });

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addAsyncShortcode('image', imageShortcode);

  eleventyConfig.addWatchTarget('./src/_lib');
  eleventyConfig.addWatchTarget('./src/assets');

  eleventyConfig.addPassthroughCopy('./src/favicon.png');

  eleventyConfig.addTransform('htmlmin', async function (content, outputPath) {
    if (process.env.NODE_ENV === 'production' && outputPath && outputPath.endsWith('.html')) {
      let minified = await minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      data: '_data',
      includes: '_includes',
    },
    templateFormats: ['html', 'njk', 'md', '11ty.js'],
    passthroughFileCopy: true,
    //markdownTemplateEngine: 'liquid',
    //htmlTemplateEngine: 'liquid',
    //dataTemplateEngine: false
  };
}
