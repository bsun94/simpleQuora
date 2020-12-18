import methods from "./enums.js"

export async function getQuestions(data) {
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

    let response = await fetch(url, {method: methods[0]})

    return await response.json()
}

// enums for diff methods?
// npm module for http methods as attribs?
export async function postQuestions(data) {
    return await APIFactory(methods[1], data)
}

export async function patchQuestions(data) {
    return await APIFactory(methods[2], data)
}

export async function deleteQuestions(data) {
    return await APIFactory(methods[3], data)
}

async function APIFactory (method, data) {
    let response = await fetch('http://127.0.0.1:8000/quoraBase/questions/', {
        method: method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        
        return await response.json()
}
