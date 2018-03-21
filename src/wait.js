export default seconds =>
  new Promise(resolve => setTimeout(resolve, 1000 * seconds));
