<template>
  <div class="col">
    <div class="card h-100 shadow rounded-3 overflow-hidden" style="max-width: 400px;">
      <div class="row g-0 h-100">
        <div class="col-md-4 bg-secondary d-flex justify-content-center flex-column p-2">
          <img :src="channel.tvgLogo" class="card-img-top"
               style="object-fit: cover; object-position: center;">
        </div>

        <div class="col-md-8 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title mb-0">{{ channel.name }}</h5>
            <a @click="filterBy(channel.groupTitle)" class="card-subtitle text-muted">{{ channel.groupTitle }}</a>
          </div>

          <div class="d-grid">
            <a href="#" @click.prevent="setChannelPlaying(channel)"
               class="btn btn-primary btn-sm rounded-0">Play</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useChannelsStore } from '../store/channels'

export default {
  name: 'Channel',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const channelsStore = useChannelsStore()

    return {
      setChannelPlaying: channelsStore.setChannelPlaying,
      filterBy: channelsStore.filterBy
    }
  }
}
</script>

<style scoped>
.card-img-top {
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.55));
}
</style>
