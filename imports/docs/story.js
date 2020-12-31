import React from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'

export default function Story({ children }) {
	const child = children()

	return (
		<>
			{child}

			<pre>{reactElementToJSXString(child)}</pre>
		</>
	)
}
