import styled from 'styled-components'
import { scarlet } from '@apaleslimghost/colours'

const bannerWidth = 6

const Ribbon = styled.a`
	display: block;
	position: absolute;
	font-size: 0.7em;
	padding: 0.1em 0;
	top: ${bannerWidth / Math.SQRT2 - Math.SQRT2}em;
	left: 0;
	background: ${scarlet[2]};
	color: white;
	width: ${bannerWidth}em;
	text-decoration: none;
	text-align: center;
	z-index: 1;
	transform-origin: bottom left;
	transform: rotate(-45deg);

	&:hover,
	&:active {
		background: ${scarlet[3]};
	}
`

export default Ribbon
