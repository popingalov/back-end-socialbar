const getFileName = (link: string) => {
  return link.split('/').reverse()[0].split('.')[0];
};

export default getFileName;
