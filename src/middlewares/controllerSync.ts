import sss from '../libs/http-responses';
const { badValid } = sss;

const controllerSync = (ctrl: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await ctrl(req, res, next);
    } catch (error: any) {
      if (error.message.includes('validation failed')) {
        error.status = badValid.code;
      }
      next(error);
    }
  };
};

export default controllerSync;
