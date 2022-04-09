<template>
  <div class="the-player" :class="{'expanded': expanded}"
       v-show="channelPlaying">
    <div class="the-player-header modal-header" v-if="expanded">
      <h5 class="modal-title" id="exampleModalToggleLabel">
        {{ channelPlaying && channelPlaying.name }}
        <small class="mb-0">({{ channelPlaying && channelPlaying.groupTitle }})</small>
      </h5>
      <div class="d-flex">
        <button type="button" class="btn btn-link" @click="expanded = false">
          <i class="fas fa-chevron-down text-white fa-xl"></i>
        </button>
        <button type="button" class="btn btn-link" @click="closePlayer">
          <i class="fas fa-xmark text-white fa-xl"></i>
        </button>
      </div>
      <!--      <div class="the-player-header-left">
              <div class="the-player-header-left-title">
                <span class="the-player-header-left-title-text">{{ title }}</span>
              </div>
              <div class="the-player-header-left-subtitle">
                <span class="the-player-header-left-subtitle-text">{{ subtitle }}</span>
              </div>
            </div>-->
      <!--            <div class="the-player-header-right">
                      <div class="the-player-header-right-play-pause">
                          <button class="the-player-header-right-play-pause-button" @click="togglePlayPause">
                              <svg class="the-player-header-right-play-pause-button-icon" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                  <path d="M0 0h24v24H0z" fill="none" />
                              </svg>
                          </button>
                      </div>
                      <div class="the-player-header-right-progress">
                          <div class="the-player-header-right-progress-bar">
                              <div class="the-player-header-right-progress-bar-progress" :style="{ width: progress + '%' }"></div>
                          </div>
                      </div>
                      <div class="the-player-header-right-time">
                          <div class="the-player-header-right-time-current">
                              <span class="the-player-header-right-time-current-text">{{ currentTime }}</span>
                          </div>
                          <div class="the-player-header-right-time-separator">
                              <span class="the-player-header-right-time-separator-text">/</span>
                          </div>
                          <div class="the-player-header-right-time-total">
                              <span class="the-player-header-right-time-total-text">{{ totalTime }}</span>-->
    </div>
    <div class="the-player-body">
      <video ref="videoEl" src="" :controls="expanded" @click="!expanded ? (expanded = true) : null"></video>

      <div class="d-flex align-items-center flex-fill px-3" v-if="!expanded">
        <img :src="channelPlaying && channelPlaying.tvgLogo" alt="" class="tvg-logo">

        <div class="flex-fill">
          <h5 class="mb-0">{{ channelPlaying && channelPlaying.name }}</h5>
          <span class="mb-0">{{ channelPlaying && channelPlaying.groupTitle }}</span>
        </div>

        <div class="d-flex">
          <button type="button" class="btn btn-link" @click="expanded = true">
            <i class="fas fa-chevron-up text-white fa-xl"></i>
          </button>
          <button type="button" class="btn btn-link" @click="closePlayer">
            <i class="fas fa-xmark text-white fa-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useChannelsStore } from '../store/channels'
import { storeToRefs } from 'pinia'
import HLS from 'hls.js'
import dashjs from 'dashjs'

export default {
  name: 'ThePlayer',
  setup () {
    const videoEl = ref()
    const expanded = ref(false)
    const channelsStore = useChannelsStore()
    const { channelPlaying } = storeToRefs(channelsStore)
    let player = null

    function destroyPlayer () {
      if (player) {
        player.destroy()
        player = null
      }
    }

    function closePlayer () {
      expanded.value = false
      channelsStore.setChannelPlaying(null)

      destroyPlayer()
    }

    function playHls () {
      destroyPlayer()

      if (HLS.isSupported()) {
        player = new HLS()

        // bind them together
        player.attachMedia(videoEl.value)

        // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
        player.on(HLS.Events.MEDIA_ATTACHED, function () {
          console.log('channelPlaying changed', channelPlaying)
          player.loadSource(channelPlaying.value.url)

          player.on(HLS.Events.MANIFEST_PARSED, function (event, data) {
            console.log('manifest loaded, found ' + data.levels.length + ' quality level')

            videoEl.value.play()

            expanded.value = true
          })
        })
      }
    }

    function playDash () {
      destroyPlayer()

      const url = channelPlaying.value.url
      player = dashjs.MediaPlayer().create()

      player.initialize(videoEl.value, url, false)
      player.play()
      expanded.value = true
    }

    watch(channelPlaying, (channel) => {
      if (!channel) {
        return
      }

      if (channel.url.toString().endsWith('.mpd')) {
        playDash()
      } else {
        playHls()
      }
    })

    return {
      videoEl,
      expanded,
      channelPlaying,
      closePlayer
    }
  }
}
</script>

<style scoped lang="scss">
.the-player {
  background-color: var(--primary);
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.expanded {
    height: 100vh;

    .the-player-body {
      flex: 1;
      overflow: hidden;

      video {
        width: 100%;
        height: 100%;
      }
    }
  }

  .the-player-header {
    display: flex;
    justify-content: space-between;
  }

  .the-player-body {
    display: flex;
    justify-content: space-between;
    align-content: center;

    video {
      background-color: black;
      height: 60px;
      width: unset;
    }

    .tvg-logo {
      height: 50px;
      width: 60px;
      object-fit: contain;
      margin-right: 1rem;
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.35));
    }
  }
}
</style>
