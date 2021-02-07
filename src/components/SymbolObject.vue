<template>
  <div class="symbolObject" v-bind:class="[change >= 0 ? 'symbolObject-positive' : 'symbolObject-negative']">
    <div class='symbolObject-ticker'>
      <img @click.prevent='submitDeleteSymbol' src='@/assets/remove_circle.svg' alt='The delete button, a circle with a minus in the middle'/>
      <p v-if="symbol">{{ symbol }}</p>
      <p v-else>?</p>
    </div>
    <div class='symbolObject-priceInfo'>
      <strong v-if="price">${{ price }}</strong>
      <strong v-else>Unavaliable</strong>
      <span v-if="change">({{ change }})</span>
      <span v-else>(Unavaliable)</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

  export default {
    name: "SymbolObject",
    props: ['symbol', 'price', 'change'],
    methods: {
      ...mapActions(["deleteSymbol", "getSymbolData"]),
      submitDeleteSymbol() {
        this.deleteSymbol(this.symbol);
      }
    }
  };
</script>

<style>
  .symbolObject {
    align-items: center;
    border-radius: 5px;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
    color: var(--primaryWhite);
    display: inline-flex;
    height: 70px;
    justify-content: space-between;
    margin: 8px;
    padding: 16px;
    width: 220px;
  }

  .symbolObject-positive {background-color: var(--primaryGreen);}

  .symbolObject-negative {background-color: var(--primaryRed);}

  .symbolObject-ticker {display: flex;}

  .symbolObject-ticker p {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    margin-left: 4px;
  }

  .symbolObject-priceInfo {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
</style>
