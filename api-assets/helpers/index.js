export const propIfExists = (object, propName) => (typeof object[propName] === 'string' || object[propName] ? { [propName]: object[propName] } : {});

export const trimTags = (string) => string.replace(/([\s ]?)*,([\s ]?)*/g, ',');
