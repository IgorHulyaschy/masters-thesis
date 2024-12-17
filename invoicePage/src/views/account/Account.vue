<script setup>
import Button from '../../components/Button.vue'
import Payments from './parts/Payments.vue';
import Profile from './parts/Profile.vue';

</script>
<template>
  <div class="menu">
    <Button value="Профіль" :style="this.stylesMenu.but1" @click="changeBut('Profile')"></Button>
    <Button value="Платежі" :style="this.stylesMenu.but2" @click="changeBut('Payments')"></Button>
  </div>
  <div class="wrapper">
    <Payments v-if="!this.profile"/>
    <Profile v-if="this.profile"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stylesMenu: {
        on: {
          width: '200px',
          'border-bottom-left-radius': '0px', 
          'border-bottom-right-radius': '0px',
          'border-bottom': '1px solid white',
          'border': '1px solid white',
          'margin-right': '2px',
        },
        off: {
          width: '200px',
          'border-bottom-left-radius': '0px', 
          'border-bottom-right-radius': '0px',
          'background-color': 'rgb(238, 238, 238)'
        },
        but1: {
          width: '200px',
          'border-bottom-left-radius': '0px', 
          'border-bottom-right-radius': '0px',
          'border-bottom': '1px solid white',
          'border': '1px solid white',
          'margin-right': '2px'
        },
        but2: {
          width: '200px',
          'border-bottom-left-radius': '0px', 
          'border-bottom-right-radius': '0px',
          'background-color': 'rgb(238, 238, 238)'
        }
      },
      profile: true
    };
  },
  methods: {
    changeBut(type) {
      if(type === 'Profile') {
        this.stylesMenu.but2 = { ...this.stylesMenu.off };
        this.stylesMenu.but1 = { ...this.stylesMenu.on };
        this.profile = true;
      }
      if(type === 'Payments') {
        this.stylesMenu.but2 = { ...this.stylesMenu.on };
        this.stylesMenu.but1 = { ...this.stylesMenu.off };
        this.profile = false;
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 740px;
  background-color: white;
  width: 1050px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.menu {
}
.name-company {

}
</style>
