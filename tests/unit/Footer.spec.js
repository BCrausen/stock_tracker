import Footer from '@/components/Footer.vue';
import {shallowMount} from '@vue/test-utils';

describe("Footer", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount(Footer);
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('Default Render', () => {
    expect(wrapper.findAll('span').at(0).text()).toMatch('Stocks are pulled from the IEX Cloud API');
  });
});
