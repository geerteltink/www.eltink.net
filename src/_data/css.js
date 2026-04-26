import path from 'path';
import generateHash from '../_lib/generateHash.js';

const hash = generateHash(path.join(path.dirname(import.meta.url), '../assets/css/**/*.css'));

export default {
  stylesCss: `/assets/css/styles.${hash}.css`,
};
