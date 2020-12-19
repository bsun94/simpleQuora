import methods from "./enums.js"
import hosts from "./hosts.js"

export async function getQuestions(data) {
    var url
    
    if (data) {
        url = new URL(hosts['active'] + '/quoraBase/questions')
        
        var query = '?'

        Object.entries(data).forEach(entry => {
            let [key, value] = entry
            query += key + '=' + value + '&'
        });

        url.search = query
    } else {
        url = new URL(hosts['active'] + '/quoraBase/questions/')
    }

    let response = await fetch(url, {method: methods[0]})

    return await response.json()
}


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
    let response = await fetch(hosts['active'] + '/quoraBase/questions/', {
        method: method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        
        return await response.json()
}
