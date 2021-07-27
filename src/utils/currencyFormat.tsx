const currencyFormat = (num: number) => {
  return "$" + (num || '').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export default currencyFormat;
