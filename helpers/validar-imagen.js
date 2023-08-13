const validarImagen=(req, res,next) => {
    if (!req.file || !req.file.originalname) {
      return res.status(400).json({ error: 'Debes enviar una imagen' });
    }
    next();
}

module.exports ={
    validarImagen
}