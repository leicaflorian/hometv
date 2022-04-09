<template>

  <div class="content py-4">
    <div class="mb-5" v-for="(channels, group) of groupedChannels">
      <h2>{{ group }}</h2>

      <div class="row row-cols-1 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 g-4">
        <Channel v-for="channel of channels"
                 :channel="channel"></Channel>
      </div>
    </div>
  </div>
</template>

<script>

import { computed, ref } from 'vue'
import Channel from './Channel'
import { useChannelsStore } from '../store/channels'
import { storeToRefs } from 'pinia'

export default {
  name: 'ChannelsList',
  components: { Channel },
  props: {},
  setup (props) {
    const channelsStore = useChannelsStore()
    const { filterGroup, groupedChannels } = storeToRefs(channelsStore)

    return {
      groupedChannels,
      filterGroup,
    }
  }
}
</script>
