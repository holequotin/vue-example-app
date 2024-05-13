<template>
    <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
        <template #title>
            <span>
                Edit Profile
            </span>
        </template>
        <template #content>
            <v-container grid-list-xs class="d-flex justify-center">
                <v-text-field style="width: 50%;" label="Name" variant="outlined" v-model="user.name">
                    <template #append>
                        <v-btn outline color="primary" dark :disabled="!updateName"
                            @click="updateProfile">Update</v-btn>
                    </template>
                </v-text-field>
            </v-container>

            <v-container grid-list-xs class="d-flex justify-center flex-column">
                <v-text-field style="width: 100%;" label="New password" variant="outlined" v-model="password"
                    type="password"></v-text-field>
                <v-text-field style="width: 100%;" label="Confirm password" variant="outlined" v-model="confirmPassword"
                    :error-messages="errorMessage" type="password"></v-text-field>
                <v-btn outline color="primary" dark block :disabled="!updatePassword" @click="changePassword">Change
                    Password</v-btn>
            </v-container>
        </template>
    </BaseDialog>
</template>
<script setup>
import BaseDialog from '../home/feed/BaseDialog.vue'
import { computed, ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'
import { usePostStore } from '@/stores/post'
import { useToast } from 'vue-toastification'

const props = defineProps(['dialog'])
const emit = defineEmits(['toggle', 'after'])

const userStore = useUserStore()
const postStore = usePostStore()
const toast = useToast()
const user = ref({ ...userStore.user })
const updateName = computed(() => {
    return user.value.name.trim() != userStore.user.name.trim()
})

const updatePassword = computed(() => {
    return password.value != '' && isMatch
})

const password = ref('')
const confirmPassword = ref('')
const errorMessage = computed(() => {
    if (isMatch.value) return ''
    return 'Password does not match'
})

const isMatch = computed(() => {
    if (password.value == confirmPassword.value) {
        return true
    }
    return false
})

function close() {
    emit('toggle')
}

function updateProfile() {
    const data = {
        'name': user.value.name.trim()
    }
    userService.update(data)
        .then((response) => {
            console.log(response.data)
          toast.success('Update successfully')
            userStore.getUser()
            postStore.getPostsByUser(user.value.id)
            emit('after')
            emit('toggle')
        })
        .catch((error) => {
            errorHandler(error)
        })
}

function changePassword() {
    const data = {
        password: password.value,
        password_confirmation: confirmPassword.value
    }
    userService.changePassword(data)
        .then((response) => {
            console.log(response.data)
          toast.success(response.data.message)
        })
        .catch((error) => {
            errorHandler(error)
        })
    emit('toggle')
}

watchEffect(() => {
    user.value = {
        ...userStore.user
    }
})

</script>