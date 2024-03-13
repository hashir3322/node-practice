import AppError from "./appError.js";

const handleValidationErrorsDB = err => {
  const firstError = Object.values(err.errors)[0];
  const msg = firstError.message;
  return new AppError(msg, 400);
}

const handleDuplicateFieldsDB = err => {
  const errorFieldName = Object.keys(err.keyValue)[0];

  const msg = `${errorFieldName}: ${err.keyValue[errorFieldName]} is not available.`;
  return new AppError(msg, 400);
}


function globalErrorHandler(err, req, res, next) {
  console.log('in global');


  // if(err.name === '')
  // if (err.name === 'CastError') {
  //   err = handleCastErrorDB(err);
  // }

  if (err.name === 'ValidationError') {
    err = handleValidationErrorsDB(err);
  }

  if (err?.code === 11000) {
    err = handleDuplicateFieldsDB(err);
  }


  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong'
  return res.status(err.statusCode).json({
    status: 'error',
    error: err,
    message: err?.message
  });
}

export default globalErrorHandler;