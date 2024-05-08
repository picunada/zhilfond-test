<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import UserView from './components/UserView.vue';
import { useUserStore } from './stores/user';

const userStore = useUserStore()
</script>

<template>
  <div class="main-container">
    <div class="header">
      <h1 class="header__logo">Жилфонд</h1>
      <p class="header__section-name">Пользователь</p>
    </div>
    <div class="container">
      <Sidebar />
      <UserView :user="userStore.state.user" />
    </div>
  </div>

</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  gap: 26px;
  height: 100%;
  padding: 50px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0 1 auto;
}

.header__logo {
  font-size: 32px;
  color: #E31F24;
}

.header__section-name {
  font-size: 15px;
  color: #333333;
}

.container {
  display: grid;
  grid-template-columns: 291px 1fr;
  flex: 1 1 auto;
  width: auto;
  border-radius: 32px;
  box-shadow: 0px 0px 10px 0px #0000001A;
}

// @media screen and (max-width: 1280px) {
//   .container {
//     grid-template-columns: 1fr;
//   }
// }
</style>
