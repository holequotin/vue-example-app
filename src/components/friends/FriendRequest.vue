<template>
    <v-card width="70%" class="mb-5">
        <template v-slot:prepend>
            <div class="d-flex justify-start">
                <v-avatar color="blue-darken-2" size="large">
                    <span class="text-h5">{{ avatarChar }}</span>
                </v-avatar>
                <div class="ml-3">
                    <RouterLink :to="{ name: 'profile-parent', params: { id: friendship.from_user.id } }" style="color: white;">
                        <v-card-title>{{ friendship.from_user.name }}</v-card-title>
                    </RouterLink>
                </div>
            </div>
        </template>
        <v-card-actions>
            <v-btn outline color="primary" @click="accept">Accept</v-btn>
            <v-btn outline color="error" @click="refuse">Refuse</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { friendService } from '@/service/friendService'
import { errorHandler } from '@/utils/errorHandler'
import { useFriendsStore } from '@/stores/friend'
import { useToast } from 'vue-toastification'

const props = defineProps(['friendship'])
const emits = defineEmits(['accept', 'refuse'])
const friendStore = useFriendsStore()
const toast = useToast()
const avatarChar = computed(() => {
    return props.friendship.from_user.name[0];
})

function accept() {
    friendService.accept(props.friendship.id)
        .then((response) => {
          toast.success('Accepted')
            friendStore.getAllFriends();
            emits('accept');
        })
        .catch((error) => {
            errorHandler(error);
        })
}

function refuse() {
    friendService.unfriend(props.friendship.from_user.id)
        .then((response) => {
            console.log(response.data)
          toast.success('Refuse')
            emits('refuse')
        })
        .catch((error) => {
            errorHandler(error)
    })
}
</script>