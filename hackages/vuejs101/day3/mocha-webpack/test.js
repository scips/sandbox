    import { Counter } from './Counter.vue'
    import { mount } from 'vue-test-utils'

    describe('demo', () => {
      it('should load the componet', () => {
        const counter = mount(Counter, {
          propsData: {
            count: 1
          }
        })
        expect(counter.text().toBe(1))

        counter.setProps({
          count: 2
        })
        expect(counter.text().toBe(2))

        counter.trigger('click')

        // counter.emitted() is an information that is emitted by the component
        expect(counter.emitted().increment).toBeTruthy()

      })

    })
