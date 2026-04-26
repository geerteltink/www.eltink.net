import meta from './../_data/meta.js';
import { DateTime } from 'luxon';
import striptags from 'striptags';

const limit = (array, limit) => array.slice(0, limit);

const readableDate = (dateObj) => {
  if (!(dateObj instanceof Date)) {
    dateObj = new Date(dateObj);
  }
  return DateTime.fromJSDate(dateObj).setLocale(meta.lang).toLocaleString(DateTime.DATE_FULL);
};

const isoDate = (dateObj) => {
  if (!(dateObj instanceof Date)) {
    dateObj = new Date(dateObj);
  }
  return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
};

const isoDateTime = (dateObj) => {
  if (!(dateObj instanceof Date)) {
    dateObj = new Date(dateObj);
  }
  return DateTime.fromJSDate(dateObj).toISO();
};

const summary = (data) => {
  return striptags(data.replace(/<h1[^>]*>([\s\S]*?)<\/h1[^>]*>/, ''))
    .substring(0, 200)
    .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
    .trim()
    .concat('...');
};

const getRandom = (collection) => {
  const slicedCollection = collection.slice(5);
  return slicedCollection.splice(Math.floor(Math.random() * slicedCollection.length), 1)[0];
};

export default {
  limit,
  readableDate,
  isoDate,
  isoDateTime,
  summary,
  getRandom,
};
