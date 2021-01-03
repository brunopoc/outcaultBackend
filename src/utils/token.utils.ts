const jwt = require('jsonwebtoken');

export const createToken = (data) => jwt.sign(data, global.SALT_KEY, { expiresIn: 60 * 120 });

export const decodeToken = async (token) => {
  try {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
  } catch (err) {
    console.log('Token Invalido: ', err);
    return { err, message: 'invalid' };
  }
};
