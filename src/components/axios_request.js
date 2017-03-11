import axios from 'axios';

const API_KEY = 'key_here';
const ROOT_URL = `url_here`;

export function getRestaurantInfo(need_val) {
	const url = `${ROOT_URL}need_val`;
	const request = axios.get(url);
	return request;
}