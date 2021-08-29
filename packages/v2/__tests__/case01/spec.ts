import { mount } from '@vue/test-utils'

import WrappedComponent from './Wrapped.vue'

describe('simplest component', () => {
  const wrapper = mount(WrappedComponent)

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
