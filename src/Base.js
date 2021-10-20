class Base {
  throwError(condition, message) {
    if (condition) throw new Error(message);
  }
}

module.exports = Base;
