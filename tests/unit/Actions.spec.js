import {actions, mutations} from '@/store/symbols.js';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Symbol Store Actions", () => {
  let state = {
    symbols: ["TLSA", "AAPL", "GOOG"],
    symbolData: [
      {symbol:'TLSA', latestPrice: 1023.92, change: -20.58},
      {symbol:'AAPL', latestPrice: 321.22, change: -0.34},
      {symbol:'GOOG', latestPrice: 10.94, change: 0.022}
    ],
    symbolNameError: "",
    symbolServerError: "",
    loadingStatus: false
  };

  it('Get all symbol data with successful fetch', () => {
    const symbolRequestData = {'TLSA': {'quote' : {symbol:'TLSA', latestPrice: 1023.92, change: -20.58}}};
    const symbolData = [{symbol: 'TLSA', latestPrice: 1023.92, change: -20.58}];
    const commitObj = {
      commit: jest.fn()
    }
    const commitSpy = jest.spyOn(commitObj, 'commit');

    fetch.mockResponseOnce(JSON.stringify(symbolRequestData));

    actions.getSymbolData(commitObj)
    .then(() => {
      expect(commitSpy.mock.calls).toEqual([
        ['setLoadingStatus', true],
        ['setSymbolData', symbolData],
        ['setSymbolServerError', ''],
        ['setLoadingStatus', false],
      ]);
    })
  });

  it('Get all symbol data with unsuccessful fetch', () => {
    const commitObj = {
      commit: jest.fn()
    }
    const commitSpy = jest.spyOn(commitObj, 'commit');

    fetch.mockRejectOnce(new Error('Could not grab quotes'));

    actions.getSymbolData(commitObj)
    .then(() => {
      expect(commitSpy.mock.calls).toEqual([
        ['setLoadingStatus', true],
        ['setSymbolServerError', "Couldn't contact server"],
        ['setLoadingStatus', false],
      ]);
    })
  });

  it('Add Symbol with successful fetch', () => {
    const symbolToAdd = "TLSA";
    const symbolData = {symbol:'TLSA', latestPrice: 1023.92, change: -20.58};
    const commitObj = {
      commit: jest.fn()
    }
    const commitSpy = jest.spyOn(commitObj, 'commit');

    fetch.mockResponseOnce(JSON.stringify(symbolData));

    actions.addSymbol(commitObj, symbolToAdd)
    .then(() => {
      expect(commitSpy.mock.calls).toEqual([
        ['setLoadingStatus', true],
        ['addSymbol', symbolToAdd],
        ['addSymbolData', symbolData],
        ['setSymbolNameError', ''],
        ['setLoadingStatus', false],
      ]);
    })
  });

  it('Add Symbol with unsuccessful fetch', () => {
    const symbolToAdd = "TLSA";
    const symbolData = {symbol:'TLSA', latestPrice: 1023.92, change: -20.58};
    const commitObj = {
      commit: jest.fn()
    }
    const commitSpy = jest.spyOn(commitObj, 'commit');

    fetch.mockRejectOnce(new Error('Could not grab symbol'));

    actions.addSymbol(commitObj, symbolToAdd)
    .then(() => {
      expect(commitSpy.mock.calls).toEqual([
        ['setLoadingStatus', true],
        ['setSymbolNameError', "Couldn't find symbol"],
        ['setLoadingStatus', false],
      ]);
    })
  });

  it('Delete Symbol', () => {
    const symbolToDelete = "TLSA";
    const commitObj = {
      commit: jest.fn()
    }
    const commitSpy = jest.spyOn(commitObj, 'commit');
    actions.deleteSymbol(commitObj, symbolToDelete)
    .then(() => {
      expect(commitSpy).toHaveBeenCalledWith('removeSymbol', symbolToDelete);
    })
  });

  it('Remove All Symbols', () => {
    const commitObj = {
      commit: jest.fn()
    }
    const commitSpy = jest.spyOn(commitObj, 'commit');
    actions.removeAllSymbols(commitObj)
    .then(() => {
      expect(commitSpy.mock.calls).toEqual([
        ['removeAllSymbols'],
        ['setSymbolData', []]
      ]);
    })
  });
});
