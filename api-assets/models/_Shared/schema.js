const { mongoose } = require('../../database');

const ParticularStructure = {
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    select: false,
  },
};

module.exports = { ParticularStructure };
