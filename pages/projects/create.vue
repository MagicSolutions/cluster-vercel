<script setup lang="ts">
import { XIcon, DollarSignIcon } from 'lucide-vue-next'
import LogoGreenSVG from '@/assets/svg/logo-green-text.svg'
import ShieldDollarSVG from '@/assets/svg/shield-dollar.svg'
import FileShredderSVG from '@/assets/svg/file-shredder.svg'
import type { ProjectTag } from '~/models/interfaces/projects'
import type { NewProjectFormValue } from '~/models/interfaces/stores'
import { useCategoryStore } from '~/stores/useCategories'

interface rangePriceOptionsInterface {
  label: string
  value: string
  description: string
  category: string
  min?: number
  max?: number
}

interface createDataInterface {
  name: string
  description: string
  files?: FileList
  skills: ProjectTag[]
  searchSkills: string
  currency: string
  rangePrice: rangePriceOptionsInterface
  customPrice: number
}

definePageMeta({
  middleware: 'auth',
  layout: 'dark-bg',
})

let debounceTimeout: any = null
const projectStore = useProjectsStore()
const categoryStore = useCategoryStore()
const refForm: any = ref(null)
const step = ref<number>(0)

const categories = computed<ProjectTag[]>(() => {
  return categoryStore.categories
})

const stepsTitles: any = ref([
  {
    title: 'projects.create.pages.one.title',
    description: 'projects.create.pages.one.description',
  },
  {
    title: 'projects.create.pages.two.title',
    description: 'projects.create.pages.two.description',
  },
  {
    title: 'projects.create.pages.three.title',
    description: '',
  },
  {
    title: 'projects.create.pages.four.title',
    description: '',
  },
])
const currencyOptions = ref<string[]>(['USD', 'COP'])
const rangePriceOptions = ref<rangePriceOptionsInterface[]>([
  {
    label: 'Proyecto muy pequeño ($250 - 750 USD)',
    value: 'range_xs',
    description: 'Proyecto muy pequeño',
    category: '1',
    min: 250,
    max: 750,
  },
  {
    label: 'Proyecto pequeño ($750 - 1250 USD)',
    value: 'range_sm',
    description: 'Proyecto pequeño',
    category: '2',
    min: 750,
    max: 1250,
  },
  {
    label: 'Proyecto mediano ($1250 - 1750 USD)',
    value: 'range_md',
    description: 'Proyecto mediano',
    category: '3',
    min: 1250,
    max: 1750,
  },
  {
    label: 'Proyecto grande ($1750 - 2250 USD)',
    value: 'range_lg',
    description: 'Proyecto grande',
    category: '4',
    min: 1750,
    max: 2250,
  },
  {
    label: 'Proyecto muy grande ($2250 - 2750 USD)',
    value: 'range_xl',
    description: 'Proyecto muy grande',
    category: '5',
    min: 2250,
    max: 2750,
  },
  {
    label: 'Personalizar proyecto',
    value: 'custom',
    description: 'Personalizar proyecto',
    category: '6',
  },
])

// TODO: Reemplazar estos datos de ejemplo por datos que devuelva un endpoint de sugeridos
const suggestedSkills = ref<ProjectTag[]>([])
const ref_inputSearch = ref<HTMLInputElement | null>(null)

const projectData = reactive<createDataInterface>({
  name: '',
  description: '',
  files: undefined,
  skills: [],
  searchSkills: '',
  currency: 'USD',
  rangePrice: {
    label: 'Proyecto muy pequeño ($250 - 750 USD)',
    value: 'range_xs',
    description: 'Proyecto muy pequeño',
    category: '1',
    min: 250,
    max: 750,
  },
  customPrice: 0,
})

onMounted(() => {
  categoryStore.get(1)
})

async function create() {
  try {
    const validateForm = await refForm.value.validate()
    if (!validateForm) return
    const dataToSend: NewProjectFormValue = {
      es: {
        title: projectData.name,
        slug: projectData.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: projectData.description,
      },
      min_price:
        (projectData.rangePrice.value === 'custom'
          ? projectData.customPrice
          : projectData.rangePrice.min) ?? 0,
      max_price:
        (projectData.rangePrice.value === 'custom'
          ? projectData.customPrice
          : projectData.rangePrice.max) ?? 0,
      categories: projectData.skills.map((skill) => skill.id),
      options: {
        currency: projectData.currency,
      },
    }
    if (projectData.files && projectData.files.length > 0) {
      dataToSend.files = projectData.files
    }
    projectStore
      .create(dataToSend)
      .then((data) => {})
      .catch((error) => {
        console.error(error)
      })
  } catch (erro) {
    console.log(erro)
  }
}

