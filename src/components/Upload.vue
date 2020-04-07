<template lang="pug">
  v-card#upload(:loading="isLoading")
    v-form(v-model="valid" ref="form")
      v-container
        v-row
          v-col.headline.text-center.white--text Add Voice
        v-row
          v-col(offset-md="1" md="10")
            v-row
              v-col
                v-text-field(v-model="data.title" label="Title" :rules="[required,]")
              v-col
                v-text-field(v-model="data.ruby" label="Ruby" :rules="[required,]")
        v-row
          v-col(offset-md="1" md="10")
            v-combobox(v-model="data.tags" :items="tagList" chips deletable-chips label="Tags" multiple)
        v-row
          v-col(offset-md="1" md="10")
            v-text-field(v-model="data.archiveUrl" label="ArchiveURL" type="url" :rules="[required,]")
        v-row
          v-col(offset-md="1" md="10")
            v-row
              v-col
                v-file-input(
                  v-model="file"
                  @change="onPickFile"
                  label="Voice File" accept="audio/mp3, audio/wav, audio/aac, audio/ogg"
                  show-size
                  :rules="[required,]")
              v-btn(@click="$emit('play', voice)" fab)
                v-icon mdi-play
        v-row
          v-col(offset-md="1" md="10")
            v-row(align="center" justify="space-around")
              v-btn.mr-md-12(@click="close" x-large) Cancel
              v-btn.mr-md-4(@click="add" color="success" x-large) Add
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import * as firebase from "firebase/app"
  import "firebase/firestore"
  import "firebase/storage"
  import "firebase/auth"
  
  @Component
  export default class Upload extends Vue {
    private data: VoiceData = {
      title: '',
      ruby: '',
      index: 0,
      tags: [],
      archiveUrl: '',
      voiceUrl: ''
    }
    private file: File | null = null
    private voice = ''
    private tagList: string[] = []

    private valid = true
    private isLoading = false

    private required = (v: string) => !!v || 'Required'


    private add() {
      const form = this.$refs.form as unknown as {validate: () => boolean}
      if (form.validate()) {
        this.isLoading = true
        const db = firebase.firestore()
        const storage = firebase.storage()


        const voices = db.collection('voices')
        const user = firebase.auth().currentUser
        if (!user) {
          this.isLoading = false
          return
        }

        db.collection('admin').doc(user.uid).get()
        .then((doc) => {
          if (!doc.exists) {
            throw 'お前は誰だ'
          }
          return
        }).then(() => {
          return voices.where('title', '==', this.data.title)
            .orderBy('index')
            .get()
        }).then((snap) => {
          if (snap.docs.length === 0) {
            this.data.index = 1
          } else {
            this.data.index = snap.docs.slice(-1)[0].data().index
          }
          if (!this.file) {
            throw 'ちゃんと入力しろ'
          }
          const fileName = this.file.name.match(/(.*)(?:(\.[^.]+$))/)
          if (!fileName) {
            throw 'ちゃんと入力しろ'
          }
          return storage.ref('voices').child(`${fileName[1]}${this.data.index}${fileName[2]}`)
            .put(this.file)
        })
        .then((snap) => {
          return snap.ref.getDownloadURL()
        })
        .then((url: string) => {
          this.data.voiceUrl = url
          return voices.add(this.data)
        })
        .then(() => {
          this.isLoading = false
          this.close()
        })
        .catch((err) => {
          this.isLoading = false
          this.$store.commit('showAlert', {msg: err, color: "error"})
        })
      }
    }

    private onPickFile(file?: File) {
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          this.voice = reader.result as string
        }
        reader.readAsDataURL(file)
      }
    }

    private close() {
      const form = this.$refs.form as unknown as {reset: () => boolean}
      form.reset()
      this.$emit('close')
    }
  }
</script>

<style scoped lang="stylus">

</style>
