<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
* { box-sizing: border-box; }
body { margin: 0; background: #0f0e0b; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0f0e0b; }
::-webkit-scrollbar-thumb { background: #3a3020; border-radius: 3px; }
</style>