function handleRemoveSkill(index: number) {
  projectData.skills.splice(index, 1)
}
function handleAddSkill(skill: ProjectTag) {
  if (projectData.skills.findIndex((s) => s.id === skill.id) >= 0) return
  projectData.skills.push(skill)
}
function handleChangeStep(next_or_prev: number) {
  let new_step = step.value + next_or_prev

  if (new_step <= 3 && new_step >= 0) step.value = new_step
  else if (new_step > 3 && refForm.value) {
    create()
  }
}

function handleEndWrite() {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    searchCategories(projectData.searchSkills)
  }, 500) // 500 ms de espera
}
function searchCategories(query?: string) {
  categoryStore.setFilters({ search: query })
  categoryStore.get(1)
}
</script>

<template>
  <div class="lg:tw-w-2/3 xl:tw-w-7/12 tw-px-6 sm:tw-px-12">
    <div class="tw-flex tw-flex-col tw-items-center">
      <div class="tw-mb-8">
        <NuxtLink to="/">
          <LogoGreenSVG filled class="tw-text-[10rem] !tw-h-auto" />
        </NuxtLink>
      </div>
      <h1
        v-if="stepsTitles[step].title"
        class="tw-text-3xl lg:tw-text-[35px] xl:tw-text-5xl tw-font-extralight tw-text-white tw-mb-6 lg:tw-mb-8"
      >
        {{ Helper.tLang(stepsTitles[step].title) }}
      </h1>
      <p
        v-if="stepsTitles[step].description"
        class="h2 tw-text-white tw-w-4/6 tw-text-center tw-mb-10 tw-text-[14px] tw-font-extralight"
      >
        {{ Helper.tLang(stepsTitles[step].description) }}
      </p>
      <div class="tw-w-full tw-flex-1">
        <div class="tw-relative">
          <q-form @submit.prevent="create" ref="refForm">
            <div class="step-container step-0" :class="`show-${step}`">
              <p class="input-details">
                {{ Helper.tLang('projects.create.form.name.label') }}
              </p>
              <InputCPA
                id="input_uno"
                filled
                dark
                rounded
                class="tw-mb-3"
                v-model="projectData.name"
                :label="Helper.tLang('projects.create.form.name.placeholder')"
              ></InputCPA>
              <p class="input-details">
                {{ Helper.tLang('projects.create.form.description.label') }}
              </p>
              <Textarea
                :placeholder="
                  Helper.tLang('projects.create.form.description.placeholder')
                "
                v-model="projectData.description"
                dark
                class="tw-h-28"
              ></Textarea>
              <div class="tw-flex tw-justify-end tw-mb-2">
                <Button
                  @click="projectData.description = ''"
                  type="button"
                  variant="ghost"
                  class="tw-text-white hover:tw-text-white hover:tw-underline"
                >
                  {{
                    Helper.tLang('projects.create.form.description.clearBtn')
                  }}
                </Button>
              </div>
              <Dropzone v-model="projectData.files" dark>
                <template v-slot:title>
                  <p class="tw-text-base tw-mb-5">
                    {{
                      projectData.files
                        ? Helper.tLang('projects.create.form.files.empty.title')
                        : Helper.tLang('projects.create.form.files.loadedMsg')
                    }}
                  </p>
                </template>
                <template v-slot:subtitle>
                  <p
                    v-if="projectData.files"
                    class="tw-text-white tw-text-xs tw-text-center"
                  >
                    <span
                      class="tw-mr-2"
                      v-for="(file, index) in projectData.files"
                      :key="index"
                    >
                      {{ file.name }}
                    </span>
                  </p>
                  <p v-else class="tw-text-white tw-text-xs tw-text-center">
                    {{
                      Helper.tLang(
                        'projects.create.form.files.empty.description',
                      )
                    }}
                  </p>
                </template>
              </Dropzone>
            </div>

            <div class="step-container step-1" :class="`show-${step}`">
              <p class="input-details">
                {{ Helper.tLang('projects.create.form.skills.label') }}
              </p>
              <div
                class="tw-bg-input tw-rounded-2xl tw-px-4 tw-pt-3 tw-relative"
              >
                <ul
                  @click="
                    (event: MouseEvent) => {
                      if (event.target === event.currentTarget)
                        ref_inputSearch?.focus()
                    }
                  "
                  class="tw-min-h-28 tw-flex tw-flex-wrap"
                >
                  <li
                    v-for="(item, index) in projectData.skills"
                    :key="`skill_${item.id}`"
                    class="tw-border tw-border-primary tw-rounded-md tw-flex tw-px-5 tw-py-1 tw-h-min tw-mr-2 tw-mb-1"
                  >
                    <p
                      class="tw-mb-0 tw-text-sm tw-text-white tw-leading-loose"
                    >
                      {{ item.title }}
                    </p>
                    <Button
                      size="xs"
                      type="button"
                      variant="ghost"
                      class="hover:tw-bg-transparent !tw-pr-0"
                    >
                      <XIcon
                        @click="handleRemoveSkill(index)"
                        class="tw-text-primary tw-text-xs"
                        :size="20"
                      />
                    </Button>
                  </li>
                </ul>
                <input
                  ref="ref_inputSearch"
                  @input="handleEndWrite"
                  class="skills-input hover:tw-cursor-pointer"
                  :placeholder="
                    Helper.tLang('projects.create.form.skills.placeholder')
                  "
                  v-model="projectData.searchSkills"
                />

                <div class="option-skill-list">
                  <ul class="">
                    <li v-for="item in categories" :key="`category_${item.id}`">
                      <Button
                        @click="handleAddSkill(item)"
                        variant="ghost"
                        type="button"
                        class="hover:tw-bg-transparent tw-w-full !tw-justify-start"
                      >
                        {{ item.title }}
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <p class="tw-mt-4 tw-text-white tw-w-10/12 tw-m-auto tw-text-xs">
                {{ Helper.tLang('projects.create.form.skills.suggested') }}

                <span
                  v-for="(item, index) in suggestedSkills"
                  :key="`suggested_skills_${index}`"
                  @click="handleAddSkill(item)"
                  class="tw-text-primary hover:tw-underline tw-cursor-pointer"
                >
                  {{ item.title
                  }}{{ index === suggestedSkills.length - 1 ? '.' : ', ' }}
                </span>
              </p>
            </div>

            <div class="step-container step-2 tw-mt-5" :class="`show-${step}`">
              <div class="info-extra">
                <div class="tw-text-primary">
                  <ShieldDollarSVG filled class="tw-text-8xl" />
                </div>
                <div class="tw-text-white tw-ml-8 lg:tw-w-2/5">
                  <h3 class="tw-mb-2 tw-text-lg tw-font-extrabold">
                    {{
                      Helper.tLang('projects.create.form.prices.details.title')
                    }}
                  </h3>
                  <p class="tw-font-extralight tw-text-xs">
                    {{
                      Helper.tLang(
                        'projects.create.form.prices.details.description',
                      )
                    }}
                  </p>
                </div>
              </div>
              <p class="input-details">
                {{ Helper.tLang('projects.create.form.prices.label') }}
              </p>
              <div class="tw-flex">
                <div
                  class="tw-basis-1/3 sm:tw-basis-1/5 lg:tw-basis-2/12 tw-flex tw-items-end"
                >
                  <Select
                    class="tw-w-full"
                    center
                    dark
                    v-model="projectData.currency"
                    :options="currencyOptions"
                  />
                </div>
                <div
                  class="tw-grow tw-pl-5 lg:tw-pl-10 tw-flex tw-flex-col tw-items-end"
                >
                  <Select
                    class="tw-w-full"
                    dark
                    v-model="projectData.rangePrice"
                    :options="rangePriceOptions"
                  />
                  <InputCPA
                    v-if="projectData.rangePrice.value === 'custom'"
                    dark
                    rounded
                    type="number"
                    v-model="projectData.customPrice"
                    filled
                    class="tw-w-full"
                  >
                    <template v-slot:prepend>
                      <DollarSignIcon class="!tw-text-primary" />
                    </template>
                  </InputCPA>
                </div>
              </div>
            </div>

            <div class="step-container step-3 tw-mt-5" :class="`show-${step}`">
              <div class="info-extra">
                <div class="tw-text-primary">
                  <FileShredderSVG filled class="tw-text-8xl" />
                </div>
                <div class="tw-text-white tw-ml-8">
                  <p class="tw-text-sm">
                    {{ Helper.tLang('projects.singular') }}
                    <span class="tw-text-primary">
                      "{{ projectData.name }}"
                    </span>
                  </p>
                  <p class="tw-font-extrabold tw-text-sm">
                    (${{ projectData.rangePrice.min }} - ${{
                      projectData.rangePrice.min
                    }})
                  </p>
                </div>
              </div>
              <p class="input-details">
                {{ Helper.tLang('projects.create.form.final.label') }}
              </p>
              <div
                class="tw-bg-input tw-rounded-2xl tw-p-6 tw-relative tw-min-h-44"
              >
                <p class="tw-text-white tw-mb-10">
                  {{ projectData.description }}
                </p>
                <ul class="tw-flex tw-flex-wrap">
                  <li
                    v-for="(item, index) in projectData.skills"
                    :key="`skill_${index}`"
                    class="tw-border tw-border-primary tw-rounded-md tw-flex tw-px-5 tw-py-1 tw-h-min tw-mr-2 tw-mb-1"
                  >
                    <p
                      class="tw-mb-0 tw-text-sm tw-text-white tw-leading-loose"
                    >
                      {{ item.title }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tw-w-4/6 tw-mx-auto tw-flex">
              <Button
                v-if="step > 0"
                @click="handleChangeStep(-1)"
                type="button"
                variant="secondary"
                class="hero tw-mt-8 tw-tracking-wide tw-w-full tw-font-semibold tw-py-4 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-1 !tw-text-primary"
              >
                <span class="tw-ml-3">
                  {{ Helper.tLang('projects.create.form.buttons.back') }}
                </span>
              </Button>
              <Button
                @click="handleChangeStep(1)"
                type="button"
                class="hero tw-mt-8 tw-tracking-wide tw-w-full tw-font-semibold tw-py-4 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-mx-1"
              >
                <span class="tw-ml-3">
                  {{
                    Helper.tLang(
                      step < 3
                        ? 'projects.create.form.buttons.next'
                        : 'projects.create.form.buttons.submit',
                    )
                  }}
                </span>
              </Button>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  transition: all 1s ease;
  view-transition-name: article-thumb;
}
/* 
.step-0,
.step-1,
.step-2,
.step-3{
  @apply tw-max-h-0 tw-overflow-hidden tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bg-secondary;
  transition: all 1s ;
}
.step-0.show-0,
.step-1.show-1,
.step-2.show-2,
.step-3.show-3{
  @apply tw-max-h-svh
} */

