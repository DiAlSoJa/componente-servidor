const bodyLoggerMiddleware = (req, res, next) => {
  // Verificar si la solicitud tiene un cuerpo
  if (req.body&& req.file) {
    console.log({
      body: req.body,
      file: req.file
    });
  }

  // Pasar al siguiente middleware
  next();
};

module.exports ={
  bodyLoggerMiddleware
}