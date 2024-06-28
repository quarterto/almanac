import { Controller } from '@hotwired/stimulus'
import debounce from 'lodash.debounce'

import { Editor, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import api from '../lib/api'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Placeholder from '@tiptap/extension-placeholder'
import FloatingMenu from '@tiptap/extension-floating-menu'
import Focus from '@tiptap/extension-focus'
import Mention from '@tiptap/extension-mention'
import cardMentionSuggestion from '../lib/card-mention-suggestion'

// Connects to data-controller="editor"
export default class extends Controller {
  static values = { action: String, search: String }
  static targets = ['content', 'rendered', 'editor', 'bubbleMenu', 'floatingMenu']

  connect() {
    this.saveContent = debounce(this.saveContent.bind(this), 500)
    const content = JSON.parse(this.contentTarget.innerText)

    this.editor = new Editor({
      element: this.editorTarget,
      content,
      onCreate: () => {
        if(this.renderedTarget) {
          this.renderedTarget.remove()
        }
      },
      onUpdate: () => {
        this.saveContent()
      },
      extensions: [
        StarterKit,
        Placeholder,
        Focus,
        BubbleMenu.configure({
          element: this.bubbleMenuTarget,
          tippyOptions: {
            theme: 'light-border',
            arrow: false
          }
        }),
        FloatingMenu.configure({
          element: this.floatingMenuTarget,
          tippyOptions: {
            theme: 'light-border',
            arrow: false
          }
        }),
        Mention.configure({
          suggestion: cardMentionSuggestion({ searchPath: this.searchValue }),
          renderHTML({ options, node }) {
            return [
              "a",
              mergeAttributes({ href: node.attrs.id }, options.HTMLAttributes),
              `${options.suggestion.char}${node.attrs.label}`,
            ]
          }
        })
      ]
    })
  }

  async saveContent() {
    const content = this.editor.getJSON()
    const results = await api(this.actionValue, { card: { content } }, {method: 'PATCH'})

    console.log(results)
  }

  format(event) {
    const { format, args } = event.params

    this.editor.chain()[format](args).focus().run()
  }
}
