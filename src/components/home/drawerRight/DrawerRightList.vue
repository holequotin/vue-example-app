<template>
 <v-list density="compact">
      <v-list-subheader>CONTACTS</v-list-subheader>
        <UserListItem v-for="(friend,i) in props.friends" :key="i" :value="friend" :user="friend">

        </UserListItem>
    </v-list>
</template>

<script setup>
import UserListItem from '../drawerLeft/UserListItem.vue'

const props = defineProps(['friends']);
</script>