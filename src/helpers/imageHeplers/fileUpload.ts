import IFileUpload from './fileUpload.interface';

const fileUpload = async (
  file: Express.Multer.File,
  callback: Function,
): Promise<IFileUpload> | undefined => {
  if (!file) return;
  else {
    return await callback(file.buffer, file.originalname);
  }
};

export default fileUpload;
