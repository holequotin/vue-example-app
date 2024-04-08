<template>
  <v-container grid-list-xs style="width: 70%;">
    <v-card>
      <v-card-title>
        Groups
      </v-card-title>
      <v-card-item>
        <v-row>
          <v-col cols="6" v-for="group in props.groups" :key="group.id" class="d-flex justify-start">
            <GroupCard :group="group">

            </GroupCard>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </v-container>
</template>
<script setup>
import GroupCard from '@/components/group/GroupCard.vue'

const props = defineProps(['groups'])
</script>
<style scoped>
.color-link {
  color: white;
}
</style>