<template lang="pug">
  #side-menu
    v-list(nav)
      v-list-item
        v-list-item-avatar
          img(src="https://yt3.ggpht.com/a/AATXAJwoUsObTqH2d8fktgaDE5EoiR8KVJM1qi0O6w=s288-c-k-c0xffffffff-no-rj-mo")
        v-list-item-content
          v-list-item-title.headline 磁富モノエ
          v-list-item-subtitle Jitomi Monoe
      v-list-item(link dense href="https://www.youtube.com/channel/UCaFhsCKSSS821N-EcWmPkUQ" target="_blank")
        v-list-item-icon
          v-icon mdi-youtube
        v-list-item-content
          v-list-item-title YouTube
      v-list-item(link dense href="https://twitter.com/Jitomi_Monoe" target="_blank")
        v-list-item-icon
          v-icon mdi-twitter
        v-list-item-content
          v-list-item-title Twitter
      v-list-item(link dense href="https://twitter.com/hashtag/%E7%A3%81%E3%81%A3%E3%81%A8%E3%81%BF%E3%81%A6?src=hashtag_click&f=live" target="_blank")
        v-list-item-icon
          v-icon mdi-tag
        v-list-item-content
          v-list-item-title #磁っとみて
      v-list-item(link dense href="https://twitter.com/hashtag/%E7%A3%81%E3%81%A3%E3%81%A8%E3%81%BF%E3%81%AA%E3%81%84%E3%81%A7?src=hashtag_click&f=live" target="_blank")
        v-list-item-icon
          v-icon mdi-tag
        v-list-item-content
          v-list-item-title #磁っとみないで
      v-divider
      v-list-item
        v-list-item-avatar
          img(src="https://pbs.twimg.com/profile_images/848252739058450432/IwpE7Qng_400x400.jpg")
        v-list-item-content
          v-list-item-title GYARI
          v-list-item-subtitle 著作権保持者
      v-list-item(link dense href="http://www.gyari.com/" target="_blank")
        v-list-item-icon
          v-icon mdi-home
        v-list-item-content
          v-list-item-title GYARISUTA!
      v-list-item(link dense href="https://twitter.com/GYARI_" target="_blank")
        v-list-item-icon
          v-icon mdi-twitter
        v-list-item-content
          v-list-item-title Twitter
      v-divider
      v-list-item
        v-list-item-content
          span ※このサイトは非公式です
      v-list-item
        v-list-item-avatar
          img(src="https://meish.s3-ap-northeast-1.amazonaws.com/i/TsukusuLina/TsukusuLina_logo.jpg?1581759118358")
        v-list-item-content
          v-list-item-title 創好リナ
          v-list-item-subtitle Tsukusu Lina
      v-list-item(link dense href="https://www.youtube.com/channel/UCxkOLgdNumvVIQqn5ps_bJA" target="_blank")
        v-list-item-icon
          v-icon mdi-youtube
        v-list-item-content
          v-list-item-title YouTube
      v-list-item(link dense href="https://twitter.com/TsukusuLina" target="_blank")
        v-list-item-icon
          v-icon mdi-twitter
        v-list-item-content
          v-list-item-title Twitter
      v-list-item(link dense href="https://github.com/LinaTsukusu/jitomi-button" target="_blank")
        v-list-item-icon
          v-icon mdi-git
        v-list-item-content
          v-list-item-title GitHub
      v-divider
      v-list-item(link dense to="/manage")
        v-list-item-icon
          v-icon mdi-cog
        v-list-item-content
          v-list-item-title Staff Only

</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  
  
  @Component
  export default class SideMenu extends Vue {
  }
</script>

<style scoped lang="stylus">

</style>
