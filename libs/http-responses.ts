const HTTP_RESPONSES = {
  ok: {
    code: 200,
    status: 'ok',
  },
  created: {
    code: 201,
    status: 'created',
  },
  accepted: {
    code: 202,
    status: 'accepted',
  },
  deleteEl: {
    code: 204,
    status: 'contact deleted',
  },
  notThisV: {
    code: 307,
    status: 'This version is not ready yet!!! Check out the first version.',
  },
  badValid: {
    code: 400,
    status: error => `${error.details[0].message}`,
  },
  badRequest: {
    code: 400,
    status: 'bad request',
  },
  wrongData: {
    code: 401,
    status: 'Email or password is wrong',
  },
  badAuth: {
    code: 401,
    status: 'Not authorized',
  },
  notVerify: {
    code: 401,
    status: 'Email not verify',
  },
  notFound: {
    code: 404,
    status: id => `Id ${id} not found`,
  },
  dataError: {
    code: 407,
    status: 'Wrong date',
  },
  inUse: {
    code: 409,
    status: 'Email in use',
  },
  сonflict: {
    code: 409,
    status: mail => `Email ${mail} in use`,
  },
  serverError: {
    code: 500,
    status: 'Sorry, we are being DDoSed. Please call later.',
  },
};

module.exports = HTTP_RESPONSES;
