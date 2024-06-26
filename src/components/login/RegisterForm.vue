<template>
    <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
            <v-btn color="success" v-bind="props" block>
                Create an account
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span class="text-h5">Create an account</span>
                <span> <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn></span>
            </v-card-title>
            <ALertBase :message="errorMessage" type="error" v-show="showError" z-index="100"></ALertBase>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Legal Name*" v-model="name.value.value" :error-messages="name.errorMessage.value"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Email*" required v-model="emailField.value.value" :error-messages="emailField.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            {{ password.value.value }}
                            <v-text-field label="Password*" type="password" required v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            {{ confirmPassword.errorMessage.value }}
                            <v-text-field label="Confirm Password*" type="password" required v-model="confirmPassword.value.value" :error-messages="confirmPassword.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <v-btn round color="primary" dark block type="submit" @click="submit" :loading="loading">Register</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { defineRule, useField, useForm } from 'vee-validate'
import { email, min, required } from '@vee-validate/rules'
import ALertBase from '../notify/AlertBase.vue'
import { userService } from '@/service/userService'
import { useToast } from 'vue-toastification'

defineRule('required',value => {
    return required(value)? true : 'This field is required'
})
defineRule('email',value => {
    return email(value)? true : 'Email is invalid format'
})
defineRule('min',(value,params) => {
    return min(value,params)?true : `This field need to at least ${params} character`
})
const toast = useToast()
const errorMessage = ref('')
const loading = ref(false)
const showError = computed(() => {
    return !!errorMessage.value;

})
const {handleSubmit} = useForm({
    validationSchema : {
        name : 'required',
        email : 'required|email',
        password : 'required|min:3',
        confirmPassword: (value) => {
            if(value === password.value.value) return true
            return 'Password not match'
        },
    }
})

const name = useField('name');
const emailField = useField('email')
const password = useField('password');
const confirmPassword = useField('confirmPassword');

const submitForm = handleSubmit(values => {
    const data = {
        email: values.email,
        name: values.name,
        password: values.password,
        password_confirmation: values.confirmPassword,
    }
    loading.value = true
    userService.register(data)
        .then(function (response) {
            loading.value = false
            console.log(response)
          toast.success('Register complete')
            dialog.value = false
        })
        .catch(function (error) {
            const message = error.response.data.message || error.message
            errorMessage.value = message
            loading.value = false
            setTimeout(() => {
                errorMessage.value = ''
            },5000)
        })
})
const dialog = ref(false)
</script>