import React, { useState } from 'react'
import qs from 'querystring'
import { useSubscription, useCursor } from '../utils/hooks'
import styled, { css } from 'styled-components'
import colours from '@apaleslimghost/colours'

import { UnsplashPhotos } from '../../lib/collections'
import { FlexGrid } from '../visual/grid'
import preventingDefault from '../utils/preventing-default'
import { unsplashDownload } from '../../lib/methods'

import { Button, List } from '../visual/primitives'
import Icon from '../visual/icon'
import Tabs from './tabs'
import Modal from './modal'
import { useFormFields, useFormSet } from './form'

const FlexImg = styled.img`
	width: 100%;
	height: auto;
	display: block;
`

const ImgSelect = styled.button.attrs(() => ({ type: 'button' }))`
	border: 0 none;
	background: none;
	padding: 0;

	${({ selected }) =>
		selected &&
		css`
			outline: 5px solid ${colours.sky.primary};
		`};
`

const getThumb = ({ urls }, { w = 450, h = 150 } = {}) =>
	urls.raw +
	'&' +
	qs.stringify({
		fit: 'crop',
		crop: 'entropy',
		w,
		h,
	})

const useSetImage = name => {
	const setFields = useFormSet()

	return image => {
		setFields({
			[name]: image,
		})

		if (image) {
			unsplashDownload(image.id)
		}
	}
}

const ImageSelectSection = ({ photos, name, onSelect }) => {
	const fields = useFormFields()
	const setImage = useSetImage(name)

	return (
		<FlexGrid small>
			{photos.map(photo => (
				<ImgSelect
					key={photo.id}
					selected={fields[name] && fields[name].id === photo.id}
					onClick={preventingDefault(() => {
						const image = { from: 'unsplash', id: photo.id }
						setImage(image)

						if (onSelect) {
							onSelect(image)
						}
					})}
				>
					<FlexImg
						width={450}
						height={150}
						src={getThumb(photo)}
						alt={photo.description}
					/>
				</ImgSelect>
			))}
		</FlexGrid>
	)
}

const useUnsplashSearch = query => {
	const ready = useSubscription('unsplash.search', query)
	const photos = useCursor(UnsplashPhotos.find({ fromSearch: query }), [ready])

	return { ready, photos }
}

const useAlmanacCollection = () => {
	const ready = useSubscription('unsplash.getCollectionPhotos', '2021417')
	const photos = useCursor(UnsplashPhotos.find({ fromCollection: '2021417' }), [
		ready,
	])
	return { ready, photos }
}

const SearchImage = props => {
	const [query, setQuery] = useState('')
	const { ready, photos } = useUnsplashSearch(query)
	return (
		<>
			<input
				type='search'
				value={query}
				onChange={ev => setQuery(ev.target.value)}
			/>
			{query &&
				(ready ? (
					<ImageSelectSection {...props} photos={photos} />
				) : (
					'loading...'
				))}
		</>
	)
}

const CollectionImage = props => {
	const { ready, photos } = useAlmanacCollection()
	if (!ready) return 'Loading...'

	return <ImageSelectSection {...props} photos={photos} />
}

const ImageSelectTabs = props => {
	return (
		<Tabs>
			{{
				Suggested: <CollectionImage {...props} />,
				Search: <SearchImage {...props} />,
			}}
		</Tabs>
	)
}

export default ImageSelectTabs

export const ImageSelectModal = ({ name }) => {
	const fields = useFormFields()
	const setImage = useSetImage(name)

	return (
		<Modal
			control={props =>
				fields[name] ? (
					<List>
						<Button type='button' {...props}>
							<Icon icon='edit' /> Edit image
						</Button>
						<Button
							type='button'
							colour='scarlet'
							onClick={() => setImage(null)}
						>
							<Icon icon='remove' /> Remove image
						</Button>
					</List>
				) : (
					<Button type='button' {...props}>
						<Icon icon='image' /> Set image
					</Button>
				)
			}
			render={({ close }) => (
				<ImageSelectTabs {...{ fields, name }} onSelect={close} />
			)}
		/>
	)
}
