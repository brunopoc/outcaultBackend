const { decodeToken } = require('@utils/token.utils');
const message = require('@utils/message.utils');

export const authorize = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: message.unauthorized,
    });
  }
  const data = await decodeToken(token);
  if (data.message === 'invalid') {
    return res.status(401).json({
      message: message.unauthorized,
    });
  }

  res.locals.user = data;
  return next();
};

export const authorizeAdmin = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: message.unauthorized,
    });
  }
  const data = await decodeToken(token);
  if (data.type !== 'admin' || data.message === 'invalid') {
    return res.status(401).json({
      message: message.unauthorized,
    });
  }

  res.locals.user = data;
  return next();
};
