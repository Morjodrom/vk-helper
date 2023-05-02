<style lang="scss">
.postponed-calendar {
  &__card {
    overflow: hidden;
    width: 100%;
    max-width: 700px;
    height: 100%;
  }

  &__img {
    display: block;
    max-width: 200px;
    max-height: 500px;
  }
}
</style>

<template>
  <div class="postponed-calendar">
    <div class="text-h3">Календарь</div>
    <pre v-if="errors">
      {{errors}}
    </pre>
    <div v-for="[date, items] in itemsGroupedByDate">
      <div class="text-h2 q-mt-xl">{{date}}</div>
      <div class="row q-col-gutter-md items-stretch">
        <div class="col" v-for="item of items">
          <q-card class="postponed-calendar__card">
            <q-card-section horizontal>
              <q-card-section>
                <div class="text-positive">{{item.date.toLocaleTimeString()}}</div>
                <div>{{item.text.substring(0, 100)}}</div>
                <a class="block" :href="item.link" target="_blank">Перейти</a>
                <q-icon class="q-mt-lg"
                        v-if="item.isPaid"
                        name="shopping_cart" color="positive" size="lg"/>
                <q-icon class="q-mt-lg"
                        v-if="item.isArt"
                        name="favorite" color="red" size="lg"/>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <img class="postponed-calendar__img" :src="item.previewImg" alt="">
              </q-card-section>
            </q-card-section>
          </q-card>

        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PostponedCalendar"
}

</script>

<script setup lang="ts">
// Получение списка отложенных записей группы
import ApiParams = vk.OpenAPI.Api.ApiParams;
// import wallEntriesPostponed from '../samples/WallEntriesPostponed.json'
import {WallItem} from "src/lib/WallItem";
import {computed, ref} from 'vue';

const errors = ref('');
function getDelayedPosts(groupId: number) {
  return new Promise((resolve: (entriesResponse: WallGetItemsResponse) => void, reject) => {
    let params: ApiParams = {
      owner_id: -groupId,
      filter: 'postponed',
      v: '5.130'
    };
    VK.Api.call('wall.get', params, (response) => {
      console.log('response', response)
      if (response && response.response) {
        resolve(response.response);
      } else {
        console.error(response);
        errors.value = response.error_msg;
        reject(new Error('Failed to get delayed posts'));
      }
    });
  })
   .then((entriesResponse: WallGetItemsResponse) => entriesResponse.items.map(WallItem.createFromRaw));
}

const items: {value: WallItem[]} | WallItem[] = ref([]);

getDelayedPosts(218089737)
  .then((wallItems: WallItem[]) => {
    items.value = wallItems;
    return wallItems as any;
  });

const itemsGroupedByDate = computed(function(){
  return items.value.reduce((acc, item) => {
    let key: any = item.date.toLocaleDateString();
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(item);

    return acc;

  }, new Map())
});

</script>

<style scoped>

</style>
