import { v4 as uuidv4 } from 'uuid';

const createFileName = (fileName: string) => {
  const [extension] = fileName.split('.').reverse();
  const newFileName = `image${uuidv4()}.${extension}`;
  return newFileName;
};

export default createFileName;
