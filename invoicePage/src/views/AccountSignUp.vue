<script setup>
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import Loader from '@/components/Loader.vue';
import router from '@/router';
import state from './state';

</script>
<template>
  <div class="wrapper">
    <div class="login" v-if="!this.loader">
      <div class="title">Зареєструйте особистий кабінет:</div>
      <Input v-model="this.name" placeholder="Freelance" label="Назва компанії" typeOfInput="text" :style="{ width: '388px' }"></Input>
      <Input v-model="this.edrpou" placeholder="00000000" label="ЄДРПОУ/ІПН" typeOfInput="text" :style="{ width: '388px' }"></Input>
      <Input  placeholder="000000" label="Оборот компанії в грн." typeOfInput="text" :style="{ width: '388px' }"></Input>
      <Input v-model="this.email" placeholder="Поштова адреса" label="example@gmail.com" typeOfInput="text" :style="{ width: '388px' }"></Input>
      <Input v-model="this.phone" placeholder="+3(80) 95 000 00000" label="Номер телефону" typeOfInput="text" :style="{ width: '388px' }"></Input>
      <Input placeholder="********" label="Пароль" typeOfInput="password" :style="{ width: '388px' }"></Input>
      <Input placeholder="********" label="Підтвердіть пароль" typeOfInput="password" :style="{ width: '388px' }"></Input>
      <Button value="Зареєструвати кабінет" @click="toSignIn"></Button>
    </div>
    <Loader v-if="this.loader"></Loader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
      name: '',
      edrpou: '',
      phone: '',
      email: ''
    };
  },
  methods: {
    toSignIn() {
      this.loader = true;
      state.company.name = this.name;
      state.company.edrpou = this.edrpou;
      state.company.phone = this.phone;
      state.company.email = this.email;
      setTimeout(() => {
        this.loader = false;
        router.push('/sign-in')
      }, 2000);
    }
  }
}
</script>

<style scoped>
  .wrapper{
    height: 650px;
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
