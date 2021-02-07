<template>
  <div>
    <button @click.prevent='removeSymbols' id='settings-removeSymbolsBtn'>Remove All Symbols</button>
    <p id='settings-warning'>{{ deleteMsg }}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'RemoveSymbolsBtn',
  data () {
    return {
      deleteMsg: "Warning: This can not be undone"
    }
  },
  methods: {
    ...mapActions(["removeAllSymbols", "getSymbolData"]),
    removeSymbols() {
      this.removeAllSymbols();
      this.deleteMsg = "All symbols have been deleted"
    }
  }
}
</script>

<style>
#settings-removeSymbolsBtn {
  background-color: var(--primaryRed);
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
  color: var(--primaryWhite);
  cursor: pointer;
  font-weight: bold;
  margin-top: 32px;
  padding: 8px 32px;
}

#settings-removeSymbolsBtn:hover {background-color: var(--secondaryRed);}

#settings-warning {
  color: var(--primaryRed);
  font-weight: 900;
}
</style>
