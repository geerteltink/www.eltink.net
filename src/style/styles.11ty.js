import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import generateHash from '../_lib/generateHash.js';

export default class {
  async data() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const rawFilepath = path.join(__dirname, '../assets/css/styles.css');
    const hash = generateHash(path.join(__dirname, '../assets/css/**/*.css'));

    return {
      permalink: `assets/css/styles.${hash}.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath),
      eleventyExcludeFromCollections: true,
    };
  }

  async render({ rawCss, rawFilepath }) {
    const postcssImport = (await import('postcss-import')).default;
    const cssnano = (await import('cssnano')).default;
    return await postcss([postcssImport, cssnano])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
}
