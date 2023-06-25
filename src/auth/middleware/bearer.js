'use strict';

const { usersModel } = require('../../models/index')

module.exports = async (req, res, next) => {



    if (!req.headers.authorization) { _authError() }
     else{
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await usersModel.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    if(req.token){
      next();}else { next('Token not valid')}

    }

  }

  function _authError() {
    next('Invalid Login');
  }

