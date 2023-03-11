import jwtDecode from "jwt-decode";


export function decodeToken (token) {
    return JSON.parse(JSON.stringify(jwtDecode(token)))
}