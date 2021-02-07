<template>
  <div id="nav">
    <img src='@/assets/logo.png' id="nav-img" alt='An arrow trending upwards beside the words Stock Tracker'/>
    <div id='nav-links'>
      <router-link to="/">Tracker</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
  </div>
</template>

<style>
#nav {
  align-items: center;
  background-color: var(--primaryBlack);
  box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
  color: var(--primaryWhite);
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 32px;
  width: calc(100% - 64px);
}

#nav a {
  color: var(--primaryWhite);
  font-weight: 300;
  text-decoration: none;
}

#nav a.router-link-exact-active {font-weight: 900;}

#nav-img {height: 26px;}
</style>
