import { Controller } from '@hotwired/stimulus'
import debounce from 'lodash.debounce'

export default class UnsplashSearch extends Controller {
   static targets = ['results']
   static values = { fieldName: String }

   initialize() {
      this.search = debounce(this.search.bind(this), 300)
   }

   async search(event) {
      if(!event.target.value) return

      const url = new URL('/unsplash/search', location.href)
      url.search = new URLSearchParams({ q: event.target.value, field_name: this.fieldNameValue }).toString()

      const response = await fetch(url)
      const html = await response.text()

      this.resultsTarget.innerHTML = html
   }
}
