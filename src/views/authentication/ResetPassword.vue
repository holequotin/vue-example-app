<template>
<ForgetPassword>
    <template #title>
        <h1>Change password for {{ user.name }}</h1>
    </template>
    <template #card-title>
        <div>

        </div>
    </template>
    <template #card-item>
        <v-card-item>
            <v-text-field
                label="Password"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            ></v-text-field>
            <v-text-field
                label="Confirm password"
                v-model="confirmPassword.value.value"
                :error-messages="confirmPassword.errorMessage.value"
                type="password"
            ></v-text-field>
            <v-btn outline color="success" dark block @click="submit">Change Password</v-btn>
        </v-card-item>
    </template>
</ForgetPassword>
</template>
<script setup>
import ForgetPassword from './ForgetPassword.vue';
import { defineRule } from 'vee-validate';
import {useField, useForm} from 'vee-validate'
import { required,min} from '@vee-validate/rules';
import { useRoute,useRouter } from 'vue-router';
import {ref} from 'vue'
import {userService} from '../../service/userService'
import { useAlertStore } from '../../stores/alert';

const route = useRoute();
const router = useRouter();
const alertStore = useAlertStore()
const token = ref(route.query.token)
const user = ref({})
userService.getUserByToken(token.value)
    .then((response) => {
        user.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })
defineRule('required',value => {
    return required(value)? true : 'This field is required'
})
defineRule('min',(value,params) => {
    return min(value,params)?true : `This field need to at least ${params} character`
})

const {handleSubmit} = useForm({
    validationSchema : {
        password : 'required|min:6',
        confirmPassword: (value) => {
            if(value === password.value.value) return true
            return 'Password not match'
        }
    }
})
const submit = handleSubmit(values => {
    userService.resetPassword(token.value,values.password)
        .then((response) => {
            console.log(response)
            alertStore.showAlert('Reset Password Successfully','success')
            router.replace({name : 'login'})
        })
        .catch((error) => {
            console.log(error)
        })
})
const password = useField('password');
const confirmPassword = useField('confirmPassword');
</script>