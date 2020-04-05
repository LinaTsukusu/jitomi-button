<template lang="pug">
  #manage
    v-row
      v-col(md="10" offset-md="1")
        v-data-table(
          :items="voiceDataList"
          :headers="headers"
          :search="search"
          @click:row="showEditDialog"
          show-select
          hide-default-footer
          :loading="isLoading"
        )
          template(v-slot:top)
            v-card-title Voices List
              v-spacer
              v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line clearable)
              v-spacer
              v-btn(fab color="error")
                v-icon mdi-delete
          template(v-slot:item.tags="{value}")
            v-chip.mr-1(v-for="tag in value" @click.stop="search = tag") {{tag}}
          template(v-slot:item.voiceUrl="{value}")
            v-btn(text @click.stop="playVoice(value)")
              v-icon mdi-play
          template(v-slot:item.archiveUrl="{value}")
            v-btn(text :href="value" target="_blank" @click.stop)
              v-icon mdi-launch
    v-btn#add-button(@click="addDialog = true" fixed bottom fab right x-large color="primary")
      v-icon mdi-plus
    v-dialog(v-model="addDialog" max-width="1200")
      upload(@close="addDialog = false" @add="add")
    v-dialog(v-model="editDialog" max-width="1200")
      edit(:value="editData"  @close="editDialog = false" @play="playVoice" @update="update")
    v-dialog(v-model="loginDialog" persistent width="400")
      login
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import * as firebase from "firebase/app"
  import "firebase/firestore"
  import "firebase/auth"
  import Login from '@/components/Login.vue'
  import Edit from '@/components/Edit.vue'
  import Upload from '@/components/Upload.vue'

  const db = firebase.firestore()
  @Component({
    components: {Upload, Edit, Login},
  })
  export default class Manage extends Vue {
    private voiceDataList: VoiceData[] = []
    private headers = [
      {text: 'Title', value: 'title'},
      {text: 'Index', value: 'index', width: "10%"},
      {text: 'Tags', value: 'tags', width: "45%"},
      {text: 'Voice', value: 'voiceUrl', width: "5%", align: 'center'},
      {text: 'Archive', value: 'archiveUrl', width: "5%", align: 'center'},
    ]

    private search = ""
    private isLoading = true
    private addDialog = false
    private editDialog = false
    private loginDialog = false
    private editData: VoiceData | null = null

    private mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.loginDialog = true
        } else {
          this.loginDialog = false
          db.collection('admin')
            .doc(user.uid)
            .get()
            .then((snap) => {
              if (!snap.exists) {
                throw "関係者以外立入禁止"
              }
              return db.collection('voices')
                .orderBy('ruby')
                .orderBy('index')
                .onSnapshot((snap) => {
                  this.isLoading = true
                  this.voiceDataList = snap.docs.map((v) => {
                    const ret = v.data() as VoiceData & { id: string }
                    ret.id = v.id
                    return ret
                  })
                  this.isLoading = false
                })
            })
            .catch((err) => {
              this.$store.commit('showAlert', {msg: err, color: "error"})
              this.$router.push("/")
            })
        }
      })
    }

    private add() {
      //
    }

    private update(id: string, data: VoiceData) {
      db.collection('voices')
        .doc(id)
        .update(data)
        .then(() => {
          this.editDialog = false
        })
    }

    private delete(id: string) {
      //
    }

    private showEditDialog(data: VoiceData) {
      this.editData = Object.assign({}, JSON.parse(JSON.stringify(data)))
      this.editDialog = true
    }

    private playVoice(url: string) {
      const audio = new Audio(url)
      audio.play()
    }
  }
</script>

<style scoped lang="stylus">
</style>
