import { Controller } from "js/stimulus"

const dlChildTagTypes = ['dt', 'dd']

let accordionCounter = 0

export default class extends Controller {
  connect() {
    // we cannot use stimulus targets here since we do not control the contained HTML
    // from within rails
    this.listEl = this.element.querySelector("dl")
    let itemIndex = 0
    const accordionId = `cms-accordion-${accordionCounter}`
    accordionCounter++

    if (this.listEl) {
      let nextTagIndex = 0
      let nextItem = []
      this.listEl.style.display = 'none'
      this.accordionEl = document.createElement('div')
      this.accordionEl.id = accordionId
      this.accordionEl.classList.add("accordion")

      let collapseId

      for (const child of this.listEl.children) {
        collapseId = `${accordionId}-collapse-${itemIndex}`

        if (dlChildTagTypes[nextTagIndex] === child.tagName.toLowerCase()) {

          // on last tag for a dl item (the dd in most cases) we create a accordion item from it
          if ((nextTagIndex + 1) == dlChildTagTypes.length) {
            const collapse = document.createElement('div')
            const body = document.createElement('div')

            body.innerHTML = child.innerHTML
            body.classList.add('accordion-body')

            collapse.append(body)
            collapse.classList.add('accordion-collapse', 'collapse')
            collapse.dataset.bsParent = `#${accordionId}`
            collapse.id = collapseId


            if (itemIndex === 0) {
              collapse.classList.add('show')
            }

            const newItem = document.createElement('div')

            nextItem.push(collapse)
            newItem.classList.add('accordion-item')
            newItem.append(...nextItem)


            this.accordionEl.append(newItem)

            nextItem = []
            itemIndex++
          } else {
            const header = document.createElement('div')
            const button = document.createElement('button')

            button.innerHTML = child.innerHTML
            button.type = 'button'
            button.classList.add('accordion-button')
            button.dataset.bsToggle = 'collapse'
            button.dataset.bsTarget = `#${collapseId}`

            if (itemIndex > 0) {
              button.classList.add('collapsed')
            }

            header.append(button)
            header.classList.add('accordion-header')

            nextItem.push(header)
          }

          nextTagIndex = (nextTagIndex + 1) % dlChildTagTypes.length
        } else {
          console.error('invalid accordion order', dlChildTagTypes[nextTagIndex], child.tagName.toLowerCase())
        }
      }

      this.listEl.parentNode.insertBefore(this.accordionEl, this.listEl)
    }
  }
}
