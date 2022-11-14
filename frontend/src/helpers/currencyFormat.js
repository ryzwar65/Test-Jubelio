export const currencyFormat = (num) => {
  return (
    "Rp " +
    Math.round(num)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
};
export default currencyFormat;
