<template>
  <div>
    <p>my</p>
  </div>
</template>

<script>
export default {
  name: 'myPage'
}
</script>
<script setup>
import { useTagStore } from '@/stores/tag';
const tag = useTagStore()
tag.tag_value = 3
</script>

<style></style>
