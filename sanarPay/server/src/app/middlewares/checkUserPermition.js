export default async (req, res, next) => {
  try {
    if (req.params.cus !== String(req.userRemoteID)) {
      return res
        .status(405)
        .json({ error: 'User ID não pertence ao Token Informado!' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Verificação de permissão falhou!' });
  }
};
