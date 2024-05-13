<template>
    <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
        <template #title>
            <span>
                Edit Avatar
            </span>
        </template>
        <template #content>
            <v-container grid-list-xs class="d-flex justify-center">
                <v-file-input label="File input" v-model="avatar">
                    <template #append>
                        <v-btn outline color="primary" dark :disabled="!updateAvatar"
                            @click="changeAvatar">Update</v-btn>
                    </template>
                </v-file-input>
            </v-container>
        </template>
    </BaseDialog>
</template>
<script setup>
import BaseDialog from '../home/feed/BaseDialog.vue'
import { computed, defineEmits, ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { userService } from '@/service/userService'
import { errorHandler } from '@/utils/errorHandler'
import { useToast } from 'vue-toastification'

const props = defineProps(['dialog'])
const emit = defineEmits(['toggle', 'after'])

const userStore = useUserStore()
const toast = useToast()
const user = ref({ ...userStore.user })

const avatar = ref(null);

const updateAvatar = computed(() => {
    return avatar.value
})

function close() {
    emit('toggle')
}

function changeAvatar() {
    const data = {
      image: avatar.value
    }

  userService.uploadAvatar(data)
        .then((response) => {
            console.log(response.data)
            emit('after')
          toast.success('Change avatar successfully')
            emit('toggle')
        })
        .catch((error) => {
            errorHandler(error)
            emit('toggle')
        })
}

watchEffect(() => {
    user.value = {
        ...userStore.user
    }
})

</script>