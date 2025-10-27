import slugify from 'slugify';

export const createSlug = (title) => {
  return slugify(title, { lower: true, strict: true });
};

export default createSlug;