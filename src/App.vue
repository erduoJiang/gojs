<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/G6">G6</router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less"></style>
