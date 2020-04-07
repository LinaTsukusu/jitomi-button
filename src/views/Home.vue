<template lang="pug">
  #home
    v-row
      v-col(md="6" offset-md="3")
        v-text-field(v-model="search" label="Search" append-icon="mdi-magnify" clearable)
    v-row
      v-col(offset-md="1" md="10")
        v-btn.ma-1(color="primary" v-for="d in voiceDataList" @click="playVoice(d)" v-if="isShow(d)") {{d.title}}
          span(v-if="d.index > 1") {{d.index}}
    v-footer(absolute)
      player-footer(ref="player" @click-chip="searchTag")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import * as firebase from "firebase/app"
  import "firebase/firestore"
  import PlayerFooter from '@/components/PlayerFooter.vue'

  const db = firebase.firestore()
  @Component({
    components: {PlayerFooter},
  })
  export default class Home extends Vue {
    private voiceDataList: VoiceData[] = []
    private search = ''

    private mounted() {
      db.collection('voices')
        .orderBy('ruby')
        .orderBy('index')
        .get()
        .then((snap) => {
          this.voiceDataList = snap.docs.map((doc) => doc.data()) as VoiceData[]
        })
    }

    private playVoice(voiceData: VoiceData) {
      const player = this.$refs.player as PlayerFooter
      player.playVoice(voiceData)
    }

    private isShow(data: VoiceData): boolean {
      if (!this.search) {
        return true
      }

      return data.title.includes(this.search)
        || data.ruby.includes(this.search)
        || data.tags.some((v) => v.includes(this.search))
    }

    private searchTag(tag: string) {
      this.search = tag
    }
  }
</script>
