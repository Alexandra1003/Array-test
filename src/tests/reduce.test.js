import MyArray from '../index';

  describe("tests for method reduce", () => {
    test("instance has method reduce", () => {
      const arr = new MyArray(1, 4, 0);

      expect(arr.reduce).toBeInstanceOf(Function);
    });

    test("instance has not own property reduce", () => {
      const arr = new MyArray(1, 4, 0);

      expect(arr.hasOwnProperty("reduce")).toBeFalsy();
    });

    test("Method shouldn't mutate initial array", () => {
      const arr = new MyArray(1, 2, 3);
      const mockCallback = jest.fn();
      arr.reduce(mockCallback);

      expect(arr).toEqual(MyArray(1, 2, 3));
    });

    test("If callback is not a function the error should be thrown", () => {
      let callback = 1212121;
      const arr = new MyArray(1, 4, 4, 5, 0, 0);

      expect(()=>{arr.reduce(callback)}).toThrow();
    });

    test("If an array is empty but there is an InitialValue as a parameter", () => {
      let arr = new MyArray();
      const mockCallback = jest.fn();
      let thisArg = { minimum: 10, maximum: 20 };
      let result = arr.reduce(mockCallback, thisArg);

      expect(result).toEqual(thisArg);
    });

    test('reduce callback takes first element as a value of first parameter if initialValue is not passed', () => {
      const arr = new MyArray(1, 2);
      const mockCallback = jest.fn(accum => 0);
      arr.reduce(mockCallback);

      expect(mockCallback.mock.calls[0][0]).toEqual(1);
    });

    test('If array is empty and InitialValue is specified, callback shouldn\'t  be called, and methods result should be ItitialValue', () => {
      const arr = new MyArray();
      const callReduceOnEmptyArray = () => {
        arr.reduce(() => {});
      };

      expect(callReduceOnEmptyArray).toThrow(TypeError);
    });

    test('As an another option of previous test - the number of callback function calls should be equal to the arrays length', () => {
      const arr = new MyArray(1, 2, 3, 5);
      const mockCallback = jest.fn();
      let z = arr.reduce(mockCallback, 0);

      expect(mockCallback.mock.calls.length).toBe(4);
    });

    describe("tests for initial value", () => {
      test('initial value is null', () => {
        const arr = new MyArray(1, 2);
        const mockCallback = jest.fn();
        arr.reduce(mockCallback, null);

        expect(mockCallback.mock.calls[0][0]).toBeNull();
      });

      test('initial value is false', () => {
        const arr = new MyArray(1, 2);
        const mockCallback = jest.fn();
        arr.reduce(mockCallback, false);

        expect(mockCallback.mock.calls[0][0]).toBeFalsy();
      });

      test('initial value is 0', () => {
        const arr = new MyArray(1, 2);
        const mockCallback = jest.fn();
        arr.reduce(mockCallback, 0);

        expect(mockCallback.mock.calls[0][0]).toEqual(0);
      });

      test('initial value is \'\'', () => {
        const arr = new MyArray(1, 2);
        const mockCallback = jest.fn();
        arr.reduce(mockCallback, '');

        expect(mockCallback.mock.calls[0][0]).toEqual('');
      });

      test('initial value is NaN', () => {
        const arr = new MyArray(1, 2);
        const mockCallback = jest.fn();
        arr.reduce(mockCallback, NaN);

        expect(mockCallback.mock.calls[0][0]).toEqual(NaN);
      });
    });
  });
