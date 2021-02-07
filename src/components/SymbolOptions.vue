<template>
  <div id='symbolOptions'>
    <button @click.prevent='refreshTracker' id='symbolOptions-refreshBtn'>
      <img src='@/assets/refresh.png' />
      Refresh Tracker
    </button>
    <div id='symbolOptions-addSymbol'>
      <span>{{ getSymbolNameError}}</span>
      <input @input.prevent='clearSymbolError' type='text' v-model='symbol' name='symbol' v-bind:class="{'input-error' : symbolInputError}" />
      <button @click.prevent='submitSymbol'>Add Symbol</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'SymbolOptions',
  data() {
    return {
      symbol: "",
      symbolInputError: false
    }
  },
  methods: {
    ...mapActions(["addSymbol", "getSymbolData"]),
    submitSymbol() {
      if (this.symbol === "") {
        this.symbolInputError = true;
      }
      else {
        this.addSymbol(this.symbol);
        this.symbol = "";
      }
    },
    clearSymbolError() {this.symbolInputError = false},
    refreshTracker() {this.getSymbolData();}
  },
  computed: mapGetters(['getSymbolNameError']),
};
</script>


<style>
  #symbolOptions {
    display: flex;
    justify-content: space-between;
    margin: 16px 0 16px 5%;
    padding: 16px;
    width: 90%;
  }

  #symbolOptions-refreshBtn {
    background-color: var(--primaryGreen);
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    color: var(--primaryWhite);
    cursor: pointer;
    font-weight: bold;
    padding: 8px 32px;
  }

  #symbolOptions-refreshBtn img {
    height: 10px;
    width: auto;
  }

  #symbolOptions-addSymbol button {
    background-color: var(--primaryGreen);
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    color: var(--primaryWhite);
    cursor: pointer;
    font-weight: bold;
    padding: 8px 32px;
  }

  #symbolOptions-addSymbol button:hover {background-color: var(--secondaryGreen);}

  #symbolOptions-addSymbol input {
    background-color: #FDFDFD;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    height: 30px;
    margin: 0 8px;
    width: 200px;
  }

  #symbolOptions-addSymbol span {color: var(--primaryRed);}

  .input-error {
    border: 2px solid var(--primaryRed) !important;
  }
</style>
