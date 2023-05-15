function Wrapper(func) {
  async function funcDecor(req, res, next) {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  return funcDecor;
}

module.exports = {
  Wrapper,
};
