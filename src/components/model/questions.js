export async function questions(method, data) {
    if (method === "GET") {
        var url = new URL('http://127.0.0.1:8000/quoraBase/questions')
        
        var query = '?'

        Object.entries(data).forEach(entry => {
            let [key, value] = entry
            query += key + '=' + value
        });

        url.search = query

        let response = await fetch(url, {method: 'GET'})

        return await response.json()
        
    } else if (method === "POST") {
        await fetch('http://127.0.0.1:8000/quoraBase/questions/', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        .then(resp => resp.json())
        .then(console.log)
        .catch(error => console.log(error))
    }
}