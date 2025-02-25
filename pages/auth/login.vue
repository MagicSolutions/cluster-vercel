<script setup lang="ts">
import LogoGreenSVG from '@/assets/svg/logo-green-text.svg'
import { reactive, ref } from 'vue'
import { MailIcon, KeySquareIcon } from 'lucide-vue-next'
import PasswordValidator from '@/utils/validators/passwordValidator'

const refLogin: any = ref(null)
const isPwd = ref(true)
const store = useAuthStore()
definePageMeta({
  // middleware: 'auth',
  layout: 'dark-bg',
})
const auth = reactive<{
  username: string
  password: string
  remember_me: boolean
}>({
  username: '',
  password: '',
  remember_me: false,
})
const loading = computed(() => store.loading)

onMounted(() => {
  if (store.username) auth.username = store.username
  if (store.password) auth.password = store.password
})

async function login() {
  try {
    const validateLogin = await refLogin.value.validate()
    if (!validateLogin) return
    await store.login(auth)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="lg:tw-w-1/2 xl:tw-w-5/12 tw-p-6 sm:tw-p-12">
    <div class="tw-mt-12 tw-flex tw-flex-col tw-items-center">
      <NuxtLink to="/">
        <LogoGreenSVG filled class="tw-text-[10rem] !tw-h-auto" />
      </NuxtLink>
      <h1
        class="tw-text-[35px] xl:tw-text-[50px] tw-font-extralight tw-text-white tw-mb-4"
      >
        {{ Helper.tLang('auth.login.title') }}
      </h1>
      <p class="tw-text-primary tw-mb-14 tw-text-[20px] tw-font-extralight">
        {{ Helper.tLang('auth.login.subtitle') }}
      </p>
      <div class="tw-w-full tw-flex-1">
        <div class="">
          <q-form @submit.prevent.stop="login" ref="refLogin">
            <InputCPA
              filled
              dark
              rounded
              class="tw-mb-3"
              v-model="auth.username"
              :label="Helper.tLang('auth.login.inputs.email')"
              lazy-rules
              :rules="[
                (val) => !!val || 'Correo es requerido.',
                (val) =>
                  /.+@.+\..+/.test(val) || 'Por favor ingrese un correo válido',
              ]"
            >
              <template v-slot:prepend>
                <MailIcon class="!tw-text-primary" />
              </template>
            </InputCPA>
            <InputCPA
              filled
              dark
              rounded
              class="tw-mb-2"
              v-model="auth.password"
              :label="Helper.tLang('auth.login.inputs.password')"
              lazy-rules
              :rules="PasswordValidator.rules"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:prepend>
                <KeySquareIcon class="!tw-text-primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </InputCPA>
            <div class="tw-flex tw-justify-between tw-flex-row tw-mb-6">
              <label class="tw-flex tw-items-center">
                <Checkbox
                  class="tw-bg-input !tw-border-input"
                  v-model:checked="auth.remember_me"
                ></Checkbox>
                <span class="tw-text-white tw-ml-2">
                  {{ Helper.tLang('auth.login.inputs.rememberMe') }}
                </span>
              </label>
              <NuxtLink to="/auth/reset_password" class="tw-text-primary">
                {{ Helper.tLang('auth.login.forgotPassword') }}
              </NuxtLink>
            </div>
            <div class="tw-flex tw-justify-center tw-mb-6">
              <SocialAuthGoogle />
              <!-- <SocialAuthFacebook /> -->
            </div>
            <transition name="hero">
              <Button
                :disabled="loading"
                type="submit"
                class="hero tw-mt-5 tw-tracking-wide tw-font-semibold tw-bg-indigo-500 tw-text-gray-100 tw-w-full tw-py-4 tw-rounded-lg tw-hover:bg-indigo-700 tw-transition-all tw-duration-300 tw-ease-in-out tw-flex tw-items-center tw-justify-center"
              >
                <span class="tw-ml-3">
                  {{ Helper.tLang('auth.login.submitBtn') }}
                </span>
              </Button>
            </transition>
          </q-form>
          <p
            class="tw-mt-8 tw-text-sm tw-font-extralight tw-text-white tw-text-center"
          >
            {{ Helper.tLang('auth.login.withoutAccount.content') }}
            <NuxtLink to="/auth/register" class="tw-text-primary tw-ml-1">
              {{ Helper.tLang('auth.login.withoutAccount.link') }}
            </NuxtLink>
          </p>
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

.hero-enter-active,
.hero-leave-active {
  transition: all 1s ease;
}

.hero-enter,
.hero-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
