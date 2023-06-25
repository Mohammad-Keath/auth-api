'use strict';

const { usersModel } = require('../../models/index')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }
     else{
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await usersModel.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();}

  } catch (e) {
    console.log(e)
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}
