<template>
  <v-container grid-list-xs style="width: 70%;">
    <v-card>
      <v-card-title>
        Groups
        <v-btn color="primary" class="ml-4" prepend-icon="mdi-plus" variant="tonal" @click="dialog=true"
               v-if="$route.params.id == userStore.user.id">Create new group
        </v-btn>
      </v-card-title>
      <v-card-item>
        <v-row>
          <v-col cols="6" v-for="group in props.groups" :key="group.id" class="d-flex justify-start">
            <GroupCard :group="group"></GroupCard>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-container>
  <CreateGroupDialog :dialog="dialog" @toggle="dialog = !dialog" @created="emits('created')"></CreateGroupDialog>
</template>
<script setup>
import GroupCard from '@/components/group/GroupCard.vue'
import CreateGroupDialog from '@/components/group/CreateGroupDialog.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const props = defineProps(['groups'])
const emits = defineEmits(['created'])
const dialog = ref(false)

</script>
<style scoped>
.color-link {
  color: white;
}
</style>