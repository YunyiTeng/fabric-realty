<template>
    <div v-if="isExternal" :style="styleExternalIcon" class="icon-external-icon icon" v-on="$listeners" />
    <img v-else :src="iconName" :class="iconClass" v-on="$listeners" />
  </template>
  
  <script>
  import { isExternal } from '@/utils/validate'
  
  export default {
    name: 'PngIcon',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    computed: {
      isExternal() {
        return isExternal(this.iconClass)
      },
      iconName() {
        return require(`@/icons/png/${this.iconClass}.png`)
      },
      iconClass() {
        if (this.className) {
          return 'png-icon ' + this.className
        } else {
          return 'png-icon'
        }
      },
      styleExternalIcon() {
        return {
          background: `url(${this.iconClass}) no-repeat center center`,
          backgroundSize: 'cover'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .png-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
  </style>
  