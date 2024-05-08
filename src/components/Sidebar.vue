<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from '../utils/debounce';
import { User } from '../types/user';
import { useUserStore } from '../stores/user';

const search = ref('');
const users = ref<User[]>([]);
const loading = ref<boolean>(false)
const error = ref<number | undefined>()

const userStore = useUserStore();

const update = debounce(async () => {
  if (search.value.length === 0) {
    users.value = [];
    loading.value = false;
    return;
  }

  const recs = search.value.split(',')

  const queryIds = recs.filter((rec: string) => parseInt(rec)).map((rec: string) => {
    return `id=${rec.trim()}`
  }).join('&')

  const queryNames = recs.filter((rec: string) => !parseInt(rec)).map((rec: string) => {
    if (rec.trim().length > 0) return `name_like=${rec.trim()}`
  }).join('&')

  const resIds = queryIds.length > 0 ? await fetch(`https://jsonplaceholder.typicode.com/users?${queryIds}`).then(async (res) => {
    if (res.ok) {
      return await res.json() as User[]
    } else {
      error.value = res.status
    }
  }) : null

  const resNames = queryNames.length > 0 ? await fetch(`https://jsonplaceholder.typicode.com/users?${queryNames}`).then(async (res) => {
    if (res.ok) {
      return await res.json() as User[]
    } else {
      error.value = res.status
    }
  }) : null

  if (resIds && resNames) {
    users.value = [...resIds, ...resNames]
  } else if (resIds) {
    users.value = resIds
  } else if (resNames) {
    users.value = resNames
  }


  loading.value = false;
}, 500)

watch(search, () => {
  loading.value = true
  update();
})
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__content">
      <div class="search">
        <p class="search__heading">Поиск сотрудников</p>
        <input type="text" v-model="search" class="search__input" placeholder="Введите ID или имя"
          @keydown="(e) => { if (e.key === 'Backspace') userStore.dispatch('setUser', null) }">
      </div>
      <div class="result">
        <p class="result__heading">Результаты</p>
        <p v-if="loading">Поиск...</p>
        <p v-else-if="error">Ошибка запроса</p>
        <p v-else-if="users.length === 0 && search.length === 0">начните поиск</p>
        <p v-else-if="users.length === 0">ничего не найдено</p>
        <div v-else class="result__list">
          <div v-for=" user  in  users " :key="user.id" class="result__item"
            @click="() => userStore.dispatch('setUser', user)">
            <div class="user__avatar"></div>
            <div class="user__info"
              :class="userStore.state.user && userStore.state.user.id === user.id ? 'user__info--active' : ''">
              <p class="user__name">{{ user.name }}</p>
              <p class="user__email">{{ user.email }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  display: block;
  border-right: 1px solid #DEDEDD;
  background-color: #FDFDFD;
}

// @media screen and (max-width: 1280px) {
//   .sidebar {
//     display: none;
//   }
// }

.sidebar__content {
  padding: 27px 20px;
  display: flex;
  flex-direction: column;
  gap: 22px
}

.search {
  display: flex;
  flex-direction: column;
  gap: 22px;

  &__heading {
    color: black;
    font-size: 16px;
    font-weight: 600;
  }

  &__input {
    padding: 16px 24px;
    width: 240px;
    background-color: #FFF;
    border: 1.5px solid #E9ECEF;
    border-radius: 8px;
  }
}

.result {
  display: flex;
  flex-direction: column;
  gap: 18px;

  &__heading {
    color: black;
    font-size: 16px;
    font-weight: 600;
  }
}



.result__list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.result__item {
  width: 240px;
  display: grid;
  grid-template-columns: 70px 1fr;
  border-radius: 10px;
  border: 1px solid #E0E0E0;
  overflow: hidden;
  box-shadow: 0px 0px 10px #0000001A;
  transition: outline 0.15s ease-in-out;
  outline: 0px solid transparent;

  &:hover {
    outline: 2px solid #E0E0E0;
  }


  * {
    cursor: pointer;
  }

  .user__avatar {
    width: 70px;
    height: 70px;
    border-right: 1px solid #E0E0E0;
    // Image: image;
    background: url("/src/assets/image.png");
    background-size: cover;
    background-position: center;
  }

  .user__info {
    font-size: 14px;
    padding: 15px 0px 0px 15px;
    transition: background-color 0.15s ease-in-out;
    overflow: hidden;


    .user__name {
      font-weight: 600;
      color: black;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user__email {
      max-width: fit-content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--active {
      background-color: #E0E0E0;
    }
  }


}
</style>
