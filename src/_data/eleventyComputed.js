import meta from './meta.js';
import fs from 'fs';

export default {
  created: (data) => (data?.inputPath ? fs.statSync(data.inputPath).birthtime : undefined),
  modified: (data) => (data?.inputPath ? fs.statSync(data.inputPath).mtime : undefined),
  summary: (data) => {
    if (data.description) {
      return data.description;
    }
    if (data.tags === undefined) {
      return meta.description;
    }
    if (!data.tags.includes('post')) {
      return meta.description;
    }
    return null;
  },
};
