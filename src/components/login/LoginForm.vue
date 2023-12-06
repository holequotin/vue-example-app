<template>
    <v-card :variant="tonal" class="mx-auto pa-4" width="500">
        <v-card-item>
            <v-form @submit.prevent>
                <v-text-field name="email" placeholder="Enter email" v-model="emailField.value.value" :error-messages="emailField.errors.value"></v-text-field>
                <v-text-field name="password" placeholder="Enter password" v-model="password.value.value" :error-messages="password.errors.value" type="password"></v-text-field>
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
import {useRouter} from 'vue-router'
import {useField, useForm} from 'vee-validate'
const router = useRouter()

const {handleSubmit} = useForm({
    validationSchema : {
        emailField : 'email|required',
        password : 'required|min:6'
    }
})
const emailField = useField('emailField')
const password = useField('password')

const login = handleSubmit((values) => {
    alert(JSON.stringify(values))
    router.push({name:'home'})
})
</script>