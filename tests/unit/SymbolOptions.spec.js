import SymbolOptions from '@/components/SymbolOptions.vue';
import Vuex from 'vuex';
import store from '@/store';
import {createLocalVue, shallowMount} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

global.fetch = jest.fn(() => Promise.resolve([{symbol:'TLSA', latestPrice: 1023.92, change: -20.58}]));

describe("SymbolOptions", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount(SymbolOptions, {
      localVue,
      store
    });
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('Submit button fires addSymbol and submitSymbol event with valid input. Symbol input is then cleared', async () => {
    const submitSymbol = jest.spyOn(wrapper.vm, 'submitSymbol');
    const addSymbol = jest.spyOn(wrapper.vm, 'addSymbol');
    await wrapper.setData({symbol: 'GNUS'});
    await wrapper.findAll('#symbolOptions-addSymbol button').at(0).trigger('click');
    expect(submitSymbol).toHaveBeenCalled();
    expect(addSymbol).toHaveBeenCalled();
    expect(wrapper.findAll('input').at(0).text()).toMatch('');
  });

  it('Submit button fires submitSymbol event and then throws error to user on incorrect input', async () => {
    const submitSymbol = jest.spyOn(wrapper.vm, 'submitSymbol');
    const addSymbol = jest.spyOn(wrapper.vm, 'addSymbol');
    await wrapper.setData({symbol: ''});
    await wrapper.findAll('#symbolOptions-addSymbol button').at(0).trigger('click');
    expect(submitSymbol).toHaveBeenCalled();
    expect(addSymbol).not.toHaveBeenCalled();
    expect(wrapper.findAll('input').at(0).classes()).toContain('input-error');
  });

  it('Refresh button fires getSymbolData event', async () => {
    const getSymbolData = jest.spyOn(wrapper.vm, 'getSymbolData');
    await wrapper.find('#symbolOptions-refreshBtn').trigger('click');
    expect(getSymbolData).toHaveBeenCalled();
  });
});
