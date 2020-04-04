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
      v-col.col-2
        v-toolbar-items.align-center
          v-avatar
            img(src="https://yt3.ggpht.com/a/AATXAJwoUsObTqH2d8fktgaDE5EoiR8KVJM1qi0O6w=s288-c-k-c0xffffffff-no-rj-mo")
          v-toolbar-title.ml-4 Jitomi Button
      v-col.offset-1.col-6.mt-6
        v-toolbar-items
          v-text-field(label="Search" append-icon="mdi-magnify")
    v-content
      v-container(fluid)
        router-view
    v-footer.elevation-2(
      app
      fixed
    )
      player-footer

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator'
  import PlayerFooter from '@/components/PlayerFooter.vue'
  import SideMenu from '@/components/SideMenu.vue'
  @Component({
    components: {SideMenu, PlayerFooter},
  })
  export default class App extends Vue {
    private menu = false
  }
</script>
