<script setup lang="ts">
import { CompassIcon } from 'lucide-vue-next'

const search = ref('')
function handleSearch() {
  Helper.redirectTo(`/projects?search=${search.value}`)
}
</script>

<template>
  <div class="search-project-bg tw-bg-black">
    <div class="tw-container tw-flex tw-justify-center tw-py-16">
      <div class="lg:tw-basis-3/6">
        <h3
          class="tw-font-light tw-text-white tw-text-center tw-text-2xl sm:tw-text-3xl md:tw-text-[30px] tw-mb-14"
        >
          ¿Qué estás buscando?
        </h3>
        <q-form @submit.prevent.stop="handleSearch">
          <InputCPA
            outlined
            dark
            rounded
            class="input-custom-outline tw-text-xs md:tw-text-base tw-mb-3 search-input-border"
            v-model="search"
            label="Explorar proyectos de..."
          >
            <template v-slot:prepend>
              <CompassIcon class="!tw-text-primary" />
            </template>
          </InputCPA>
        </q-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-project-bg {
  background-image: url('@/assets/images/search-project-bg.png');
  background-size: 110% 100%;
  background-position: center center;
}
:deep(.q-field__control) {
  @apply !tw-border-primary !tw-border;
}
</style>
