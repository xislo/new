import includes from "lodash/includes";

const getDomainUrl = (subdomain) => `http://${subdomain}.xislo.com`;
export const localDevServerUrl = process.env.REACT_APP_LOCAL_DEV_SERVER_URL;
export const devHostedServerUrl = "http://localhost:5000/api/";

export const isLocalHosted = includes(window.location.hostname, "localhost");

export const isRunLocalHosted = includes(
  process.env.REACT_APP_LOCAL_DEV_SERVER_URL,
  "localhost"
);

export const isStagingHosted = includes(
  window.location.hostname,
  getDomainUrl("xislo")
);

export const isDevHosted = includes(
  window.location.hostname,
  getDomainUrl("xislo")
);

export const domainURL = isRunLocalHosted
  ? localDevServerUrl
  : devHostedServerUrl;

//Oauth
export const googleClientID =
  "221302184390-q6bk7d1fcoq7vrktinoohtbir8ubc3hn.apps.googleusercontent.com";

export default {
  isLocalHosted,
  isRunLocalHosted,
  isStagingHosted,
  googleClientID,
};
