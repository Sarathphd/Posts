import axios from "axios";

function headerConfig(contentType) {
	const header = {};
	if (contentType && typeof contentType === "string") {
		header["Content-Type"] = contentType;
	} else {
		header["Content-Type"] = "application/json";
	}

	return header;
}

export default ({ contentType, auth }) => axios.create({
	baseURL: 'http://jsonplaceholder.typicode.com',
	headers: headerConfig(contentType, auth )
});


