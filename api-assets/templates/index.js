module.exports = {
  s: (name) => new RegExp(`((//|/\\*) )?(<!-- )?%${name}%( (-->|\\*/))?`, 'g'),
};
