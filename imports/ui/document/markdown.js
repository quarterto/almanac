import React from 'react'
import Markdown from 'react-markdown'
import behead from 'remark-behead'
import styled from 'styled-components'
import * as headings from '../visual/heading'

export const markdownComponents = {
	blockquote: styled.blockquote`
		border-left: 3px solid rgba(0, 0, 0, 20%);
		margin: 0;
		padding: 0em 1em;
		overflow: hidden; // prevent paragraph margins collapsing
		font-size: 1.1em;
		font-family: 'Libre Baskerville', serif;
	`,
	h1: headings.H1,
	h2: headings.H2,
	h3: headings.H3,
	h4: headings.H4,
	h5: headings.H5,
	h6: headings.H6,
}

export default ({ excerpt, ...props }) => (
	<Markdown
		plugins={[[behead, { depth: 1 }]]}
		renderers={{
			...markdownComponents,
			root: ({ children }) => (
				<>
					{excerpt
						? children.find(child => child.type === 'p') || children[0]
						: children}
				</>
			),
		}}
		{...props}
	/>
)
