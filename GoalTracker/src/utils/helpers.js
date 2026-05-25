export const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const isTitleValid = (title) => {
  return typeof title === 'string' && title.trim().length > 0;
};