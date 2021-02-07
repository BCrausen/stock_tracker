<template>
  <div id='symbolContainer'>
      <SymbolObject
        :key="symbol.symbol"
        v-for="symbol in allSymbolData"
        :symbol="symbol.symbol"
        :price="symbol.latestPrice"
        :change="symbol.change"
      />
      <p id="symbolContainer-error">{{ getSymbolServerError }}</p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import SymbolObject from '@/components/SymbolObject';

export default {
  name: 'SymbolContainer',
  components: {
    SymbolObject
  },
  methods: {
    ...mapActions(['getSymbolData'])
  },
  computed: mapGetters(['allSymbolData', 'getSymbolServerError']),
  created() {this.getSymbolData();}
};
</script>

<style>
#symbolContainer {
  flex-wrap: wrap;
  margin-left: 5%;
  text-align: center;
  width: 90%;
  padding-bottom: 16px;
}

#symbolContainer-error {color: var(--primaryRed);}
</style>
