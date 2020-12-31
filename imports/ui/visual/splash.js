import qs from 'querystring'
import React from 'react'
import styled, { css } from 'styled-components'
import { aqua, steel } from '@apaleslimghost/colours'
import contrast from 'contrast'
import { useImage } from '../data/image'
import { useCampaign } from '../data/campaign'
import { useOwner } from '../data/owner'
import select from '../utils/select'

const getSplashUrl = ({ urls }, { _2x = false } = {}) =>
	urls.raw +
	'&' +
	qs.stringify(
		Object.assign(
			{
				fit: 'crop',
				crop: 'entropy',
			},
			_2x
				? {
						q: 20,
						w: 1800,
						h: 600,
				  }
				: {
						q: 70,
						w: 900,
						h: 300,
				  },
		),
	)

export const SplashBackground = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;

	color: ${({ image, url, color = '#fff' }) =>
		image || url || contrast(color) === 'dark' ? 'white' : steel[0]};

	${({ image, url }) =>
		image || url
			? css`
					background-image: linear-gradient(
							rgba(0, 20, 40, 0) 30%,
							rgba(0, 20, 40, 0.9)
						),
						url(${image ? getSplashUrl(image) : url});
			  `
			: css`
					&:not(:last-child) {
						border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					}
			  `}

	background-color: ${({ image, color }) => (image ? image.color : color)};

	${({ image, url2x }) =>
		(image || url2x) &&
		css`
			@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
				background-image: linear-gradient(
						rgba(0, 20, 40, 0) 30%,
						rgba(0, 20, 40, 0.9)
					),
					url(${image ? getSplashUrl(image, { _2x: true }) : url2x});
			}
		`}

	background-size: cover;
	background-position: center;
`

export const SplashBleed = styled(SplashBackground)`
	grid-column: bleed;
	margin-top: -1rem;

	width: 100vw;

	${({ image, url, ready }) =>
		(url || image || ready === false) &&
		css`
			height: ${select({
				large: '60vw',
				small: '30vw',
				default: '40vw',
			})};

			max-height: ${select({
				large: '60vh',
				small: '30vh',
				default: '40vh',
			})};
		`}
`

export const SplashAccessory = styled.div`
	position: absolute;
	top: 1em;
	${css`
		${({ right }) => (right ? 'right' : 'left')}: 1em;
	`}
`

export const Hero = styled.div`
	margin-top: auto;

	a:link,
	a:visited {
		color: inherit;
		font-weight: bold;
	}

	a:hover {
		color: ${aqua[5]};
	}

	a:active {
		color: ${aqua[4]};
	}
`

export const HeroTitle = styled.h2`
	font-family: 'Libre Baskerville', serif;
	font-weight: normal;
	text-align: center;

	font-size: 1.4em;
	margin: 0.5rem 0 0.5rem;

	${SplashBleed} & {
		@media (min-width: 25em) {
			font-size: 2em;
			margin: 1rem 0 1rem;
		}

		@media (min-width: 40em) {
			font-size: 2.4em;
			margin: 2rem 0 2rem;
		}
	}
`

export const HeroSubtitle = styled.h3`
	font-family: 'Libre Baskerville', serif;
	font-weight: normal;
	text-align: center;
	font-variant: small-caps;
	margin: 0 0 0.5rem;

	${SplashBleed} & {
		@media (min-width: 25em) {
			font-size: 1.2em;
		}

		@media (min-width: 40em) {
			font-size: 1.4em;
		}
	}
`

export const HeroBlurb = styled.p`
	line-height: 1.6;
	font-family: 'Libre Baskerville', serif;
	text-align: center;
	padding: 0 1em;
	margin: 0 0 1em;
	font-size: 0.8em;

	${SplashBleed} & {
		@media (min-width: 25em) {
			font-size: 1em;
		}

		@media (min-width: 40em) {
			font-size: 1.2em;
		}
	}
`

export const CampaignSplash = ({ noBlurb, children }) => {
	const campaign = useCampaign()
	const { owner } = useOwner(campaign)
	const { image, ready } = useImage(campaign.theme)

	return (
		<SplashBleed image={image} ready={ready}>
			<Hero>
				{children}
				<HeroTitle>{campaign.title}</HeroTitle>
				{!noBlurb && (campaign.tagline || owner) && (
					<HeroBlurb>
						{campaign.tagline || `A campaign by ${owner.username}`}
					</HeroBlurb>
				)}
			</Hero>
		</SplashBleed>
	)
}
