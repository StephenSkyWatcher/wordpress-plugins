window.astrotest = true;

// const options = {
//     method: "POST",body: new URLSearchParams({
//         "request-json": JSON.stringify({
//             apikey: "bniwqrhwabqktjoi",
//             // session: "mivea39nsf0egea7vaeicgfqzgesjlyb",
//             // url: url,
//             // scale_units: 'degwidth',
//             // scale_lower: 0.5,
//             // scale_upper: 1.0,
//             // center_ra: 290,
//             // center_dec: 11,
//             // radius: 2.0
//         }),
//     }),
// };
// async function fetchAndSetResponse(url, setAttributes) {
//     const oEmbedUrl = `oddevan/v1/devArtProxy?url=${encodeURIComponent(url)}`;

//     try {
//         const response = await apiFetch({ path: oEmbedUrl });
//         setAttributes({ embedData: response });
//     } catch(e) {
//         console.log('Error in DA block', { url: oEmbedUrl, error: e });
//         setAttributes({ embedData: {} });
//     }
// }
// fetch(`astro/v1/astrometry?url=login`, options)
// .then(response => response.json())
// .then(data => console.log(data, 'bang login'))
// .catch(error => console.error('Error:', error), 'bang error')
// .finally(data => console.log(data, 'bang login finally'))

//     fetch('https://nova.astrometry.net/api/jobs/11594286/info/', options)
//     .then(response => response.json())
//     .then(data => setData(data))
//     .catch(error => console.error('Error:', error));