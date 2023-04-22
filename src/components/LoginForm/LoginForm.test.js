// loginForm.test.js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { loginForm } from './LoginForm.component.js'

test('rendering and submitting a basic Formik form', async () => {
	const handleSubmit = jest.fn()
	render(<loginForm onSubmit={handleSubmit} />)
	const user = userEvent.setup()

	await user.type(
		screen.getByRole('textbox', { name: /Email address/i }),
		'idoia@ara.cat'
	)
	await user.type(
		screen.getByRole('textbox', { name: /Password/i }),
		'12345678'
	)

	await user.click(screen.getByRole('button', { name: /submit/i }))

	await waitFor(() =>
		expect(handleSubmit).toHaveBeenCalledWith({
			email: 'idoia@ara.cat',
			password: '12345678',
		})
	)
})
