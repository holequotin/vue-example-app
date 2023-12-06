<template>
    <v-card :variant="tonal" class="mx-auto pa-4" width="500">
        <v-card-item>
            <v-form @submit.prevent>
                <v-text-field name="email" placeholder="Enter email" v-model="emailField.value.value"
                    :error-messages="emailField.errors.value"></v-text-field>
                <v-text-field name="password" placeholder="Enter password" v-model="password.value.value"
                    :error-messages="password.errors.value" type="password"></v-text-field>
                <v-btn round color="primary" dark block @click="login">Login</v-btn>
            </v-form>

            <v-container class="fill-height align-center justify-center">
                <a href="">Forgot Password?</a>
            </v-container>
            <v-divider></v-divider>
            <RegisterForm></RegisterForm>
            <!-- <v-btn round color="success" dark block>Register</v-btn> -->
        </v-card-item>
    </v-card>
</template>

<script setup>
import RegisterForm from './RegisterForm.vue';
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { useUserStore } from '../../stores/user';
import { useAlertStore } from '../../stores/alert';
import { MessageType } from '../../utils/MessageType';
import { getMessage } from '../../utils/errorHandler';
import { apiService } from '../../service/apiService';
const router = useRouter()

const alertStore = useAlertStore()
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
    apiService.login(data)
        .then((response) => {
            const token = response.data.access_token
            //TO DO: Save user to store

            localStorage.setItem('token', token)
            router.replace({ name: 'home' })
            alertStore.showAlert('Login successfully', MessageType.SUCCESS)
            userStore.getUser()
            router.push({ name: 'home' })
        })
        .catch((error) => {
            const message = getMessage(error)
            alertStore.showAlert(message, MessageType.ERROR)
        })
})
</script>