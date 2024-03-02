function globalErrorHandler(err, req, res, next) {
  console.log('in global', err);
  res.status(400).json({
    status: 'failed',
    error: err
  })
}

export default globalErrorHandler;