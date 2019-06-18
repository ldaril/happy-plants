import { shallowMount, createLocalVue } from '@vue/test-utils'
import Menu from '@/app/settings/screens/Menu'
import Button from '@/components/Button'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/screens/Menu.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-button': Button,
      'better-dialog': '<div />',
      'file-upload': '<div />',
      'feather-tag': '<svg />',
      'feather-database': '<svg />',
      'feather-save': '<svg />',
      'feather-users': '<svg />',
      'feather-file-text': '<svg />',
      'feather-twitter': '<svg />',
      'feather-google': '<svg />',
      'feather-github': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Menu, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('before destroying calls action when new release', () => {
    const wrapper = shallowMount(Menu, {
      ...options,
      computed: {
        hasNewRelease: () => true
      }
    })
    wrapper.setMethods({ hasSeenNewRelease: jest.fn() })
    wrapper.destroy()
    expect(wrapper.vm.hasSeenNewRelease).toHaveBeenCalled()
  })

  it('before destroying does nothing if no new release', () => {
    const wrapper = shallowMount(Menu, options)
    wrapper.setMethods({ hasSeenNewRelease: jest.fn() })
    wrapper.destroy()
    expect(wrapper.vm.hasSeenNewRelease).not.toHaveBeenCalled()
  })
})
