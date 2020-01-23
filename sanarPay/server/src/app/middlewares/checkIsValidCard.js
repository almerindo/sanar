export default async (req, res, next) => {
  try {
    const { cardId } = req.body;

    if (!req.cards.length) {
      return res.status(404).json({
        error: 'Customer não possui cartoes cadastrados em sua carteira!',
      });
    }

    // Encontra o cartao
    const cardLocal = req.cards.find(card => {
      return card.remote_id === cardId;
    });
    if (!cardLocal) {
      return res.status(404).json({
        error: `O cartao ${cardId} não está associado ao Cliente ${req.userRemoteID}`,
      });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Verificação de Cartao falhou' });
  }
};
