<template>
  <BaseDialog :dialog="props.dialog" @toggle="close" :width="600">
    <template #title>
            <span>
                Reactions
            </span>
    </template>
    <template #content>
      <v-container grid-list-xs>
        <v-row width="50%">
          <v-select :items="items" density="compact" label="Type" v-model="type" @update:modelValue="() => getReactions(type)"></v-select>
        </v-row>
      </v-container>
      <v-list lines="two">
        <v-infinite-scroll :onLoad="load" mode="manual">
          <v-list-item v-for="reaction in reactions[type].reactions" :key="reaction.id">
            <v-list-item-title>{{ reaction.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ reaction.type }}</v-list-item-subtitle>
          </v-list-item>
        </v-infinite-scroll>
      </v-list>
    </template>
  </BaseDialog>
</template>
<script setup>
import BaseDialog from './BaseDialog.vue'
import { ref } from 'vue'
import { errorHandler } from '@/utils/errorHandler'
import { reactionService } from '@/service/reactionService'
import { ReactionType } from '@/utils/ReactionType'

const props = defineProps(['dialog', 'post'])
const emit = defineEmits(['toggle'])

const reactions = ref({
  null : {
    reactions : [],
    meta: null,
    currentPage: 0
  },
  like : {
    reactions : [],
    meta: null,
    currentPage: 0
  },
  love : {
    reactions : [],
    meta: null,
    currentPage: 0
  },
  haha : {
    reactions : [],
    meta: null,
    currentPage: 0
  },
  wow : {
    reactions : [],
    meta: null,
    currentPage: 0
  },
  sad : {
    reactions : [],
    meta: null,
    currentPage: 0
  }
})
const type = ref(null)

function close() {
  emit('toggle')
}

async function getReactions(type) {
  const currentType = reactions.value[type]
  if(currentType.currentPage === 0 || currentType.currentPage < currentType.meta?.last_page) {
    reactionService.getReactionsByPost(props.post.id, type, currentType.currentPage + 1, 15)
      .then((response) => {
        console.log(response.data)
        reactions.value[type].reactions.push(...response.data.data)
        reactions.value[type].meta = response.data.meta
        reactions.value[type].currentPage = response.data.meta.current_page
      })
      .catch((error) => {
        errorHandler(error)
      })
  }
}

async function load({done}) {
  await getReactions(type.value)
  if (reactions.value[type.value].meta.current_page === reactions.value[type.value].meta.last_page) {
    done('empty')
  } else {
    console.log()
    done('ok')
  }
}

const convertMapToArray = (map) => {
  return Array.from(map, ([value, title]) => {
    return { title, value }
  })
}
getReactions(type.value)
const items = convertMapToArray(ReactionType)
</script>