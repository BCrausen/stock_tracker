import SymbolContainer from '@/components/SymbolContainer.vue';
import Vuex from 'vuex';
import store from '@/store';
import {createLocalVue, shallowMount} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

global.fetch = jest.fn(() => Promise.resolve([{symbol:'TLSA', latestPrice: 1023.92, change: -20.58}]));

describe("SymbolContainer", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(SymbolContainer, {
      localVue,
      store
    });
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('getSymbolData is called upon init', () => {
    const getSymbolData = jest.spyOn(wrapper.vm, 'getSymbolData');
    SymbolContainer.created.call(wrapper.vm);
    expect(getSymbolData).toHaveBeenCalled();
  });
});
