<template>
  <div class="main-container">
    <TheSidebar class="flex-shrink-0 flex-grow-0" :channels="channels"/>

    <div class=" h-100 d-flex flex-column flex-fill">
      <div class="container-fluid overflow-auto flex-grow-1">
        <ChannelsList :channels="channels"/>
      </div>

      <ThePlayer class="flex-shrink-0"></ThePlayer>
    </div>
  </div>

</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import TheHeader from './TheHeader'
import ChannelsList from './ChannelsList'
import TheSidebar from './TheSidebar'
import { useChannelsStore } from '../store/channels'
import ThePlayer from './ThePlayer'

export default {
  name: 'App',
  components: { ThePlayer, TheSidebar, TheHeader, ChannelsList },
  setup () {
    const channels = ref([])
    const channelsStore = useChannelsStore()

    onMounted(async () => {
      const result = await axios.get('list?only_json=true')

      channelsStore.$patch({
        list: result.data
      })
    })

    return {
      channels
    }
  }
}
</script>

<style lang="scss">
.main-container {
  height: 100vh;
  display: flex;
}
</style>
