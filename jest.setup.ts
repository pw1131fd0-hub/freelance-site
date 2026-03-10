import '@testing-library/jest-dom';
import * as React from 'react';

// Polyfill Web APIs for JSDOM
if (typeof Request === 'undefined') {
  global.Request = class Request {
    url: string;
    method: string;
    body: any;
    headers: Headers;
    constructor(input: any, init?: any) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.body = init?.body;
      this.headers = new Headers(init?.headers);
    }
    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }
  } as any;
}

if (typeof Response === 'undefined') {
  global.Response = class Response {
    status: number;
    body: any;
    constructor(body?: any, init?: any) {
      this.body = body;
      this.status = init?.status || 200;
    }
    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }
  } as any;
}

if (typeof Headers === 'undefined') {
  global.Headers = class Headers {
    map = new Map();
    constructor(init?: any) {
      if (init) {
        if (init instanceof Headers) {
          (init as any).map.forEach((v: string, k: string) => this.map.set(k, v));
        } else {
          for (const [k, v] of Object.entries(init)) {
            this.map.set(k, v);
          }
        }
      }
    }
    get(name: string) {
      return this.map.get(name) || null;
    }
    set(name: string, value: string) {
      this.map.set(name, value);
    }
    forEach(cb: any) {
      this.map.forEach(cb);
    }
  } as any;
}

// Add TextEncoder / TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
