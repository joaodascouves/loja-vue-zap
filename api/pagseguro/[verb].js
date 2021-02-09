const entrypoint = require('../../api-assets/entrypoint');
const PagseguroController = require('../../api-assets/controllers/PagseguroController');

module.exports = entrypoint(async (req, res, clientId, auth) => {
  const {
    query: { verb },
  } = req;

  switch (verb) {
  case 'generateLink': {
    return PagseguroController.generateLink(req.body).then(({ checkout }) => {
      res.status(200).json({
        code: checkout.code[0],
        date: checkout.date[0],
      });
    });
  }

  default: {
    throw new Error('invalid verb');
  }
  }
});
