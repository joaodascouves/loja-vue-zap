const cloudinary = require('cloudinary').v2;

function removeTrailingExtension(filename) {
  return filename.replace(/\.\w+$/, '');
}

async function remove(filename) {
  if (!/^htt(p|ps):\/\/res\.cloudinary\.com/.test(filename)) {
    return;
  }

  if (typeof filename !== 'string' || filename === '') {
    return;
  }

  const parsedFilename = removeTrailingExtension(filename).replace(/^.*\//, '');

  return cloudinary.uploader.destroy(parsedFilename);
}

async function move(file, clientId) {
  const {
    current, link, name, content,
  } = file;

  if (current !== undefined) {
    await remove(current);
  }

  if (link) {
    return Promise.resolve(link);
  }

  const parsedFilename = removeTrailingExtension(`${clientId}_${name}`);

  const { secure_url } = await cloudinary.uploader.upload(content, {
    public_id: parsedFilename,
    overwrite: true,
  });

  if (!secure_url) {
    throw new Error('Falha ao enviar imagem');
  }

  return Promise.resolve(secure_url);
}

const uploadService = {
  move,
  remove,
};

module.exports = uploadService;
