<template lang="pug">
  v-card#edit(:loading="isLoading")
    v-container
      v-row
        v-col.headline.text-center.white--text Edit Voice
      v-row
        v-col(offset-md="1" md="10")
          v-row
            v-col(md="5")
              v-text-field(v-model="value.title" label="Title")
            v-col(md="5")
              v-text-field(v-model="value.ruby" label="Ruby")
            v-col(md="2")
              v-text-field(v-model="value.index" label="Index" type="number")
      v-row
        v-col(offset-md="1" md="10")
          v-combobox(v-model="value.tags" :items="tagList" chips deletable-chips label="Tags" multiple)
      v-row
        v-col(offset-md="1" md="10")
          v-text-field(v-model="value.archiveUrl" label="ArchiveURL" type="url")
      v-row
        v-col(offset-md="1" md="10")
          v-row
            v-col
              v-text-field(v-model="value.voiceUrl" disabled label="VoiceURL")
            v-btn(fab @click="$emit('play', value.voiceUrl)")
              v-icon mdi-play
      v-row
        v-col(offset-md="1" md="10")
          v-row(align="center" justify="space-around")
            v-btn.mr-md-12(@click="$emit('close')" x-large) Cancel
            v-btn.mr-md-4(@click="update" color="success" x-large) Update
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
  
  
  @Component
  export default class Edit extends Vue {
    @Prop()
    private value!: VoiceData & {id: string}

    private tagList: string[] = []
    private isLoading = false

    private update() {
      this.isLoading = true
      const id = this.value.id
      delete this.value.id
      this.$emit('update', id, this.value)
    }

    @Watch('value')
    private onChangeValue() {
      this.isLoading = false
    }

  }
</script>

<style scoped lang="stylus">

</style>
