import NavBar from '@/components/NavBar.vue';
import {shallowMount} from '@vue/test-utils';

describe("NavBar", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      stubs: ['router-link']
    });
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('Default Render', () => {
    expect(wrapper.findAll('router-link-stub').at(0).text()).toMatch('Tracker');
    expect(wrapper.findAll('router-link-stub').at(0).attributes().to).toMatch('/');
    expect(wrapper.findAll('router-link-stub').at(1).text()).toMatch('Settings');
    expect(wrapper.findAll('router-link-stub').at(1).attributes().to).toMatch('/settings');
  });
});
