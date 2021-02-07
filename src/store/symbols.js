const state = {
  symbols: localStorage.getItem('symbols') ? JSON.parse(localStorage.getItem('symbols')) : ["TLSA", "AAPL", "GOOG"],
  symbolData: [],
  symbolNameError: "",
  symbolServerError: "",
  loadingStatus: false
};

export const getters = {
  allSymbolData: state => state.symbolData,
  getSymbolNameError: state => state.symbolNameError,
  getSymbolServerError: state => state.symbolServerError,
  getLoadingStatus: state => state.loadingStatus
};

export const actions = {
  async getSymbolData({commit}) {
    commit('setLoadingStatus', true);
    let symbolData = [];
    if (state.symbols.length > 0) {
      await fetch(`https://cloud.iexapis.com/v1/stock/market/batch?types=quote&symbols=${state.symbols.join()}&range=5y%20&token=pk_522129a0f65e494cadb690746f899c76`, {headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
      .then(data => {
        Object.keys(data).forEach(function(key) {
          symbolData.push({symbol: data[key].quote.symbol, latestPrice: data[key].quote.latestPrice, change: data[key].quote.change})
        });
        commit('setSymbolData', symbolData);
        commit('setSymbolServerError', "");
        commit('setLoadingStatus', false);
      })
      .catch(() => {
        commit('setSymbolServerError', "Couldn't contact server");
        commit('setLoadingStatus', false);
      });
    }
    else {
      commit('setSymbolData', symbolData);
      commit('setLoadingStatus', false);
    }
  },
  async addSymbol({commit}, newSymbol) {
    commit('setLoadingStatus', true);
    let symbolUpperCase = newSymbol.toUpperCase();
    await fetch(`https://cloud.iexapis.com/stable/stock/${symbolUpperCase}/quote?token=pk_522129a0f65e494cadb690746f899c76`, {headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => {
      if (data.symbol === symbolUpperCase) {
        let symbolData = {symbol: data.symbol, latestPrice: data.latestPrice, change: data.change};
        commit('addSymbol', symbolUpperCase);
        commit('addSymbolData', symbolData);
        commit('setSymbolNameError', "");
      }
      commit('setLoadingStatus', false);
    })
    .catch(() => {
      commit('setSymbolNameError', "Couldn't find symbol");
      commit('setLoadingStatus', false);
    });

  },
  async deleteSymbol({commit}, symbolName) {
    commit('removeSymbol', symbolName);
  },
  async removeAllSymbols({commit}) {
    commit('removeAllSymbols');
    commit('setSymbolData', [])
  }
};

export const mutations = {
  setSymbolData: (state, symbolData) => (state.symbolData = symbolData),
  addSymbol: (state, newSymbol) => {
    state.symbols.push(newSymbol);
    localStorage.setItem('symbols', JSON.stringify(state.symbols));
  },
  addSymbolData: (state,symbolData) => (state.symbolData.push(symbolData)),
  removeSymbol: (state,symbolName) => {
    state.symbols = state.symbols.filter(symbol => symbol !== symbolName);
    state.symbolData = state.symbolData.filter(data => data.symbol !== symbolName);
    localStorage.setItem('symbols', JSON.stringify(state.symbols));
  },
  removeAllSymbols: (state) => {
    state.symbols = [];
    state.symbolData = [];
    localStorage.removeItem('symbols');
  },
  setSymbolNameError: (state, newError) => (state.symbolNameError = newError),
  setSymbolServerError: (state, newError) => (state.symbolServerError = newError),
  setLoadingStatus: (state, newStatus) => (state.loadingStatus = newStatus)
};

export default {state, getters, actions, mutations}
