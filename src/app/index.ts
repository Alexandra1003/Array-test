interface IMyArray<T> {
  length: number;
  push(...args: T[]): number;
  pop(): T;
  forEach(callback: (item: T, index: number, array: IMyArray<T>) => void, thisArg?: any): void;
  map<R>(callback: (item: T, index: number, array: IMyArray<T>) => R, thisArg?: any): IMyArray<R>;
  toString(): string;
  filter(callback: (item: T, index: number, array: IMyArray<T>) => T, thisArg?: any): IMyArray<T>;
  reduce<R>(callback: (accum: T, item: T, index: number, array: IMyArray<T>) => R, initialValue?: any): R;
  sort(compareFunc?: (a: any, b: any) => number): this;
  slice(begin?: number, end?: number): IMyArray<T>;
  find(callback: (item: T, index: number, array: IMyArray<T>) => boolean, thisArg?: any): T;
}

interface IMyIterable<T> {
  length: number;
  [key: number]: T;
}

class MyArray<T> implements IMyArray<T>{
  length: number;
  [key: number]: T;
  
  constructor(...args: T[] | [ number ]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      this.length = args.length;

      for (let i = 0; i < args.length; i++) {
        this[i] = args[i] as T;
      }
    }
  }

  push(...args: T[]): number {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }

  pop(): T {
    if (this.length === 0) {
      return;
    }

    const deletedKey = this.length - 1;
    const deletedValue = this[deletedKey];
    delete this[deletedKey];
    this.length -= 1;

    return deletedValue;
  }

  static from<T, R>(arrayLike: IMyIterable<T>, mapFn?: (value: T, index: number) => R, thisArg?: any): MyArray<T> | MyArray<R> {
    const newArr: MyArray<T> | MyArray<R> = new MyArray();

    if (arguments.length === 1) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArr[i] = arrayLike[i] as T;
        newArr.length += 1;
      }
    } else if (mapFn) {
      for (let i = 0; i < arrayLike.length; i++) {
        newArr[i] = mapFn.call(thisArg, arrayLike[i]) as R;
        newArr.length += 1;
      }
    }

    return newArr;
  }

  forEach(callback: (item: T, index: number, array: IMyArray<T>) => void, thisArg?: any): void {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map<R>(callback: (item: T, index: number, array: IMyArray<T>) => any, thisArg?: any): MyArray<R> {
    const newObj = new MyArray<R>();

    for (let i = 0; i < this.length; i++) {
      newObj[i] = callback.call(thisArg, this[i], i, this);
      newObj.length += 1;
    }

    return newObj;
  }

  toString(): string {
    let result = '';

    if (this.length > 0) {
      for (let i = 0; i < this.length - 1; i++) {
        result += `${this[i]},`;
      }
      result += `${this[this.length - 1]}`;
    }

    return result;
  }

  filter(callback: (item: T, index: number, array: IMyArray<T>) => any, thisArg?: any): MyArray<T> {
    const newObj = new MyArray<T>();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        newObj[newObj.length] = this[i];
        newObj.length += 1;
      }
    }

    return newObj;
  }

  reduce<R>(callback: (accum: T, item: T, index: number, array: IMyArray<T>) => R, initialValue?: any): R {
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

  sort(compareFunc?: (a: any, b: any) => number): this {
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

  slice(begin?: number, end?: number): MyArray<T> {
    const newArr = new MyArray<T>();

    const start = begin < 0 ? this.length + begin : begin || 0;
    const finish = end < 0 ? this.length + end : end || this.length;

    for (let i = start; i < finish; i++) {
      newArr[newArr.length] = this[i];
      newArr.length += 1;
    }
    return newArr;
  }

  find(callback: (item: T, index: number, array: IMyArray<T>) => boolean, thisArg?: any): T {
    if (typeof (callback) !== 'function') {
      throw new TypeError('Callback is not a function.');
    }

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;