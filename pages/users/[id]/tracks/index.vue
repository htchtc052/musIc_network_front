<script lang="ts" setup>
import {type Track} from "~/types/types";

const userProfile = await useGetUserProfile();

const route = useRoute();

const id: number = +route.params.id;

const api = useClientApi();

const {
  data: tracksData,
  error,
  pending,
} = await useLazyAsyncData<Track[]>("user.tracks", () => api.userProfile.getUserTracks(id));


const tracks: ComputedRef<Track[] | undefined> = computed(() => {
  return tracksData.value?.map(track => {
        let n = 0;
        return {
          ...track,
          position: n++,
          class: 'border-b border-gray-300 hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
        }
      }
  );
});

const columns = [
  {key: 'position'},
  {key: 'play'},
  {key: 'title', label: 'Title'},
  {key: 'duration', label: 'Duration'}, {key: 'actions'}
]
const trackActions = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]


</script>
<template>
  <UContainer class="py-4">
    <UserMenu :userProfile="userProfile"/>
  </UContainer>
  <UContainer>
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          User tracks
        </h3>
      </template>
      <UTable :columns="columns" :rows="tracks" :loading="pending"
              :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No tracks.' }"
      >

        <template #position-data="{index}">
          {{ index+1 }}
        </template>

        <template #play-data="{row}">
          <UButton variant="solid" size="xs" class="bg-primary-600">
            <UIcon name="i-heroicons-play-solid" />
          </UButton>
        </template>
        <template #title-data="{ row }">
          {{ row.title }}
        </template>

        <template #duration-header="{ column, sort }">
          <UIcon name="i-heroicons-clock"/>
        </template>

        <template #duration-data="{ row }">
          05:35
        </template>

        <template #actions-data="{ row }">
          <div class="flex justify-end gap-x-1.5">
            <UButton variant="solid" size="xs">
              <UIcon name="i-heroicons-pencil-square"/>
              Edit
            </UButton>
            <UButton variant="outline" size="xs" color="red">
              <UIcon name="i-heroicons-trash"/>
              Delete
            </UButton>
          </div>
          <!--       <UDropdown :items="trackActions(row)">
                      <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid"/>
                    </UDropdown>-->
        </template>
      </UTable>
    </UCard>

    <!--    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          User tracks
        </h3>
      </template>

      <div class="flex">
        <div class="p-2 w-8 flex-shrink-0"></div>
        <div class="p-2 w-full text-gray-800 dark-text-gray-200">Title</div>
        <div class="p-2 w-12 flex-shrink-0 text-gray-700">
          <UIcon name="i-heroicons-clock" />
        </div>
        <div class="p-2 w-14 flex-shrink-0"></div>
      </div>

      <div
        v-for="(track, index) in tracks"
        :key="track.id"
        class="flex border-b border-gray-300 hover:bg-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
      >
        <div class="p-4 w-8 flex-shrink-0">
          <UIcon name="i-heroicons-play-solid" />
        </div>
        <div class="p-4 w-full">{{ track.title }}</div>
        <div class="p-4 w-12 flex-shrink-0">5:35</div>
        <div class="p-4 w-16 flex-shrink-0 text-right">
          <UIcon name="i-heroicons-pencil-square" />
          <UIcon name="i-heroicons-trash" />
        </div>
      </div>
    </UCard>-->
  </UContainer>
</template>

<style scoped></style>
