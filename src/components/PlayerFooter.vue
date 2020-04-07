<template lang="pug">
  v-container#player-footer(fluid)
    v-row
      v-col.text-center
        span.display-1(v-if ="this.voiceData") {{this.voiceData.title}}
        v-btn(text :href="this.voiceData.archiveUrl" target="_blank" v-if ="this.voiceData")
          v-icon(left) mdi-launch
          span 元配信
      v-col.d-none.d-md-block(v-if ="this.voiceData")
        v-chip.tag.ml-1.mb-1(v-for="row of this.voiceData.tags" @click="$emit('click-chip', row)") {{row}}
      v-col(v-else)
      v-col.text-center(align-self="center" md="1")
        v-btn(v-if="!isPlaying" @click="playVoice(voiceData)" fab x-large color="primary" :disabled="isBtnDisabled")
          v-icon(x-large) mdi-play
        v-btn(v-else @click="stopVoice" fab x-large color="primary" :disabled="isBtnDisabled")
          v-icon(x-large) mdi-stop
      v-col(align-self="end" md="2")
        v-slider(v-model="volume" min="0" max="1" step="0.01" color="primary" append-icon="mdi-volume-high" prepend-icon="mdi-volume-low")
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

  @Component
  export default class PlayerFooter extends Vue {
    private isBtnDisabled = true
    private isPlaying = false
    private audio: HTMLAudioElement | null = null

    private voiceData: VoiceData | null = null
    private volume = 0.5

    public playVoice(voiceData: VoiceData) {
      this.isBtnDisabled = false
      this.voiceData = voiceData
      this.audio = new Audio(voiceData.voiceUrl)
      this.audio.volume = this.volume
      this.audio.addEventListener('ended', () => {
        this.isPlaying = false
      })
      this.isPlaying = true
      this.audio.play().then()
    }

    private stopVoice() {
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
        this.isPlaying = false
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
