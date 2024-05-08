<script setup lang="ts">
import { User } from '../types/user';
import { defineProps } from 'vue';

const props = defineProps<{
  user?: User | null,
}>()

</script>

<template>
  <div class="user-profile-content">
    <div class="user-profile-content__user" v-if="props.user">
      <div class="user-profile-content__user-photo">

      </div>
      <div class="user-profile-content__user-info">
        <div class="user-profile-content__info-container">
          <p class="user-profile-content__user-name">{{ user?.name }}</p>
          <div class="user-profile-content__info-item">
            <p>email:</p>
            <p>{{ user?.email }}</p>
          </div>
          <div class="user-profile-content__info-item">
            <p>phone:</p>
            <p>{{ user?.phone }}</p>
          </div>
          <div>
            <p class="user-profile-content__about-header">О себе:</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.</p>
          </div>
        </div>

      </div>
    </div>
    <div class="user-profile-content__empty" v-else>
      <p>Выберите сотрудника, чтобы посмотреть его профиль</p>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.user-profile-content {
  width: 100%;
  height: 100%;
  padding: 30px 21px;

  &__user {
    display: grid;
    grid-template-columns: minmax(200px, 400px) 1fr;
    gap: 61px
  }

  &__user-photo {
    width: 100%;
    height: 100%;
    background: url("/src/assets/image.png");
    background-size: cover;
    background-position: center;
    border: 1px solid #e0e0e0
  }

  @media screen and (max-width: 1280px) {
    &__user {
      grid-template-columns: auto;
    }

    &__user-photo {
      height: 200px;
    }
  }

  &__user-info {
    width: 100%;
    height: 100%;
  }

  &__info-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }


  &__user-name {
    font-size: 16px;
    font-weight: 600;
    color: black;
  }

  &__about-header {
    font-size: 16px;
    font-weight: 600;
    color: black;
    margin-bottom: 25px;
  }

  &__info-item {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 16px;
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
