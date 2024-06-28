import tippy from "tippy.js"
import api from "./api"
import { h } from "jsx-dom"
import htm from "htm"

const html = htm.bind(h)

const SuggestionList = (props) => html`
<ul>
	${props.items.map(card => html`
		<li><button onClick=${event => {
			event.preventDefault()
			props.command({
				id: card.href,
				label: card.name
			})
		}}>${card.name}</button></li>
	`)}
</ul>
`

export default ({ searchPath }) => ({
	allowSpaces: true,

	async items({ query }) {
		const url = new URL(searchPath, location.href)
		url.searchParams.set('q', query)
		url.searchParams.set('count', 5)
		const { items } = await api(url, null, {method: 'GET'})

		return items
	},

	render() {
		// let component
		let popup

		return {
			onStart(props) {
				popup = tippy('body', {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: SuggestionList(props),
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start',
					theme: 'light-border',
					arrow: false
				})
			},

			onUpdate(props) {
				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
					content: SuggestionList(props),
				})
			},

			onKeyDown(props) {
			  if (props.event.key === 'Escape') {
				 popup[0].hide()

				 return true
			  }

			//   return component.ref?.onKeyDown(props)
			},

			onExit() {
			  popup[0].destroy()
			},
		}
	}
})
