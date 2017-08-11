<template>
  <transition name="back-to-top-fade">
    <div class="vue-back-to-top" v-show="visible" @click="backToTop">
      <img :src="img">
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    img: {
      type: String,
      default: '/static/images/icon_top.png'
    },
    visibleOffset: {
      type: [String, Number],
      default: 600
    }
  },
  data() {
    return {
      visible: false
    }
  },
  created() {
    let catchScroll = () => {
      this.visible = (window.pageYOffset > parseInt(this.visibleOffset))
    }
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        requestAnimFrame(window.smoothscroll)
        window.scrollTo(0, currentScroll - (currentScroll / 5))
      }
    }
    this.onscroll(window, 'scroll', catchScroll);
    // window.onscroll = catchScroll
  },
  methods: {
    backToTop() {
      window.smoothscroll()
    }
  }
}
</script>
<style scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity .7s;
}

.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  filter: alpha(Opacity=0);
  -moz-opacity: 0;
  opacity: 0;
}

.vue-back-to-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 160px;
  border-radius: 3px;
  z-index: 1000;
  cursor: pointer;
  filter: alpha(Opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
}

.vue-back-to-top:hover {
  filter: alpha(Opacity=100);
  -moz-opacity: 1;
  opacity: 1;
  -webkit-transition: all .6s ease;
  transition: all .6s ease;
}
</style>