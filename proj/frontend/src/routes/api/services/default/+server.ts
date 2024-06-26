import type { RequestHandler } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ fetch }) => {
    const endpoint = `${API_BASE_URL}/services/default`;

    return await fetch(endpoint);
};
