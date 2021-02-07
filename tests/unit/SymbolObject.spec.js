import SymbolObject from '@/components/SymbolObject.vue';
import Vuex from 'vuex';
import store from '@/store';
import {createLocalVue, shallowMount} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

describe("SymbolObject", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount(SymbolObject, {
      localVue,
      store,
      propsData: {
        symbol: 'GNUS',
        price: 1.79,
        change: -0.02,
      }
    });
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('Renders with valid props', () => {
    expect(wrapper.findAll('p').at(0).text()).toMatch('GNUS');
    expect(wrapper.findAll('strong').at(0).text()).toMatch('$1.79');
    expect(wrapper.findAll('span').at(0).text()).toMatch('(-0.02)');
  });

  it('Object is missing props', async () => {
    await wrapper.setProps({symbol: null, price: null, change: null});
    expect(wrapper.findAll('p').at(0).text()).toMatch('?');
    expect(wrapper.findAll('strong').at(0).text()).toMatch('Unavaliable');
    expect(wrapper.findAll('span').at(0).text()).toMatch('(Unavaliable)');
  });

  it('Object has positive class on positive change', async () => {
    await wrapper.setProps({change: 0.02});
    expect(wrapper.findAll('.symbolObject').at(0).classes()).toContain('symbolObject-positive');
  });

  it('Object has negative class on negative change', () => {
    expect(wrapper.findAll('.symbolObject').at(0).classes()).toContain('symbolObject-negative');
  });

  it('Delete button fires both submitDeleteSymbol and Vuex deleteSymbol actions', async () => {
    const submitDeleteSymbol = jest.spyOn(wrapper.vm, 'submitDeleteSymbol');
    const vuexDeleteSymbol = jest.spyOn(wrapper.vm, 'deleteSymbol');
    await wrapper.findAll('img').at(0).trigger('click');
    expect(submitDeleteSymbol).toHaveBeenCalled();
    expect(vuexDeleteSymbol).toHaveBeenCalled();
  });
});
