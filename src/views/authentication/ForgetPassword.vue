<template>
    <BaseGuest>
        <template #main>
            <v-container grid-list-xs fluid style="width: 100%;">
                <v-row class="d-flex justify-center flex-row">
                    <v-icon color="primary" icon="mdi-facebook" :size="75"></v-icon>
                </v-row>
                <v-row class="d-flex justify-center flex-row">
                    <slot name="title">
                        <h1>Reset your password</h1>
                    </slot>
                </v-row>
                <v-row>
                    <v-card min-width="500">
                        <slot name="card-title">
                            <v-card-title v-if="!send">Enter your user account's verified email address and we will send you
                                a
                                password reset
                                link.</v-card-title>
                        </slot>
                        <slot name="card-item">
                            <v-card-item v-if="send">
                                <span>
                                    Check your email for a link to reset your password. If it doesn’t appear within a few
                                    minutes, check your spam folder.
                                </span>
                                <RouterLink :to="{name: 'login'}"><v-btn block color="info" class="mt-3">Return to sign in</v-btn></RouterLink>
                            </v-card-item>
                            <v-card-item v-else>
                                <v-text-field placeholder="Email" v-model="emailField.value.value" :error-messages="emailField.errorMessage.value"></v-text-field>
                                <v-btn block color="success" @click="submit">Send password reset email</v-btn>
                            </v-card-item>
                        </slot>
                    </v-card>
                </v-row>
            </v-container>
        </template>
    </BaseGuest>
</template>
<script setup>
import BaseGuest from '../../components/base/BaseGuest.vue';
import { defineRule } from 'vee-validate';
import {useField, useForm} from 'vee-validate'
import { required, email} from '@vee-validate/rules';
import { ref } from 'vue'
import axios from '../../apis/axios'
import {errorHandler} from '@/utils/errorHandler'
import { RouterLink } from 'vue-router';
const send = ref(false)

defineRule('required',value => {
    return required(value)? true : 'This field is required'
})
defineRule('email',value => {
    return email(value)? true : 'Email is invalid format'
})
const {handleSubmit} = useForm({
    validationSchema : {
        emailField : 'required|email',
    }
})
const emailField = useField('emailField')
const submit = handleSubmit((values) => {
    axios.post('/auth/forget_password',{
        email : values.emailField
    })
    .then((response) => {
        console.log(response)
        send.value = true;
    })
    .catch((error) => {
        errorHandler(error)
    })
})
//const submit = () => console.log('Hello')
</script>