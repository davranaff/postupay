

export function setCookie(key, value) {
    document.cookie = key + '=' + value
}

export function removeCookie(key) {
    document.cookie = key + '=' + ';' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC'
}

export function getCookie() {

}