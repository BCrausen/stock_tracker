import {mutations} from '@/store/symbols.js';

const fakelocalStorage = {
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn()
};

global.localStorage = fakelocalStorage;

describe("Symbol Store Mutations", () => {
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

  it('Remove All Symbols', () => {
    mutations.removeAllSymbols(state);
    expect(state.symbols.length).toBe(0);
    expect(state.symbolData.length).toBe(0);
    expect(localStorage.getItem('symbols')).toBe(null);
  });

  it('Set Symbol Data', () => {
    let symbolData = [{symbol:'GNUS', latestPrice: 1.92, change: 0.02}];
    mutations.setSymbolData(state,symbolData);
    expect(state.symbolData).toBe(symbolData);
  });

  it('Add Symbol', () => {
    let newSymbol = "GNUS";
    mutations.addSymbol(state,newSymbol);
    expect(state.symbols.includes(newSymbol)).toBe(true);
    expect(JSON.parse(localStorage.getItem('symbols')).includes(newSymbol)).toBe(true);
  });

  it('Add Symbol Data', () => {
    let symbolData = [{symbol:'GNUS', latestPrice: 1.92, change: 0.02}];
    mutations.addSymbol(state,symbolData);
    expect(state.symbolData[0].symbol).toBe(symbolData[0].symbol);
    expect(state.symbolData[0].latestPrice).toBe(symbolData[0].latestPrice);
    expect(state.symbolData[0].change).toBe(symbolData[0].change);
  });

  it('Remove Symbol', () => {
    let removedSymbol = "GNUS";
    mutations.removeSymbol(state,removedSymbol);
    expect(state.symbols.includes(removedSymbol)).toBe(false);
    expect(state.symbolData.length).toBe(0);
    expect(JSON.parse(localStorage.getItem('symbols')).includes('GNUS')).toBe(false);
  });

  it('Set Symbol Name Error', () => {
    mutations.setSymbolNameError(state,"test");
    expect(state.symbolNameError).toBe("test");
  });

  it('Set Symbol Server Error', () => {
    mutations.setSymbolServerError(state,"test");
    expect(state.symbolServerError).toBe("test");
  });

  it('Change loading status to true', () => {
    mutations.setLoadingStatus(state,true);
    expect(state.loadingStatus).toBe(true);
  });

});
