import '@testing-library/jest-dom';
import * as React from 'react';

// Fix for React 19 act missing in Jest/JSDOM
try {
  const { act } = require('react-dom/test-utils');
  Object.defineProperty(React, 'act', {
    value: act,
    writable: true,
    configurable: true
  });
} catch (e) {
  Object.defineProperty(React, 'act', {
    value: (cb: any) => cb(),
    writable: true,
    configurable: true
  });
}

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
      return JSON.parse(this.body);
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
        for (const [k, v] of Object.entries(init)) {
          this.map.set(k, v);
        }
      }
    }
    get(name: string) {
      return this.map.get(name) || null;
    }
    set(name: string, value: string) {
      this.map.set(name, value);
    }
  } as any;
}

// Add TextEncoder / TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;