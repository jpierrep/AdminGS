const currencyFormat = (num: number) => {
  return "$" + (num || '0').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export default currencyFormat;
