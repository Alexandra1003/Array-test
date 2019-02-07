class MyArray {
  length: number;
  [key: number] : any;
  constructor(...args: any[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      this.length = args.length;

      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
    }
  }

  push<T>(...args: T[]) : number {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }

  pop() {
    if (this.length === 0) {
      return;
    }

    const deletedKey = this.length - 1;
    const deletedValue = this[deletedKey];
    delete this[deletedKey];
    this.length -= 1;

    return deletedValue;
  }

  static from(arrayLike, mapFn, thisArg) {
    const newArr = new MyArray();

    if (arguments.length === 1) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArr[i] = arrayLike[i];
        newArr.length += 1;
      }
    } else if (mapFn) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArr[i] = mapFn.call(thisArg, arrayLike[i]);
        newArr.length += 1;
      }
    }

    return newArr;
  }

  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const newObj = new MyArray();

    for (let i = 0; i < this.length; i++) {
      newObj[i] = callback.call(thisArg, this[i], i, this);
      newObj.length += 1;
    }

    return newObj;
  }

  toString() {
    let result = '';

    if (this.length > 0) {
      for (let i = 0; i < this.length - 1; i++) {
        result += `${this[i]},`;
      }
      result += `${this[this.length - 1]}`;
    }

    return result;
  }

  filter(callback, thisArg) {
    const newObj = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        newObj[newObj.length] = this[i];
        newObj.length += 1;
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
    let comparator = compareFunc;

    if (!comparator) {
      comparator = (a, b) => {
        const stringA = String(a);
        const stringB = String(b);

        if (stringA > stringB) {
          return 1;
        } else if (stringB > stringA) {
          return -1;
        } else {
          return 0;
        }
      };
    }

    let temp = null;

    for (let j = this.length; j > 1; j--) {
      for (let i = 0; i < this.length - 1; i++) {
        if (comparator(this[i], this[i + 1]) > 0) {
          temp = this[i];
          this[i] = this[i + 1];
          this[i + 1] = temp;
        }
      }
    }
    return this;
  }

  slice(begin, end) {
    const newArr = new MyArray();

    const start = begin < 0 ? this.length + begin : begin || 0;
    const finish = end < 0 ? this.length + end : end || this.length;

    for (let i = start; i < finish; i++) {
      newArr[newArr.length] = this[i];
      newArr.length += 1;
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