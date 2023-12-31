'use strict';

const base64 = require('base-64');
const { usersModel } = require('../../models/index');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await usersModel.authenticateBasic(user, pass)
    if(req.user){
    next();
  }}
   catch (e) {
    console.log(e)
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}
