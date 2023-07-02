import checkResponse from './checkResponse';

function request(url, option) {
	return fetch(`https://api.diploma.mokhov.nomoredomains.rocks${url}`, option).then(checkResponse);
}

export const registerUser = ({ name, email, password }) => {
	return request('/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, password }),
	})
}

export const authorizeUser = ({ email, password }) => {
	return request('/signin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	})
}
