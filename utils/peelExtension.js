export default (name) => {
  const idx = name.lastIndexOf('.');
  return name.substring(0, idx);
};
