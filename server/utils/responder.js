module.exports = function (app) {

  var send = function (code, res, message, data, error_code) {
    if (!code) {
      throw new Error('error_code is required.');
    }
    res.status(code).send(

      {
        status_code: code,
        message: message,
        data: data
      }
    );
  }

  return {
    send: send
  }
}
