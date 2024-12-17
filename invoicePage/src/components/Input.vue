<script setup>
const model = defineModel()
const props = defineProps(['typeOfInput', 'label', 'text', 'placeholder', 'style'])

</script>

<template>
  <div>
    <div class="label">{{ props.label }}</div>
    <input :type="props.typeOfInput" :class="props.class" v-model="model" :placeholder="props.placeholder" :style="{ ...props.style }" />
  </div>
</template>

<style scoped>
  input{
    margin-top: 20px;
    all: unset;
    background-color: white;
    width: 100%;
    border-left: 3px solid white;
    border-radius: 4px;
    font-size: 18px;
    font-family: 'Orbitron', sans-serif;
    padding-left: 3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    height: 35px;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
  }
  input:focus {
    border-left: 3px solid rgb(0, 75, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: rgb(239, 239, 239);
  }
  .label {
    margin: 5px 0 5px 0;
    font-size: 20px;
    font-family: 'Orbitron', sans-serif;
    color: rgb(195, 195, 195);
  }
</style>