.step-0,
.step-1,
.step-2,
.step-3 {
  @apply tw-hidden;
  transition: opacity 0.5s;
}
.step-0.show-0,
.step-1.show-1,
.step-2.show-2,
.step-3.show-3 {
  @apply tw-block;
}

.info-extra {
  @apply tw-border tw-border-primary tw-flex tw-justify-center tw-items-center tw-rounded-2xl tw-min-h-20 tw-p-5 lg:tw-p-10 tw-mb-10;
}
.input-details {
  @apply tw-text-white tw-font-bold tw-mb-4;
}

.option-skill-list {
  @apply tw-absolute tw-top-full tw-left-0 tw-right-0 tw-bg-white tw-rounded-b-2xl tw-rounded-t-sm tw-z-50;
  ul {
    @apply tw-max-h-0  tw-overflow-y-scroll;
    transition: max-height 1s;
    li {
      @apply tw-p-2 tw-rounded-xl tw-mb-1 tw-cursor-pointer;
      transition: background 0.3s;
      &:hover {
        @apply tw-bg-input tw-text-primary;
      }
    }
  }
}

.skills-input {
  @apply tw-bg-input tw-w-full tw-text-white tw-border-none tw-py-4 tw-px-2 tw-rounded-2xl;
  &:focus {
    @apply tw-border-none tw-outline-none;
  }
}
.skills-input:focus ~ .option-skill-list {
  @apply tw-pb-1;
}
.skills-input:focus ~ .option-skill-list ul {
  @apply tw-max-h-40;
}
</style>
