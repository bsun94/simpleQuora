import methods from "../enums/enums.js"
import hosts from "../enums/hosts.js"

export async function getHasVoted(data) {
    var url
    
    if (data) {
        url = new URL(hosts['active'] + '/quoraBase/hasvoted')
        
        var query = '?'

        Object.entries(data).forEach(entry => {
            let [key, value] = entry
            query += key + '=' + value + '&'
        });

        url.search = query
    } else {
        url = new URL(hosts['active'] + '/quoraBase/hasvoted/')
    }

    let response = await fetch(url, {method: methods[0]})

    return await response
}


export async function postHasVoted(data) {
    return await makeCall(methods[1], data)
}

export async function patchHasVoted(data) {
    return await makeCall(methods[2], data)
}

export async function deleteHasVoted(data) {
    return await makeCall(methods[3], data)
}

async function makeCall (method, data) {
    let response = await fetch(hosts['active'] + '/quoraBase/hasvoted/', {
        method: method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        
        return await response
}