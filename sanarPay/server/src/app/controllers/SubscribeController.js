import mundipagg from 'mundipagg-nodejs';

class SubscribeController {
  async store(req, res) {
    // Capturar o customer pelo seu ID
    // os Dados do plano desejado
    // Atualizar o customer com o ID do plano
    // Persistir local e remotamente.
    return res.status(400).json('Not implemented Yet!');
  }

  async update(req, res) {
    // Capturar o customer pelo seu ID
    // os Dados do plano desejado,se informado, para atializaçao
    // capturar os dados do cartão de crédito para modificar (persiste só remotamente)
    // Persistir local e remotamente (Assinatura do Plano).
    return res.status(400).json('Not implemented Yet!');
  }
}
export default new SubscribeController();
