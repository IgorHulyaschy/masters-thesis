<script setup>
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import Loader from '@/components/Loader.vue';
import router from '@/router';

</script>
<template>
  <div class="wrapper">
    <div class="login" v-if="!this.loader">
      <div class="title">Авторизуйтесь:</div>
      <Input placeholder="00000000" label="Поштова адреса/ЄДРПОУ/Номер телефону" typeOfInput="text" :style="{ width: '388px' }"></Input>
      <Input placeholder="********" label="Пароль" typeOfInput="password" :style="{ width: '388px' }"></Input>
      <Button value="Увійти в кабінет" @click="pushToAccount"></Button>
    </div>
    <Loader v-if="this.loader"></Loader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: false
    };
  },
  methods: {
    pushToAccount() {
      this.loader = true
      setTimeout(() => {
        this.loader = false;
        router.push('/account')
      }, 1000);
    }
  }
}
</script>

<style scoped>
  .wrapper{
    height: 400px;
    background-color: white;
    width: 440px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .login {
    width: 400px;
  }
  .title {
    font-size: 22px;
    margin-bottom: 20px;
  }
</style>