import WebStorage from '../src';
import 'jest-localstorage-mock';

describe('WebStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  describe('main API', () => {
    const webStorage = new WebStorage();

    it('gets single item from localStorage', async () => {
      localStorage.setItem('key1', 'value1');
      expect(await webStorage.getSingle('key1')).toBe('value1');
    });

    it('saves single item to localStorage', async () => {
      await webStorage.setSingle('key1', 'value1');
      expect(localStorage.__STORE__['key1']).toBe('value1');
    });

    it('gets multiple items from localStorage', async () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      expect(await webStorage.getMany(['key1', 'key2'])).toEqual([
        'value1',
        'value2',
      ]);
    });

    it('saves multiple items to localStorage', async () => {
      await webStorage.setMany([{key1: 'value1'}, {key2: 'value2'}]);
      expect(localStorage.__STORE__).toEqual({key1: 'value1', key2: 'value2'});
    });

    it('removes single item from localStorage', async () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      await webStorage.removeSingle('key1');
      expect(localStorage.__STORE__).toEqual({key2: 'value2'});
    });

    it('removes multiple items from localStorage', async () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.setItem('key3', 'value3');
      await webStorage.removeMany(['key1', 'key2']);
      expect(localStorage.__STORE__).toEqual({key3: 'value3'});
    });

    it('gets keys from localStorage', async () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      expect(await webStorage.getKeys()).toEqual(['key1', 'key2']);
    });

    it('removes all keys from localStorage', async () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      await webStorage.dropStorage();
      expect(localStorage.__STORE__).toEqual({});
    });
  });
  // describe('utils', () => {
  //   it('uses logger when provided', async () => {
  //     const loggerFunc = jest.fn();

  //     const as = new WebStorage<any, any>(mockedStorage, {
  //       logger: loggerFunc,
  //       errorHandler: false,
  //     });

  //     await as.get('key');
  //     expect(loggerFunc).toBeCalledTimes(1);
  //     expect(loggerFunc).toBeCalledWith({action: 'read-single', key: 'key'});
  //   });

  //   it('uses error handler when provided', async () => {
  //     const errorHandler = jest.fn();

  //     const error = new Error('Fatal!');
  //     mockedStorage.getSingle.mockImplementationOnce(async () => {
  //       throw error;
  //     });

  //     const as = new WebStorage<any, any>(mockedStorage, {
  //       errorHandler,
  //       logger: false,
  //     });

  //     await as.get('key');

  //     expect(errorHandler).toBeCalledTimes(1);
  //     expect(errorHandler).toBeCalledWith(error);
  //   });
  // });
});
