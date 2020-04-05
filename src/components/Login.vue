<template lang="pug">
  v-card#login(:loading="loggingIn")
    v-card-actions
      #firebaseui-auth-container
      v-btn(@click="cancel") Cancel
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import * as firebase from 'firebase/app'
  import * as firebaseui from 'firebaseui'
  import 'firebase/firestore'
  import 'firebaseui/dist/firebaseui.css'

  
  @Component
  export default class Login extends Vue {
    private loggingIn = true

    private mounted() {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            const uid = authResult.user.uid
            const db = firebase.firestore()

            db.collection('admin')
              .doc(uid).get()
              .then((snap) => {
                if (!snap.exists) {
                  this.$router.push('/')
                  this.$store.commit('showAlert', {msg: "関係者以外立入禁止", color: "error"})
                } else {
                  this.$router.push('/manage')
                }
              })
            return true
          },
          uiShown: () => {
            this.loggingIn = false
          }
        }
      })
    }

    private cancel() {
      this.$router.push('/')
    }
  }
</script>

<style scoped lang="stylus">

</style>
