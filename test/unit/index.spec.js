import Lazyload from '../../src/index.ts';
import Vue from 'vue';
import App from '../../example/App.vue';

describe('start test', () => {

  let el;
  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  it('Lazyload', (done) => {

    const vm = new Vue({
      template: `<app></app>`,
      components: {App},
      mounted() {
        let elms = document.getElementsByTagName('img');
        expect(elms[0].src).toEqual('http://mppic-test.zone1.meitudata.com/5a6ecb58419491093.jpg!thumb320');
        fireEvent(window, 'scrollTo', 0, 1000);
        // window.scrollTo(0, 2000 - document.documentElement.clientHeight);
        expect(elms[0].src).toEqual('http://mppic-test.zone1.meitudata.com/5a6ecb58419491093.jpg!thumb320');
        // window.scrollTo(0, 2000 - document.documentElement.clientHeight + 50);
        fireEvent(window, 'scrollTo', 0, 2000);
        done();
      },
    }).$mount(el);
  });
});

const fireEvent = function (elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }

  const evt = document.createEvent(eventName);
  evt.initEvent(name, ...opts);
console.log(evt);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};
