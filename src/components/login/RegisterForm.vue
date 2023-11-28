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
            <v-card-subtitle>
                Fast and easy
            </v-card-subtitle>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Legal first name*" required v-model="firstName.value.value" :error-messages="firstName.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Legal last name*" v-model="lastName.value.value" :error-messages="lastName.errorMessage.value"
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
                        <v-col cols="12" sm="6">
                            <v-select :items="['Men', 'Women']" label="Gender*" required v-model="gender.value.value" :error-messages="gender.errorMessage.value"></v-select>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <v-btn round color="primary" dark block type="submit" @click="submit">Register</v-btn>
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
import { ref } from 'vue'
import { defineRule } from 'vee-validate';
import {useField, useForm} from 'vee-validate'
import { required, email,min} from '@vee-validate/rules';

defineRule('required',value => {
    return required(value)? true : 'This field is required'
})
defineRule('email',value => {
    return email(value)? true : 'Email is invalid format'
})
defineRule('min',(value,params) => {
    return min(value,params)?true : `This field need to at least ${params} character`
})

const {handleSubmit} = useForm({
    validationSchema : {
        firstName : 'required',
        lastName : 'required',
        email : 'required|email',
        password : 'required|min:3',
        confirmPassword: (value) => {
            if(value === password.value.value) return true
            return 'Password not match'
        },
        gender: 'required'
    }
})

const firstName = useField('firstName');
const lastName = useField('lastName');
const emailField = useField('email')
const password = useField('password');
const confirmPassword = useField('confirmPassword');
const gender = useField('gender')

const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})
const dialog = ref(false)
</script>