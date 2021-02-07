<template>
  <div id="app">
    <div v-if="getLoadingStatus" id='loadingScreen'>
      <img src='@/assets/spinner.svg' alt='Spinning loading indicator' />
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  computed: mapGetters(['getLoadingStatus'])
};
</script>

<style>
:root {
 --primaryWhite: #F7F7F8;
 --primaryBlack: #6A6A6A;
 --primaryGreen: #86C695;
 --secondaryGreen: #477953;
 --primaryRed: #C68686;
 --secondaryRed: #864343;
}

body {
  background-color: var(--primaryWhite);
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#loadingScreen {
  background-color: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

#loadingScreen img {
  width: 100px;
  height: auto;
}
</style>
