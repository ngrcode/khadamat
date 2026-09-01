import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<1000'] },
};
export default function () {
  const response = http.get(__ENV.LOAD_TARGET || 'http://host.docker.internal:3100');
  check(response, { 'returns a successful response': (result) => result.status < 400 });
}
