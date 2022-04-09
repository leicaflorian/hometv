<template>
  <div class="the-sidebar bg-dark">
    <nav class="navbar border-bottom navbar-dark bg-dark flex-grow-0 flex-shrink-0">
      <div class="container-fluid">
        <div class="navbar-brand">My Home TV</div>
      </div>
    </nav>

    <div class="flex-column flex-nowrap flex-grow-1 overflow-auto py-4">
      <h4 class="mx-3 mb-3">Gruppi disponibili</h4>
      <ul class="nav flex-nowrap flex-column">
        <li class="nav-item">
          <a class="nav-link"
             :class="{'active': !filterGroup}"
             aria-current="page" href="#"
             @click="filterBy('')">TUTTI</a>
        </li>
        <li class="nav-item" v-for="group of groups" :key="group">
          <a class="nav-link" @click="filterBy(group)"
             :class="{'active': filterGroup === group}">{{ group }}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useChannelsStore } from '../store/channels'
import { storeToRefs } from 'pinia'

export default {
  name: 'TheSidebar',
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const channelsStore = useChannelsStore()
    const { groups, filterGroup } = storeToRefs(channelsStore)

    return {
      groups,
      filterGroup,
      filterBy: channelsStore.filterBy
    }
  }
}
</script>

<style scoped lang="scss">
.the-sidebar {
  width: 250px;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .nav-link.active {
    background-color: rgba(255, 255, 255, 0.4);
    color: white;
  }
}
</style>
