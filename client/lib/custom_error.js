const CustomError = (message) => {
  this.name = 'CustomError';
  this.message = message || '独自エラー';
};

CustomError.prototype = new Error();
CustomError.prototype.constructor = CustomError;

export default CustomError;
