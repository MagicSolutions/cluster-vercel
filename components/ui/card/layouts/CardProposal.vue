<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  MessageSquareTextIcon,
  CircleDollarSignIcon,
  FlagIcon,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const emits = defineEmits<{
  (event: 'onSelectProposal', value: number): void
  (event: 'onViewAttached', value: any): void
}>()

const props = defineProps<{
  class?: HTMLAttributes['class']
  id: number
  rating?: number
  amount?: number
  currency?: string
  deliveryDays?: number
  selected?: boolean
  img?: string
  hasAttached?: boolean
}>()

function handleSelectProposal() {
  emits('onSelectProposal', props.id)
}
</script>

<!-- <template v-slot:before v-if="$slots.before">
  <slot name="before"></slot>
</template> -->
<template>
  <Card
    :class="
      cn(
        props.class,
        'tw-mb-2 tw-cursor-pointer proposal-card tw-relative',
        props.selected ? 'proposal-selected' : '',
      )
    "
  >
    <div @click="handleSelectProposal" class="tw-absolute tw-inset-0"></div>
    <div class="tw-p-5">
      <div class="md:tw-flex tw-mb-10">
        <div
          class="user-img tw-mb-5 md:tw-mb-0 tw-flex-auto tw-flex-shrink-0 tw-flex-grow-0 tw-rounded tw-w-20 tw-h-20 tw-bg-secondary"
        >
          <div
            :style="
              img
                ? {
                    backgroundImage: `url(${img})`,
                  }
                : {}
            "
          ></div>
        </div>
        <div class="md:tw-pl-7 tw-grow">
          <div class="md:tw-flex tw-mb-1">
            <CardTitle class="tw-font-bold tw-text-lg md:tw-text-xl">
              <slot name="name">Titulo de ejemplo</slot>
              <span class="tw-ml-3 tw-font-light tw-text-blue-500">
                <slot name="username">@titulo_de_ejemplo</slot>
              </span>
            </CardTitle>
            <div class="tw-grow"></div>
            <p class="tw-font-bold tw-text-lg md:tw-text-xl tw-mb-0">
              ${{ props.amount }} {{ currency }}
            </p>
          </div>
          <div class="tw-flex tw-flex-wrap tw-gap-3 tw-mb-1">
            <div class="tw-flex">
              <RatingIndicator
                starClass="tw-text-base tw-mr-1"
                :rating="props.rating"
              />
              <p class="tw-mb-0 tw-ml-3 tw-text-sm">
                {{ props.rating?.toFixed(1) ?? '' }}
              </p>
            </div>
            <!-- <div class="tw-flex">
              <MessageSquareTextIcon class="comment-icon tw-mr-2" :size="20" />
              <p>50</p>
            </div>
            <div class="tw-flex">
              <CircleDollarSignIcon
                class="circle-dollar-icon tw-mr-2"
                :size="20"
              />
              <p>50</p>
            </div>
            <div class="tw-flex">
              <div
                class="comment-icon tw-rounded-full tw-border-dashed tw-border-blue-500 tw-border-spacing-80 tw-border-2 tw-h-5 tw-w-5 tw-mr-2"
                :size="20"
              />
              <p>50</p>
            </div>
            <div class="tw-flex">
              <FlagIcon class="flag-icon tw-mr-2" :size="20" />
              <p>50</p>
            </div> -->
            <div class="tw-grow"></div>
            <p>En {{ props.deliveryDays }} Dia(s)</p>
          </div>
          <p class="tw-text-base tw-font-semibold">
            <slot name="subtitle">
              We are a team that is passionate about technology!
            </slot>
          </p>
        </div>
      </div>
      <p class="lg:tw-w-2/3">
        <slot name="description"></slot>
      </p>
    </div>
    <CardFooter>
      <div class="tw-flex">
        <div class="tw-flex tw-z-50 tw-text-yellow-400">
          <Button
            @click="emits('onViewAttached', props.id)"
            v-if="hasAttached"
            class="tw-mt-5"
          >
            Ver Archivos adjuntos
          </Button>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>

<style lang="css" scoped>
.proposal-card:hover,
.proposal-selected {
  @apply tw-border-primary;
  & h3 {
    @apply tw-text-primary-dark;
  }
}
.more-info {
  transform: translateX(-50%);
}
.user-img {
  box-shadow: 0px 0px 20px 0px hsla(0, 0%, 0%, 0.15);
  & > div {
    @apply tw-h-full tw-w-full tw-bg-white;
    background-size: 100% 100%;
    background-image: url('@/assets/images/login-bg.png');
  }
}
.comment-icon {
  color: hsla(40, 95%, 52%, 1);
}
.circle-dollar-icon {
  color: hsla(157, 94%, 41%, 1);
}
</style>
