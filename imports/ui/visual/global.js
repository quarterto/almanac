import url from 'url'
import { createGlobalStyle } from 'styled-components'
import { steel, sky } from '@apaleslimghost/colours'
import { background } from '../utils/colors'

const buildGoogleFontsUrl = fonts =>
	url.format({
		protocol: 'https',
		host: 'fonts.googleapis.com',
		pathname: 'css',
		query: {
			family: Object.keys(fonts)
				.map(
					font =>
						`${font}${
							fonts[font].length > 0 ? `:${fonts[font].join(',')}` : ''
						}`,
				)
				.join('|'),
		},
	})

export default createGlobalStyle`
	@import url(${buildGoogleFontsUrl({
		'Source Sans Pro': ['400', '400i', '700', '700i'],
		'Libre Baskerville': [],
	})});

	@font-face {
		font-family: 'PC Ornaments';
		src: url('/fonts/pc-ornaments.woff2') format('woff2');
	}

	body {
		font-family: 'Source Sans Pro', sans-serif;
		margin: 0;
		background: ${background};
		color: ${steel[0]};
	}

	* {
		box-sizing: border-box;
	}

	:focus {
		outline: 3px solid ${sky[3]};
	}
`
