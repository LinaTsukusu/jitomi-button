<template lang="pug">
  v-app
    v-navigation-drawer(
      v-model="menu"
      app
      overflow
      clipped
    )
      side-menu
      template(v-slot:append)
        v-list(nav)
          span.subtitle-1 v1.0.0 create by LinaTsukusu
    v-app-bar(
      app
      clipped-left
    )
      v-app-bar-nav-icon(
        @click.stop="menu = !menu"
      )
      v-col(cols="2")
        v-toolbar-items.align-center
          v-btn(href="/" text)
            v-avatar.mr-4
              img(src="https://yt3.ggpht.com/a/AATXAJwoUsObTqH2d8fktgaDE5EoiR8KVJM1qi0O6w=s288-c-k-c0xffffffff-no-rj-mo")
            v-toolbar-title Jitomi Button 🧲
    v-content
      v-container(fluid)
        router-view
    v-snackbar(v-model="showAlert" :color="alertColor" :timeout="10000" top) {{alertMessage}}
      v-btn(text @click="showAlert = false") close
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator'
  import * as firebase from "firebase/app";
  import "firebase/firestore";
  import PlayerFooter from '@/components/PlayerFooter.vue'
  import SideMenu from '@/components/SideMenu.vue'

  @Component({
    components: {SideMenu, PlayerFooter},
  })
  export default class App extends Vue {
    private menu = false
    private showAlert = false

    private alertColor = "info"
    private alertMessage = ""

    private mounted() {
      const firebaseConfig = {
        apiKey: "AIzaSyAGaHajcNMqq66vnN77mTlkQ8UJNcG8aEI",
        authDomain: "jitomi-button.firebaseapp.com",
        databaseURL: "https://jitomi-button.firebaseio.com",
        projectId: "jitomi-button",
        storageBucket: "jitomi-button.appspot.com",
        messagingSenderId: "737495658679",
        appId: "1:737495658679:web:376e30f9351803492f5d32",
        measurementId: "G-23L1F4DPZ2"
      };
      firebase.initializeApp(firebaseConfig)

      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'showAlert') {
          const alertConfig = state.alertConfig
          this.alertColor = alertConfig.color
          this.alertMessage = alertConfig.msg
          this.showAlert = true
        }
      })
    }
  }
</script>

<style lang="stylus">
</style>
