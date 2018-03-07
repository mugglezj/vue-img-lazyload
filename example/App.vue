<template>
  <div id="app">
    <div style="height: 2000px;"></div>
    <img :src="require('./assets/1.jpeg')" alt="" v-lazyload>
    <img :src="require('./assets/2.jpeg')" alt="" v-lazyload>
    <img :src="require('./assets/2.jpeg')" alt="" v-lazyload>
    <img :src="require('./assets/3.jpg')" alt="" v-lazyload>
    <img :src="require('./assets/4.jpg')" alt="" v-lazyload>
    <img :src="require('./assets/5.jpg')" alt="" v-lazyload>
    <img :src="require('./assets/5.jpg')" alt="" v-lazyload>
  </div>
</template>

<script lang="ts">
  import LazyLoad from '../src/index.ts';
  import _Vue, {PluginObject} from 'vue';
  import Component from 'vue-class-component'

  // type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
  // <PluginObject<String>>

  const defaultImgSrc: String = 'http://mppic-test.zone1.meitudata.com/5a6ecb58419491093.jpg!thumb320';
  const errorImgSrc: String = 'http://mppic-test.zone1.meitudata.com/5a6ecb58419491093.jpg!thumb320';
  _Vue.use(new LazyLoad({defaultImgSrc, errorImgSrc}));
  // const a = new LazyLoad();
  // console.log(a.imageCatchList);
  @Component
  export default class App extends _Vue {
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  img {
    border: 1px solid #000;
    width:  100%;
  }
</style>
