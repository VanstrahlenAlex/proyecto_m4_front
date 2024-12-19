import axios from "axios";

const apiBase = axios.create({
	baseURL: "http://localhost:3030/",
	headers: {
		"Content-Type": "application/json",
	},
});

export default apiBase;
