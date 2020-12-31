import React from 'react'
import styled from 'styled-components'
import colours from '@apaleslimghost/colours'
import { H2 } from '../ui/visual/heading'
import { List } from '../ui/visual/primitives'
import { readableColor } from 'polished'

export const title = 'Colours'
export const category = 'Basics'

const Swatch = styled.div`
	background: ${({ colour }) => colour};
	color: ${({ colour }) => readableColor(colour)};
	padding: 0.5em;
	width: 5em;
	height: 5em;
`

function getKeysWithValue(object, value, ignore) {
	return Object.keys(object).filter(
		key => key != ignore && object[key] === value,
	)
}

export default () => (
	<>
		{Object.keys(colours).map(colour => (
			<div key={colour}>
				<H2>{colour}</H2>
				<List>
					{colours[colour].map((hex, index) => (
						<Swatch key={hex} colour={hex}>
							{index}
							<br />
							<small>
								{getKeysWithValue(colours[colour], hex, index).join(', ')}
							</small>
						</Swatch>
					))}
				</List>
			</div>
		))}
	</>
)
