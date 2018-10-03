<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <b-alert show>Help</b-alert>
    <b-button size="lg" variant="primary">Press</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
