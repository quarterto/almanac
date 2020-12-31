import React, { Component, Suspense } from 'react'
import useRoutes from 'boulevard-react'
import { Error } from './utils/error'
import GlobalStyles from './visual/global'
import { errorTest } from '../lib/methods'
import Layout from './pages/layout'

import Dashboard from './pages/dashboard'
import Control, { LaunchDashboardLink } from './pages/control'
import Home from './pages/home'
import Login, { loggedInRedirect } from './pages/login'
import GetStarted from './pages/get-started'
import Campaign from './pages/campaign'
import CampaignSettings from './pages/campaign-settings'
import CampaignPlayers from './pages/campaign-players'
import NewCampaign from './pages/new-campaign'
import Verify from './pages/verify'
import Enrol from './pages/enrol'
import Card from './pages/card'
import EditCard from './pages/edit-card'

const Docs = React.lazy(() => import('../docs'))

const routes = {
	'/:campaignId/dashboard'({ campaignId }) {
		return (
			<Layout campaignId={campaignId}>
				<Dashboard />
			</Layout>
		)
	},

	'/:campaignId/dashboard-control'({ campaignId }) {
		return (
			<Layout campaignId={campaignId} extraNavItem={<LaunchDashboardLink />}>
				<Control />
			</Layout>
		)
	},

	'/:campaignId/join/:secret'({ campaignId, secret }) {
		return (
			<Layout campaignId={campaignId} secret={secret}>
				<Enrol secret={secret} />
			</Layout>
		)
	},

	'/:campaignId/settings'({ campaignId }) {
		return (
			<Layout campaignId={campaignId}>
				<CampaignSettings />
			</Layout>
		)
	},

	'/:campaignId/players'({ campaignId }) {
		return (
			<Layout campaignId={campaignId}>
				<CampaignPlayers />
			</Layout>
		)
	},

	'/:campaignId/new'({ campaignId }) {
		return (
			<Layout campaignId={campaignId}>
				<EditCard />
			</Layout>
		)
	},

	'/:campaignId/:cardId'({ campaignId, cardId }) {
		if (!cardId) return false

		return (
			<Layout campaignId={campaignId}>
				<Card cardId={cardId} />
			</Layout>
		)
	},

	'/:campaignId/:cardId/edit'({ campaignId, cardId }) {
		if (!cardId) return false

		return (
			<Layout campaignId={campaignId}>
				<EditCard cardId={cardId} />
			</Layout>
		)
	},

	'/:campaignId'({ campaignId }) {
		if (!campaignId) return false

		return (
			<Layout campaignId={campaignId}>
				<Campaign />
			</Layout>
		)
	},

	'/new-campaign'() {
		return (
			<Layout>
				<NewCampaign />
			</Layout>
		)
	},

	'/get-started'(params, { title }) {
		return (
			loggedInRedirect() || (
				<Layout>
					<GetStarted title={title} />
				</Layout>
			)
		)
	},

	'/login'() {
		return (
			loggedInRedirect() || (
				<Layout>
					<Login />
				</Layout>
			)
		)
	},

	'/verify/:token'({ token }) {
		return (
			loggedInRedirect() || (
				<Layout>
					<Verify token={token} />
				</Layout>
			)
		)
	},

	'/debug'() {
		return (
			<Layout>
				<button type='button' onClick={() => errorTest()}>
					throw a meteor.call error
				</button>
			</Layout>
		)
	},

	'/__docs/:page'({ page }) {
		return (
			<Suspense fallback={null}>
				<Docs page={page} />
			</Suspense>
		)
	},

	'/__docs'() {
		return (
			<Suspense fallback={null}>
				<Docs page='index' />
			</Suspense>
		)
	},

	'/'() {
		return (
			<Layout>
				<Home />
			</Layout>
		)
	},
}

class RenderError extends Component {
	state = { error: null }

	static getDerivedStateFromError(error) {
		return { error }
	}

	render() {
		if (this.state.error) {
			return <Error error={this.state.error} />
		}

		return this.props.children
	}
}

export default function App() {
	const { children } = useRoutes(routes)
	return (
		<RenderError>
			<GlobalStyles />
			{children}
		</RenderError>
	)
}
