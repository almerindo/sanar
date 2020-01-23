export default async (req, res, next) => {
  try {
    const { cardId } = req.body;

    if (!req.cards.length) {
      return res.status(404).json({
        error: 'Customer não possui cartoes cadastrados em sua carteira!',
      });
    }

    if (req.params.card && cardId && req.params.card !== cardId) {
      return res.status(400).json({
        error: `CardID ${cardId} informado diferente do req.params.card ${req.params.card} !`,
      });
    }
    // Encontra o cartao
    const cardLocal = req.cards.find(card => {
      const index = req.params.card ? req.params.card : cardId;
      return card.remote_id === index ? card : null;
    });
    if (!cardLocal) {
      return res.status(404).json({
        error: `O cartao ${cardId} não está associado ao Cliente ${req.userRemoteID}`,
      });
    }
    req.cardFound = cardLocal;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Verificação de Cartao falhou' });
  }
};
