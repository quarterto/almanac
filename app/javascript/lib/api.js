import Rails from '@rails/ujs'

export default async (path, data, extraOptions) => {
	const options = {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'x-csrf-token': Rails.csrfToken()
		},
		...extraOptions
	}

	if(options.method !== 'GET') {
		if(data instanceof FormData) {
			options.body = data
		} else {
			options.body = JSON.stringify(data)
			options.headers['content-type'] = 'application/json'
		}
	}

	const response = await fetch(path, options)
	return response.json()
}
