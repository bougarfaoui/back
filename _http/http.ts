/**
 * Http request methods
 */
export enum HttpRequestMethod {
    GET,
    POST,
    PUT,
    DELETE,
    ALL
};

/**
 * I use class instead of interface because TypeScript only supports
 * basic type serialization (Boolean, Number, class, ...)
 */

/**
 * Request has the same properties of Request object in Express.js
 */
export class Request {
    app: any;
    baseUrl: string;
    body: any;
    cookies: any;
    fresh: boolean;
    hostname: string;
    ip: string;
    ips: string[];
    method: string;
    originalUrl: string;
    params: any;
    path: string;
    protocol: string;
    query: any;
    route: string;
    secure: boolean;
    signedCookies: any;
    stale: boolean;
    subdomains: string[];
    xhr: boolean;
    accepts: Function;
    acceptsCharsets: Function;
    acceptsEncodings: Function;
    acceptsLanguages: Function;
    get: Function;
    is: Function;
    param: Function;
    range: Function;
}

/**
 * Response has the same properties of Response object in Express.js
 */
export class Response {
    app: any;
    headersSent: boolean;
    locals: any;
    append: Function;
    attachment: Function;
    cookie: Function;
    clearCookie: Function;
    download: Function;
    end: Function;
    format: Function;
    get: Function;
    json: Function;
    jsonp: Function;
    links: Function;
    location: Function;
    redirect: Function;
    render: Function;
    send: Function;
    sendFile: Function;
    sendStatus: Function;
    set: Function;
    status: Function;
    type: Function;
    vary: Function;
}