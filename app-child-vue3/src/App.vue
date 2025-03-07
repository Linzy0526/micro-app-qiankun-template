<!-- App.vue -->
<template>
    <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>