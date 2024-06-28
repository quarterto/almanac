import { Controller } from '@hotwired/stimulus'

export default class PopupLink extends Controller {
	open(event) {
		event.preventDefault()
		window.open(event.target.href, 'dashboard', 'width=600,height=400')
	}
}
