import crypto from 'crypto'
import url from 'url'
import styled, { css } from 'styled-components'

const Gravatar = styled.img.attrs(({ email }) => ({
	src: email
		? formatGravatarUrl(email)
		: 'https://www.gravatar.com/avatar/empty?f=y&d=mp',
	alt: `Profile picture${email ? ` for ${email}` : ''}`,
}))`
	border-radius: 100%;
	vertical-align: -0.2em;
	${({ small }) =>
		small
			? css`
					height: 1em;
					width: 1em;
					margin-right: 0.25em;
			  `
			: css`
					height: 2em;
					width: 2em;
					margin: -0.5em 0.5em -0.5em 0;
			  `}
`

const gravatarHash = email =>
	crypto
		.createHash('md5')
		.update(email.trim().toLowerCase())
		.digest('hex')

const formatGravatarUrl = email =>
	url.format({
		scheme: 'https',
		host: 'www.gravatar.com',
		pathname: `/avatar/${gravatarHash(email)}`,
		query: {
			d: 'identicon',
		},
	})

export default Gravatar
