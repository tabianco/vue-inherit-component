import { mount } from '@vue/test-utils'

import WrappedComponent from './Wrapped.vue'

describe('<template> w/ named slot', () => {
  it('renders correctly', () => {
    const wrapper = mount(WrappedComponent)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should re-render', async () => {
    const wrapper = mount(WrappedComponent)

    await wrapper.setProps({
      value: true
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
