import { mount } from '@vue/test-utils'

import WrappedComponent from './Wrapped.vue'

describe('render function w/ props and default slot', () => {
  it('renders correctly', () => {
    const wrapper = mount(WrappedComponent)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should re-render', async () => {
    const wrapper = mount(WrappedComponent)

    await wrapper.setProps({
      value: 1
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
