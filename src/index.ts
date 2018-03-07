import {remove, throttle} from 'lodash';
import Vue, {PluginObject, PluginFunction} from 'vue';

interface elmItem {
  elm: HTMLElement,
  src: String,
}

interface constructOption {
  defaultImgSrc: String,
  errorImgSrc: String,
}

class lazyload<T> implements PluginObject<T> {
  private listenList: Array<elmItem> = [];
  private imageCatchList: Array<String> = [];
  private elmsCacheList: Array<elmItem> = [];
  defaultImgSrc: String;
  errorImgSrc: String;

  constructor(opt: constructOption) {
    this.defaultImgSrc = opt.defaultImgSrc;
    this.errorImgSrc = opt.errorImgSrc;
    return;
  }

  install(vue: typeof Vue, options?: T) {
    vue.directive('lazyload', {
      bind: this.changeDefaultSrc.bind(this),
      inserted: this.addListener.bind(this),
      // inserted: ,
      // updated: addListener,
    });
    this.initScrollListener();
  }

  private changeDefaultSrc(elm) {
    const imageSrc = elm.src;
    elm.src = this.defaultImgSrc;
    const imgElmItem: elmItem = {
      elm,
      src: imageSrc,
    };
    this.elmsCacheList.push(imgElmItem);
  }

  private initScrollListener() {
    window.addEventListener('scroll', throttle(() => {
      this.listenList.map(item => {
        if (this.isCanShow(item)) {
          this.show(item);
        }
      })
    }, 100));
  }

  private addListener(elm, binding) {
    const imageSrc = this.elmsCacheList.filter(item => {
      return item.elm == elm;
    })[0].src;
    if (this.isAlreadyLoad.bind(this)(imageSrc)) {
      elm.src = imageSrc;
      return false;
    }
    const item: elmItem = {
      elm: elm,
      src: imageSrc,
    };
    if (this.isCanShow(item)) {
      this.show(item);
      return;
    }

    this.listenList.push(item);
  }

  private isAlreadyLoad(imageSrc: String) {
    if (this.imageCatchList.indexOf(imageSrc) > -1) {
      return true;
    } else {
      return false;
    }
  }

  private isCanShow(item) {
    const elm = item.elm;
    const top = elm.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elm.getBoundingClientRect().height == 0) return;// display: none
    if (top + 10 < windowHeight) {
      return true;
    } else {
      return false;
    }
  };

  private show(item) {
    if(this.listenList.indexOf(item) < 0) return;

    const elm = item.elm;
    const src = item.src;
    let imgElm = new Image(1, 1);
    imgElm.src = src;
    this.imageCatchList.push(src);
    remove(this.listenList, (n) => {
      return n == item;
    });
    imgElm.onload = () => {
      elm.style.opacity = 0;
      setImmediate(() => {
        elm.src = src;
        elm.style.transition = 'opacity .5s';
        elm.style.opacity = 1;
      });
    };

  }

}

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(lazyload);
// }
export default lazyload;
