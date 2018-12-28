class MyArray {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      this.length = args.length;

      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
    }
  }

  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length = this.length + 1;
    }
    return this.length;
  }

  pop() {
    const deletedKey = this.length - 1;
    const deletedValue = this[deletedKey];
    delete this[deletedKey];

    if (this.length > 0) {
      this.length = this.length - 1;
    }
    return deletedValue;
  }

  static from(arrayLike, mapFn, thisArg) {
    const newArr = new MyArray();

    if (arguments.length === 1) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArr.push(arrayLike[i]);
      }
    } else if (mapFn) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArr.push(mapFn.call(thisArg, arrayLike[i]));
      }
    }
    return newArr;
  }

  forEach(callback, thisArg) {
    if (!callback) {
      return;
    }

    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const newObj = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newObj.push(callback.call(thisArg, this[i], i, this));
    }

    return newObj;
  }

  toString() {
    let result = '';
    let separator = '';

    this.forEach(item => {
      result += separator + item;
      separator = ',';
    });
    return result;
  }

  filter(callback, thisArg) {
    const newObj = new MyArray();

    for (let i = 0; i < this.length; i++) {
      const match = callback.call(thisArg, this[i], i, this);

      if (match) {
        newObj.push(this[i]);
      }
    }

    return newObj;
  }

  reduce(callback, initialValue) {
    if (this.length === 0 && !initialValue) {
      throw new TypeError('MyArray.prototype.reduce called on null or undefined');
    }

    if (this.length === 0 && initialValue) {
      return initialValue;
    }

    let accumulator = initialValue === undefined ? this[0] : callback(initialValue, this[0], 0, this);

    for (let i = 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  sort(compareFunc) {
    if (compareFunc) {
      let temp = null;

      for (let j = this.length; j > 1; j--) {
        for (let i = 0; i < this.length - 1; i++) {
          if (compareFunc(this[i], this[i + 1]) > 0) {
            temp = this[i];
            this[i] = this[i + 1];
            this[i + 1] = temp;
          }
        }
      }
      return this;
    } else {
      for (let i = 1; i < this.length; i++) {
        const current = this[i];
        let j = i;

        while (j > 0 && String(this[j - 1]) > String(current)) {
          this[j] = this[j - 1];
          j -= 1;
        }

        this[j] = current;
      }
      return this;
    }
  }

  slice(begin, end) {
    const newArr = new MyArray();
    let start = begin ? begin : 0;
    let finish = end ? end : this.length;

    start = start < 0 ? this.length + start : start;
    finish = finish < 0 ? this.length + finish : finish;

    for (let i = start; i < finish; i++) {
      newArr.push(this[i]);
    }
    return newArr;
  }

  find(callback, thisArg) {
    if (typeof (callback) !== 'function') {
      throw new TypeError('Callback is not a function.');
    }

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;