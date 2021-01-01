import methods from "../enums/enums.js"
import hosts from "../enums/hosts.js"

export async function getAnswers(data) {
    var url
    
    if (data) {
        url = new URL(hosts['active'] + '/quoraBase/answers')
        
        var query = '?'

        Object.entries(data).forEach(entry => {
            let [key, value] = entry
            query += key + '=' + value + '&'
        });

        url.search = query
    } else {
        url = new URL(hosts['active'] + '/quoraBase/answers/')
    }

    let response = await fetch(url, {method: methods[0]})

    return await response
}


export async function postAnswers(data) {
    return await APIFactory(methods[1], data)
}

export async function patchAnswers(data) {
    return await APIFactory(methods[2], data)
}

export async function deleteAnswers(data) {
    return await APIFactory(methods[3], data)
}

async function APIFactory (method, data) {
    let response = await fetch(hosts['active'] + '/quoraBase/answers/', {
        method: method,
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
        
        return await response
}
