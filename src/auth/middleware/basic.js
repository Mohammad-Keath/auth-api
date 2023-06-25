'use strict';

const base64 = require('base-64');
const { usersModel } = require('../../models/index');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }
else{
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

 
    req.user = await usersModel.authenticateBasic(user, pass)
    if(req.user){
    next();
  }else { next('user not found')}
 }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}
