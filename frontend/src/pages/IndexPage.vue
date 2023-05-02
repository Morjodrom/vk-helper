<template>
  <q-page>
    <postponed-calendar v-if="isInit" class="q-pa-lg"/>
    <div v-else>
      Нужно залогиниться
    </div>
  </q-page>
</template>

<script lang="ts">
interface Window {
  vkAsyncInit: Function;
}

declare var window: Window;
</script>

<script setup lang="ts">
import PostponedCalendar from "components/PostponedCalendar.vue";
import {ref} from "vue";

const isInit = ref(false);

window.vkAsyncInit = function() {
  VK.init({
    apiId: 51632736
  });

  VK.Auth.login(async function(response) {
    if (response.session) {
      console.log('Logged in!')
      isInit.value = true;

    } else {
      alert('not authorized');
    }
  }, 1 << 13 | 1 << 18);
};

</script>
