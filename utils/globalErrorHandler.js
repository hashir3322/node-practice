function globalErrorHandler(err, req, res, next) {
  console.log('in global');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong'
  // res.status(400).json({
  //   status: 'failed',
  //   error: err
  // })
  return res.status(err.statusCode).json({
    status: 'error',
    message: err?.message
  });
}

export default globalErrorHandler;