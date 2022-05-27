const API_ORIGIN_URL = process.env.REACT_APP_BACKEND_URL

let accountAPI = {
    login : async (data) => {
        let fetchURL = API_ORIGIN_URL + `/signin`
        //console.log('data:', JSON.stringify(data))
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                //'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response
    },
    register : async (data) => {
        let fetchURL = API_ORIGIN_URL + `/register`
        //console.log('fetchURL:', fetchURL)
        const response = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                //'Authorization': 'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response
    },
}

export default accountAPI;