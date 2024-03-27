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
import BaseDialog from '../home/feed/BaseDialog.vue';
import { ref, computed, watchEffect, defineEmits } from 'vue'
import { useAlertStore } from '../../stores/alert';
import { useUserStore } from '../../stores/user';
import { userService } from '../../service/userService';
import { MessageType } from '../../utils/MessageType';
import { errorHandler } from '../../utils/errorHandler';
const props = defineProps(['dialog'])
const emit = defineEmits(['toggle', 'after'])

const userStore = useUserStore()
const alertStore = useAlertStore()
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
        'image': avatar.value[0]
    }
    userService.uploadAvatar(data)
        .then((response) => {
            console.log(response.data)
            emit('after')
            alertStore.showAlert('Change avatar successfully', MessageType.SUCCESS);
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