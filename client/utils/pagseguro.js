const pagseguro = {
  makeParameters: (_store) => {
    /* eslint-disable prefer-const */
    let {
      name,
      email,
      phone,
      document,
      state,
      city,
      street,
      number,
      complement,
      zipcode,
      district,
    } = _store.getters['user/currentUser'];

    const { price } = _store.getters['shipping/selectedOption'];

    phone = phone.replace(/^0/, '').slice(0, 2);

    const areaCode = phone.slice(0, 2);
    phone = phone.replace(/^.{2}/, '');

    let parameters = {
      currency: 'BRL',
      senderName: name,
      senderAreaCode: areaCode,
      senderPhone: phone,
      senderCPF: document,
      senderBornDate: '',
      senderEmail: email,
      maxUses: 1,
      maxAge: 3000,
      redirectURL: 'http://bgaclothings.com.br/',
    };

    parameters = {
      ...parameters,
      shippingType: 3, // não especificado
      shippingAddressStreet: street,
      shippingAddressNumber: number,
      shippingAddressComplement: complement,
      shippingAddressDistrict: district,
      shippingAddressPostalCode: zipcode,
      shippingAddressCity: city,
      shippingAddressState: state,
      shippingAddressContry: 'BRA',
      shippingCost: parseFloat(price).toFixed(2),
    };

    const cartItems = _store.getters['cart/items'];

    const discount = cartItems.reduce(
      (a, { price, discount }) => a + (price * discount) / 100,
      0,
    );

    parameters = {
      ...parameters,
      reference: 'TEST123',
      extraAmount: parseFloat(-discount).toFixed(2),
    };

    cartItems.forEach((item, index) => {
      parameters = {
        ...parameters,
        [`itemId${index + 1}`]: item.slug,
        [`itemDescription${index + 1}`]: item.title,
        [`itemAmount${index + 1}`]: parseFloat(item.price).toFixed(2),
        [`itemQuantity${index + 1}`]: item.quantity,
        [`itemWeight${index + 1}`]: 100,
      };
    });

    return parameters;
  },
};

export default pagseguro;
