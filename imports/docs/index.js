import React from 'react'
import { Link } from 'use-history'
import Title from '../ui/utils/title'
import Logo from '../ui/visual/logo'
import { H1, H3 } from '../ui/visual/heading'
import { FullGrid, Main, Aside } from '../ui/visual/grid'
import { markdownComponents } from '../ui/document/markdown'
import { MDXProvider } from '@mdx-js/react'
import { groupBy } from 'lodash'
import Icon from '../ui/visual/icon'

import * as index from './index.mdx'
import * as form from './form.mdx'
import * as logo from './logo.mdx'
import * as colours from './colours'
import * as gravatar from './gravatar'
import * as heading from './heading'
import * as ribbon from './ribbon'
import * as shortcut from './shortcut'

const pages = {
	index,
	form,
	logo,
	colours,
	gravatar,
	heading,
	ribbon,
	shortcut,
}

for (const page in pages) {
	pages[page].id = page
}

const categories = groupBy(pages, 'category')

export default ({ page }) => {
	if (!pages.hasOwnProperty(page)) {
		throw new Error(`Docs page ${page} not found`)
	}

	const { default: Page, title, subject } = pages[page]
	const categories = groupBy(pages, 'category')

	return (
		<FullGrid>
			<Title titleTemplate='%s ❈ Almanac Docs'>{title}</Title>

			<Aside left>
				<Link href='/'>
					<Logo />
				</Link>
				<nav>
					{Object.keys(categories).map(category => (
						<>
							<H3>{category}</H3>
							<ul>
								{categories[category].map(page => (
									<li key={page.id}>
										<Link
											href={`/__docs/${page.id === 'index' ? '' : page.id}`}
										>
											{page.title}
										</Link>
									</li>
								))}
							</ul>
						</>
					))}
				</nav>
			</Aside>

			<Main right>
				<H1>{title}</H1>
				{subject && (
					<a
						href={`https://github.com/apaleslimghost/almanac/blob/master/${subject}`}
						target='_blank'
						rel='noopener'
					>
						<Icon icon='external-link' /> {subject}
					</a>
				)}

				<MDXProvider components={markdownComponents}>
					<Page />
				</MDXProvider>
			</Main>
		</FullGrid>
	)
}
