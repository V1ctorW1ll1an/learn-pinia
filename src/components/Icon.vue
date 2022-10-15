<template>
  <i class="material-icons">{{ icon }}</i>
</template>

<script lang="ts">
export default {
  name: "Icons",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
