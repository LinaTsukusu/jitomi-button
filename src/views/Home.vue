<template lang="pug">
  #home
    v-row
      v-col(offset-md="1" md="10")
        v-btn.ma-1(color="primary" v-for="d in voiceDataList" @click="playVoice(d)") {{d.title}}
    v-footer(absolute)
      player-footer(ref="player")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import * as firebase from "firebase/app"
  import "firebase/firestore"
  import "firebase/storage"
  import PlayerFooter from '@/components/PlayerFooter.vue'

  const db = firebase.firestore()
  const storage = firebase.storage()
  @Component({
    components: {PlayerFooter},
  })
  export default class Home extends Vue {
    private voiceDataList: VoiceData[] = []
    private voiceData: VoiceData | null = null

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
  }
</script>
