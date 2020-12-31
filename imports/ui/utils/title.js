import React from 'react'
import { Helmet } from 'react-helmet'

export default ({ children, ...props }) => (
	<Helmet defaultTitle='Almanac' titleTemplate='%s ✢ Almanac' {...props}>
		{children && <title>{children}</title>}
	</Helmet>
)
