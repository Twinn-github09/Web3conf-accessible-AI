import axios from 'axios';

const url = 'https://primereact.org/inputtext/';
const apikey = 'e825d8f675e15e0607ee21eb20460959448f7e55';
axios({
	url: 'https://api.zenrows.com/v1/',
	method: 'GET',
	params: {
		'url': url,
		'apikey': apikey,
		'premium_proxy': 'true',
	},
})
    .then(response => console.log(response.data))
    .catch(error => console.log(error));