import React, { useState, useRef, useEffect } from 'react'
import { useTracker } from '../utils/hooks'
import styled from 'styled-components'
import Markdown from '../document/markdown'
import { useCard, useCards } from '../data/card'
import { useCampaignId } from '../data/campaign'
import { SplashBleed, Hero, HeroTitle } from '../visual/splash'
import ShowCard, { CardListItem } from '../document/card'
import { canEdit as canEditCard } from '../../lib/utils/validators/card'
import { useUser } from '../utils/logged-in'
import Icon from '../visual/icon'
import Title from '../utils/title'
import schema from '../../lib/schema'
import { Owner } from '../document/user'
import {
	SplashToolbar,
	MenuItem,
	MenuLink,
	Space,
	Divider,
	Center,
} from '../visual/menu'
import { useImage } from '../data/image'
import { CardHistoryList } from '../collection/card-history'
import Search from '../collection/card-search'
import { useCardSearch } from '../data/card-search'
import { addRelated, Card } from '../../lib/methods'
import _ from 'lodash'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlexGrid } from '../visual/grid'
import { Dropdown } from '../visual/primitives'
import colours from '@apaleslimghost/colours'

export const CardSplash = ({ card }) => {
	const { image, ready } = useImage(card.cover)
	return (
		<SplashBleed small image={image} ready={ready}>
			<Hero>
				<HeroTitle>{card.title}</HeroTitle>
			</Hero>
		</SplashBleed>
	)
}

const CardBody = styled.article`
	grid-column: main-left;
`

const Right = styled.aside`
	grid-column: right;
`

const SearchWrapper = styled.div`
	display: flex;
	position: relative;
`

const searchVar = new ReactiveVar('')
const debouncedSetSearch = _.debounce(searchVar.set.bind(searchVar), 300)

const CardList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		border-bottom: 1px solid ${colours.steel[4]};
	}
`

const SearchContainer = ({ card, hideCardIds }) => {
	const campaignId = useCampaignId()
	const [_search, _setSearch] = useState('')
	const containerRef = useRef()
	const search = useTracker(() => searchVar.get())
	const [showDropdown, setShowDropdown] = useState(false)
	const { cards, ready } = useCardSearch({ search, campaignId })

	function setSearch(search) {
		_setSearch(search)
		debouncedSetSearch(search)
	}

	async function searchAction() {
		const relatedCard = await Card.create({
			title: search,
			campaignId,
		})

		setSearch('')
		addRelated(card, relatedCard)
	}

	function handleOutsideClick(event) {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setShowDropdown(false)
		}
	}

	useEffect(() => {
		document.body.addEventListener('mousedown', handleOutsideClick)
		return () =>
			document.body.removeEventListener('mousedown', handleOutsideClick)
	})

	return (
		<SearchWrapper ref={containerRef}>
			<Search
				right
				placeholder='Add related&hellip;'
				actionLabel='Create &amp; link'
				searchAction={searchAction}
				value={_search}
				onChange={setSearch}
				onFocus={() => setShowDropdown(true)}
			/>
			{_search && showDropdown && (
				<Dropdown>
					{ready && search && (
						<CardList>
							{cards.map(
								related =>
									!hideCardIds.has(related._id) && (
										<CardListItem
											key={related._id}
											card={related}
											onClick={event => {
												event.preventDefault()
												addRelated(card, related)
												setSearch('')
											}}
										/>
									),
							)}
						</CardList>
					)}
				</Dropdown>
			)}
		</SearchWrapper>
	)
}

export default ({ cardId }) => {
	const { card, ready } = useCard(cardId, [cardId])
	const { cards: relatedCards } = useCards(
		{
			_id: { $in: (card && card.related) || [] },
		},
		{ deps: [ready] },
	)

	const user = useUser()

	if (!ready) {
		return 'Loading...'
	}

	return (
		<>
			<CardSplash card={card} />
			<Title>{card.title}</Title>

			<SplashToolbar>
				<Center>
					{card.type && (
						<>
							<MenuItem>{schema[card.type].name}</MenuItem>
							<Divider />
						</>
					)}

					{card.type && (
						<>
							{_.map(
								schema[card.type].fields,
								({ label, format = a => a }, key) => (
									<MenuItem key={key}>
										<b>{label} </b>
										{format(card[key])}
									</MenuItem>
								),
							)}
							<Divider />
						</>
					)}

					<MenuItem>
						<Owner of={card} />
					</MenuItem>

					{canEditCard(card, user._id) && (
						<>
							<MenuLink href={`/${card.campaignId}/${card._id}/edit`}>
								<Icon icon='edit' />
								Edit
							</MenuLink>

							<Space />
							<SearchContainer
								card={card}
								hideCardIds={new Set(relatedCards.map(card => card._id))}
							/>
						</>
					)}
				</Center>
			</SplashToolbar>

			<CardBody>
				<Markdown source={card.text || ''} />
			</CardBody>

			<Right>
				{relatedCards.length > 0 && (
					<FlexGrid>
						{relatedCards.map(related => (
							<ShowCard key={related._id} card={related} />
						))}
					</FlexGrid>
				)}

				<CardHistoryList card={card} />
			</Right>
		</>
	)
}
