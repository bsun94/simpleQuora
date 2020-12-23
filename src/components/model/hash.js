export async function sha256 (text) {
    const Uint8 = new TextEncoder().encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', Uint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}