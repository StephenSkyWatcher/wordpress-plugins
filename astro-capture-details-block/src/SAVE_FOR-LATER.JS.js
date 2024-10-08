
curl 'https://nova.astrometry.net/api/login' \
	-H 'Accept: */*' \
	-H 'Accept-Language: en-US,en;q=0.9,es;q=0.8,fr;q=0.7,nb;q=0.6' \
	-H 'Cache-Control: no-cache' \
	-H 'Connection: keep-alive' \
	-H 'Content-Type: application/x-www-form-urlencoded' \
	-H 'Origin: https://www.stephenskywatcher.com' \
	-H 'Pragma: no-cache' \
	-H 'Referer: https://www.stephenskywatcher.com/' \
	-H 'Sec-Fetch-Dest: empty' \
	-H 'Sec-Fetch-Mode: cors' \

curl 'https://nova.astrometry.net/api/jobs/11594286/info/' \
	-H 'Accept: */*' \
	-H 'Accept-Language: en-US,en;q=0.9,es;q=0.8,fr;q=0.7,nb;q=0.6' \
	-H 'Cache-Control: no-cache' \
	-H 'Connection: keep-alive' \
	-H 'Content-Type: application/x-www-form-urlencoded' \
	-H 'Origin: https://www.stephenskywatcher.com' \
	-H 'Pragma: no-cache' \
	-H 'Referer: https://www.stephenskywatcher.com/' \
	-H 'Sec-Fetch-Dest: empty' \
	-H 'Sec-Fetch-Mode: cors' \
	-H 'Sec-Fetch-Site: cross-site' \
	-H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' \
	-H 'sec-ch-ua: "Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"' \
	-H 'sec-ch-ua-mobile: ?0' \
	-H 'sec-ch-ua-platform: "Linux"' \
	--data-raw 'request-json=%7B%22session%22%3A%22mivea39nsf0egea7vaeicgfqzgesjlyb%22%7D' \

	const [data, setData] = useState(null);
	useEffect(() => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				"request-json": JSON.stringify({
					apikey: "bniwqrhwabqktjoi",
					// session: "mivea39nsf0egea7vaeicgfqzgesjlyb",
					// url: url,
					// scale_units: 'degwidth',
					// scale_lower: 0.5,
					// scale_upper: 1.0,
					// center_ra: 290,
					// center_dec: 11,
					// radius: 2.0
				}),
			}),
		};

		// fetch('https://nova.astrometry.net/api/login', options)
		// .then(response => response.json())
		// .then(data => console.log(data, 'bang login'))
		// .catch(error => console.error('Error:', error.message), 'bang error')
		// .finally(data => console.log(data, 'bang login finally'))

		//   fetch('https://nova.astrometry.net/api/jobs/11594286/info/', options)
		// 	.then(response => response.json())
		// 	.then(data => setData(data))
		// 	.catch(error => console.error('Error:', error));
	}, []);
