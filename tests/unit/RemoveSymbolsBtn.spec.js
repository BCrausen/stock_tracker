import RemoveSymbolsBtn from '@/components/RemoveSymbolsBtn.vue';
import Vuex from 'vuex';
import store from '@/store';
import {createLocalVue, shallowMount} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

describe("RemoveSymbolsBtn", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(RemoveSymbolsBtn, {
      localVue,
      store
    });
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('Remove button fires removeAllSymbols event', async () => {
    const removeAllSymbols = jest.spyOn(wrapper.vm, 'removeAllSymbols');
    await wrapper.find('#settings-removeSymbolsBtn').trigger('click');
    expect(removeAllSymbols).toHaveBeenCalled();
  });
});
