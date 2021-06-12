# @tabianco/vue-inherit-component

[![GitHub Actions](https://github.com/tabianco/vue-inherit-component/workflows/ci/badge.svg?branch=main)](https://github.com/tabianco/vue-inherit-component/actions?query=workflow%3Aci)
[![npm (scoped with tag)](https://flat.badgen.net/npm/v/@tabianco/vue-inherit-component)](https://npmjs.com/package/@tabianco/vue-inherit-component)
[![npm](https://flat.badgen.net/npm/dt/@tabianco/vue-inherit-component)](https://npmjs.com/package/@tabianco/vue-inherit-component)

Overrides default behavior of pre-defined Vue2 components.

_Note: this library works only with Vue2_

## Usage

1. Add this package to your dependencies

```bash
$ npm i -S @tabianco/vue-inherit-component
# or
$ yarn add @tabianco/vue-inherit-component
```

2. Use in your component `.vue` file

```javascript
import { inheritComponent } from '@tabianco/vue-inherit-component'
```

## Full example

A full example creating a component inheriting `SomeComponent` from an `awesome-vue-component-library`.

```javascript
import { inheritComponent } from '@tabianco/vue-inherit-component'

import SomeComponent from 'awesome-vue-component-library'

export default inheritComponent(SomeComponent, {
  computedClass (props) {
    return {
      readonly: props.readonly
    }
  },

  computedProps (props) {
    if (props.readonly) {
      return {
        ...props,
        color: 'gray'
      }
    } else {
      return props
    }
  },

  props: {
    color: {
      type: String
    },

    readonly: {
      type: Boolean
    }
  }
})
```

## License

MIT - Tabian Co.
