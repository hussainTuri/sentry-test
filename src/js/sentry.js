import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  release: "abrar-test-proj@1.0.6",
  environment: "production",
  dsn: "https://39dab08dd397470e813aceab745cf32b@o943964.ingest.sentry.io/5892878",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  tracesSampleRate: 1.0,
});

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  let undefinedVar = document.getElementById('undefined-var');
  let undefinedFtn = document.getElementById('undefined-ftn');

  undefinedVar.addEventListener('click', function () {
    console.log(this.getAttribute('id'));
    //throw 'Var X1 is not defined!';
  });
  undefinedFtn.addEventListener('click', function () {
    throw 'function X1 is not defined!';
    console.log(this.getAttribute('id'));
  });

});
