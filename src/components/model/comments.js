import methods from "./enums.js"
import hosts from "./hosts.js"

export async function getComments(data) {
    var url
    
    if (data) {
        url = new URL(hosts['active'] + '/quoraBase/comments')
        
        var query = '?'

        Object.entries(data).forEach(entry => {
            let [key, value] = entry
            query += key + '=' + value + '&'
        });

        url.search = query
    } else {
        url = new URL(hosts['active'] + '/quoraBase/comments/')
    }

    let response = await fetch(url, {method: methods[0]})

    return await response.json()
}


export async function postComments(data) {
    return await APIFactory(methods[1], data)
}

export async function patchComments(data) {
    return await APIFactory(methods[2], data)
}

export async function deleteComments(data) {
    return await APIFactory(methods[3], data)
}

// rename to makeCall
async function APIFactory (method, data) {
    let response = await fetch(hosts['active'] + '/quoraBase/comments/', {
        method: method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        
        return await response.json()
}
