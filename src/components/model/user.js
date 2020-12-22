import methods from "./enums.js"
import hosts from "./hosts.js"

export async function getUsers(data) {
    var url
    
    if (data) {
        url = new URL(hosts['active'] + '/quoraBase/users')
        
        var query = '?'

        Object.entries(data).forEach(entry => {
            let [key, value] = entry
            query += key + '=' + value + '&'
        });

        url.search = query
    } else {
        url = new URL(hosts['active'] + '/quoraBase/users/')
    }

    let response = await fetch(url, {method: methods[0]})

    return await response
}


export async function postUsers(data) {
    return await APIFactory(methods[1], data)
}

export async function patchUsers(data) {
    return await APIFactory(methods[2], data)
}

export async function deleteUsers(data) {
    return await APIFactory(methods[3], data)
}

async function APIFactory (method, data) {
    let response = await fetch(hosts['active'] + '/quoraBase/users/', {
        method: method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        
        return await response.json()
}
