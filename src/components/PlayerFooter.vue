<template lang="pug">
  v-container#player-footer(fluid)
    v-row
      v-col.col-4
        span.display-1 test
        br
        v-btn(text small)
          v-icon(left) mdi-launch
          span https://jfewajfioejwafja.comfejaoifjeaoijf...
      v-col.col-5
        v-chip.tag.ml-1.mb-1(v-for="row of ['Tag1']") {{row}}
      v-col.text-center(align-self="center")
        v-btn(fab x-large color="primary" :disabled="isBtnDisabled")
          v-icon(v-if="!isPlaying") mdi-play
          v-icon(v-else) mdi-stop
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  
  
  @Component
  export default class PlayerFooter extends Vue {
    private isBtnDisabled = false
    private isPlaying = false

  }
</script>

<style scoped lang="stylus">

</style>
