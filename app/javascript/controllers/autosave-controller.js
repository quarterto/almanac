import { Controller } from '@hotwired/stimulus'
import debounce from 'lodash.debounce'
import api from '../lib/api'

export default class extends Controller {
  connect() {
	 this.save = debounce(this.save.bind(this), 500)
  }

  async save() {
    await api(this.element.action, new FormData(this.element), {method: 'PATCH'})
  }
}
