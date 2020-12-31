import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import { navigate as go } from 'use-history'
import { H2 } from '../visual/heading'
import { Form } from '../control/form'
import { Input } from '../visual/form'
import { Button, LabelledInput } from '../visual/primitives'
import { createAccount, createAccountAndJoin } from '../../lib/methods'
import CampaignSettings from '../document/campaign-settings'

const SignupFields = () => (
	<>
		<LabelledInput>
			Username
			<Input required name='username' placeholder='user' />
		</LabelledInput>

		<LabelledInput>
			Email address
			<Input
				required
				name='email'
				type='email'
				placeholder='user@example.com'
			/>
		</LabelledInput>

		<small>
			We&apos;ll send you an email with a link to verify your address and set
			your password.
		</small>
	</>
)

export const SignupForm = ({ secret }) => (
	<Form
		onSubmit={({ username, email, campaign }) =>
			createAccountAndJoin({ username, email }, campaign, secret)
		}
	>
		<SignupFields />

		<Button>Create your account</Button>
	</Form>
)

export default ({ title }) => {
	async function createAccountAndGoHome({ username, email, campaign }) {
		await createAccount({ username, email }, campaign)
		toast.success(
			`We've sent an email to ${email} to verify your address. Check your inbox.`,
		)
		go('/')
	}

	return (
		<Form onSubmit={createAccountAndGoHome}>
			<H2>About you</H2>

			<SignupFields />

			<H2>About your campaign</H2>
			<CampaignSettings campaign={{ title }} name='campaign' tag={Fragment} />

			<Button>Create your account</Button>
		</Form>
	)
}
