export const removeTags = (str: string) => {
  if (str === null || str === '') return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const formatCurrency = (str: any) => {
  str = `${str}`;
  if (str && str !== '') {
    str = str.split('.');
    return `₹${str[0].replace(/(\d)(?=(\d\d)+\d$)/g, '$1,') + (str[1] ? '.' + str[1] : '')}`;
  }
  return `₹0`;
};
