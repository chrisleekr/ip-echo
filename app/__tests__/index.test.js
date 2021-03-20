/* eslint-disable global-require */
describe('index.js', () => {
  let mockExpressListen;
  let mockLoggerInfo;

  beforeEach(() => {
    jest.clearAllMocks().resetModules();
  });

  describe('when port is not defined', () => {
    beforeEach(async () => {
      mockExpressListen = jest.fn().mockImplementation((port, func) => {
        func();
      });
      mockLoggerInfo = jest.fn().mockReturnValue(true);

      jest.mock('../app', () => ({
        app: { listen: mockExpressListen },
        logger: {
          info: mockLoggerInfo
        }
      }));

      require('../index.js');
    });

    it('triggers app.listen', () => {
      expect(mockExpressListen).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('triggers logger.info', () => {
      expect(mockLoggerInfo).toHaveBeenCalledWith({ port: 3000 }, expect.any(String));
    });
  });

  describe('when port is defined', () => {
    beforeEach(async () => {
      mockExpressListen = jest.fn().mockImplementation((port, func) => {
        func();
      });
      mockLoggerInfo = jest.fn().mockReturnValue(true);

      jest.mock('../app', () => ({
        app: { listen: mockExpressListen },
        logger: {
          info: mockLoggerInfo
        }
      }));

      process.env.PORT = 3001;
      require('../index.js');
    });

    it('triggers app.listen', () => {
      expect(mockExpressListen).toHaveBeenCalledWith('3001', expect.any(Function));
    });

    it('triggers logger.info', () => {
      expect(mockLoggerInfo).toHaveBeenCalledWith({ port: '3001' }, expect.any(String));
    });
  });
});
