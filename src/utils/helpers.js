export const cookiesToObjects = (cookiesString) => {
  if (cookiesString) {
    cookiesString.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
    }, {});
  }
  return {};
};
