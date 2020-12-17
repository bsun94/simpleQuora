export async function questions(method, data) {
    if (method === "GET") {
        if (data) {
            var url = new URL('http://127.0.0.1:8000/quoraBase/questions')
            
            var query = '?'

            Object.entries(data).forEach(entry => {
                let [key, value] = entry
                query += key + '=' + value + '&'
            });

            url.search = query
        } else {
            var url = new URL('http://127.0.0.1:8000/quoraBase/questions/')
        }

        let response = await fetch(url, {method: 'GET'})

        return await response.json()
        
    } else {
        let response = await fetch('http://127.0.0.1:8000/quoraBase/questions/', {
            method: method,
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        
        return await response.json()

    }

}