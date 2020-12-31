import React from 'react'
import styled, { css } from 'styled-components'
import colours from '@apaleslimghost/colours'
import contrast from 'contrast'
import composeStyles from '@quarterto/styled-compose'

const clamp = (min, max) => n => Math.min(max, Math.max(min, n))
const validShade = clamp(0, colours.sky.length)

export const background = ({ colour = 'sky', shade = 3 }) => {
	const bg = colours[colour][validShade(shade)]

	return css`
		background: ${bg};
		color: ${contrast(bg) === 'dark' ? 'white' : colours.steel[0]};
	`
}

export const shadow = (level = 1) =>
	[0, 5, 4 * level - 3.5, 2 * level - 5]
		.map(a => `${a}px`)
		.concat('rgba(0, 0, 0, 0.2)')
		.join(' ')

export const etched = ({
	colour = 'sky',
	shade = 3,
	sunken = false,
	focused = false,
}) => css`
	${
		sunken
			? css`
					background-color: white;
			  `
			: background({ colour, shade })
	}
	border: solid 1px ${colours[colour][shade - 1]};
	box-shadow: ${[
		sunken && `inset ${shadow()}`,
		focused && `0 0 3px 2px ${colours.sky[4]}`,
	]
		.filter(i => i)
		.join() || 'unset'};
`

export const colourTransitions = css`
	transition-property: box-shadow, transform, background, opacity;
	transition-duration: 100ms;
	transition-timing-function: linear;
`

export const List = styled.div`
	display: flex;
	align-items: ${({ vertical }) => (vertical ? 'stretch' : 'flex-start')};
	flex-wrap: wrap;
	flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
	margin: -${({ spaced }) => (spaced ? '0.5em' : '2px')};

	& > * {
		margin: ${({ spaced }) => (spaced ? '0.5em' : '2px')};
	}
`

export const Padded = styled.div`
	margin: 1rem;
`

export const Card = styled.div`
	grid-column-end: span ${({ large }) => (large ? 2 : 1)};
	border: 1px solid ${colours.steel[3]};
	padding: 1rem 1rem 0;
	border-radius: 2px;
	box-shadow: ${shadow()};
	column-width: 18em;
	column-gap: 1rem;
`

export const Label = styled.span`
	display: inline-block;
	${etched}
	${({ large }) =>
		!large &&
		css`
			font-size: 0.8em;
		`}
	padding: .25em 0;
	border-radius: 0.15em;
`

export const LabelBody = styled.span`
	padding: 0 0.6em;
`

export const LabelTitle = styled.span`
	display: inline-block;
	${({ colour = 'sky', shade = 3 }) => background({ colour, shade: shade - 1 })}
	padding: .25em .6em;
	margin: -0.25em 0;
	border: 0 solid ${({ colour = 'sky', shade = 3 }) => colours[colour][shade]};

	border-right-width: 1px;

	&:first-child {
		border-radius: 0.15em;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	&:last-child {
		border-radius: 0.15em;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	${LabelBody} ~ & {
		border-right-width: 0;
		border-left-width: 1px;
		margin-right: -1px; /* but why? */
	}
`

// i hate this
export const UnstyledButton = styled.button`
	background: none;
	border: none;
	font: inherit;
	cursor: pointer;
`

// i hate this more
export const BackgroundButton = styled(UnstyledButton)`
	${colourTransitions}

	${({ colour, shade = 2, primary }) =>
		colour &&
		(primary
			? background({ colour, shade })
			: css`
					color: ${colours[colour][shade]};
			  `)}

	&:hover {
		${({ colour, shade = 2, primary }) =>
			primary && background({ colour, shade: shade + 1 })}
	}
`

export const Emoji = styled.span`
	line-height: 1;
`

export const FormGroup = styled.label`
	display: block;
	margin-bottom: 0.5em;
`

const BaseButton = ({ children, ...props }) => (
	// eslint-disable-next-line react/button-has-type
	<button {...props}>
		<LabelBody>{children}</LabelBody>
	</button>
)

export const Button = composeStyles(
	BaseButton,
	styled(Label)`
		font: inherit;
		${colourTransitions}
		box-shadow: ${shadow(1)};
		cursor: pointer;

		&:hover {
			${({ colour = 'sky', shade = 3 }) => background({ colour, shade: shade + 1 })}
			box-shadow: ${shadow(1.5)};
			${''}
		}

		&:active {
			transition-property: box-shadow, background;
			box-shadow: ${shadow(0)};
			${''}
		}

		&[disabled] {
			pointer-events: none;
			opacity: 0.6;
		}
	`,
)

export const Group = styled(List)`
	${List} > & {
		margin: 2px;
	}

	box-shadow: ${shadow(1)};

	${Button} {
		margin-left: -1px;
		margin-right: 0;
		border-radius: 0;

		&:hover {
			box-shadow: ${shadow(0.5)};
		}

		&:active {
			box-shadow: ${shadow(0)};
		}

		&:first-child {
			border-top-left-radius: 0.15em;
			border-bottom-left-radius: 0.15em;
		}

		&:last-child {
			border-top-right-radius: 0.15em;
			border-bottom-right-radius: 0.15em;
		}
	}
`

export const LabelledInput = composeStyles(
	'label',
	styled(List)`
		align-items: center;
	`,
)

export const Dropdown = styled(Card)`
	box-shadow: ${shadow(3)};
	position: absolute;
	top: calc(100% - 0.5rem);
	padding: 0;
	right: 1rem;
	background: white;
	z-index: 1;
	min-height: 10rem;
	max-height: 20rem;
	width: 16rem;
	overflow-x: auto;
	column-width: unset;
`
