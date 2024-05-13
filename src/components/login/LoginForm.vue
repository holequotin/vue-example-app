<template>
    <v-card :variant="tonal" class="mx-auto pa-4" width="500">
        <v-card-item>
            <v-form @submit.prevent>
                <v-text-field name="email" placeholder="Enter email" v-model="emailField.value.value"
                    :error-messages="emailField.errors.value"></v-text-field>
                <v-text-field name="password" placeholder="Enter password" v-model="password.value.value"
                    :error-messages="password.errors.value" type="password"></v-text-field>
              <v-btn round color="primary" block @click="login">Login</v-btn>
            </v-form>

            <v-container class="fill-height align-center justify-center">
                <RouterLink :to="{name: 'forget-password'}">Forgot Password?</RouterLink>
            </v-container>
            <v-divider></v-divider>
            <RegisterForm></RegisterForm>
        </v-card-item>
    </v-card>
</template>

<script setup>
import RegisterForm from './RegisterForm.vue'
import { RouterLink, useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { getMessage } from '@/utils/errorHandler'
import { userService } from '@/service/userService'
import { useToast } from 'vue-toastification'

const router = useRouter()

const toast = useToast()
const userStore = useUserStore()
const { handleSubmit } = useForm({
    validationSchema: {
        emailField: 'email|required',
        password: 'required|min:6'
    }
})
const emailField = useField('emailField')
const password = useField('password')

const login = handleSubmit((values) => {
    const data = {
        email: values.emailField,
        password: values.password
    }
    userService.login(data)
        .then((response) => {
            if(response.data.message)
            {
              toast.info(response.data.message)
              return
            }
            const token = response.data.access_token
            localStorage.setItem('token', token)
            router.replace({ name: 'home' })
          toast.success('Login successfully')
            userStore.getUser()
            router.push({ name: 'home' })
        })
        .catch((error) => {
            const message = getMessage(error)
          toast.error(message)
        })
})
</script>