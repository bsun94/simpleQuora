export async function questions(method, data) {
    if (method === "GET") {
        let response = await fetch('http://127.0.0.1:8000/quoraBase/questions/', {method: 'GET'})
        return await response.json()
    } else if (method === "POST") {
        await fetch('http://127.0.0.1:8000/quoraBase/questions/', {method: "POST", 
                                                                    body: data,
                                                                    headers: {"Content-Type": "application/json"}
                                                                })
            .then(console.log)
    }
}