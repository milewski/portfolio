import * as url from 'url';

export function parseDomain({ TLS, DOMAIN, PORT }) {
    return url.format(url.parse(`http${TLS !== 'off' ? 's' : ''}://${DOMAIN}${(PORT ? ':' + PORT : '')}`))
}
