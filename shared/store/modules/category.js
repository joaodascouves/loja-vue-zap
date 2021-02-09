import categoryService from 'shared/services/categoryService';
import sharedModule from './_shared';

const module = sharedModule(categoryService, { name: 'category' });

const category = {
  ...module,
};

export default category;
