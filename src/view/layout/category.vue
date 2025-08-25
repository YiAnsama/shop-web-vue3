<template>
  <div>
    <p>category</p>
  </div>
</template>

<script>
export default {
  name: 'categoryPage'
}
</script>
<script setup>
import { useTagStore } from '@/stores/tag';
const tag = useTagStore()
tag.tag_value = 1
</script>

<style></style>
