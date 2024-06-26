import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { CreateTeamSchema } from './schemas';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { API_BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(CreateTeamSchema));

	return { form };
};

export const actions: Actions = {
	create: async (event) => {
		const { fetch } = event;

		const form = await superValidate(event, zod(CreateTeamSchema));

		if (!form.valid) {
			return fail(400, {
				form,
				message: 'Invalid credentials.'
			});
		}

		const { services, name, description, baseAddress, maskLength } = form.data;
		const cidr = `${baseAddress}/${maskLength}`;

		const res = await fetch(`${API_BASE_URL}/team`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				services, name, description, cidr
			}),
			method: 'POST'
		});

		if (!res.ok) {
			const error = await res.json();

			console.error(error.detail);
		}

		return {
			form
		};
	}
};
