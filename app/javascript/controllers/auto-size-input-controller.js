import { Controller } from '@hotwired/stimulus'
import tick from '../lib/tick'

export default class extends Controller {
	connect() {
		const wrapper = document.createElement('div')
		wrapper.setAttribute('aria-hidden', true)
		wrapper.classList.add('autosize-wrapper')

		this.div = document.createElement('div')
		this.div.classList.add('autosize-content')

		wrapper.appendChild(this.div)
		this.element.insertAdjacentElement('afterend', wrapper)

		this.update()
	}

  async update() {
	this.div.innerHTML = (this.element.value || this.element.getAttribute('placeholder')).replace(/ /g, '&nbsp;')
	await tick()

	const { width } = this.div.getBoundingClientRect()
	this.element.style.width = `${width + 5}px`
  }
}
