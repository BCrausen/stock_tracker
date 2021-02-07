import {getters} from '@/store/symbols.js';

describe("Symbol Store Getters", () => {
  let state = {
    symbols: ["TLSA"],
    symbolData: [{symbol:'TLSA', latestPrice: 1023.92, change: -20.58}],
    symbolNameError: "A name error",
    symbolServerError: "A server error",
    loadingStatus: false
  };

  it('Get All Symbol Data', async () => {
    const symbolData = [{symbol:'TLSA', latestPrice: 1023.92, change: -20.58}];
    const retrievedData = await getters.allSymbolData(state);
    expect(retrievedData[0].symbol).toBe(symbolData[0].symbol);
    expect(retrievedData[0].latestPrice).toBe(symbolData[0].latestPrice);
    expect(retrievedData[0].change).toBe(symbolData[0].change);
  });

  it('Get Symbol Name Error', () => {
    const nameError = "A name error";
    expect(getters.getSymbolNameError(state,nameError)).toBe(nameError);
  });

  it('Get Symbol Server Error', () => {
    const serverError = "A server error";
    expect(getters.getSymbolServerError(state,serverError)).toBe(serverError);
  });

  it('Get Loading Status', () => {
    const expectedStatus = false;
    expect(getters.getLoadingStatus(state,expectedStatus)).toBe(expectedStatus);
  });
});
