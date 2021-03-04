import { getToken } from "lib/helpers/localStorage/";
import { domainURL } from "./environment";

//region Fetch Mechanism
export const GetSecured = async (URL) => {
  let token = await getToken();
  if (token != null) {
    let response = await fetch(`${domainURL}${URL}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    return await ReturnResponse(response);
  }
};

export const PostSecured = async (URL, params) => {
  let token = await getToken();

  if (token != null) {
    let response = await fetch(`${domainURL}${URL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      method: "POST",
      body: JSON.stringify({ ...params, locale: locale }),
    });
    return await ReturnResponse(response);
  }
};

export const PutSecured = async (URL, params) => {
  let token = await getToken();
  debugger;
  if (token != null) {
    let response = await fetch(`${domainURL}${URL}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      method: "PUT",
      body: JSON.stringify({ ...params }),
    });
    return await ReturnResponse(response);
  }
};

export const DeleteSecured = async (URL) => {
  let token = await getToken();
  if (token != null) {
    let response = await fetch(`${domainURL}${URL}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      method: "DELETE",
    });
    return await ReturnResponse(response);
  }
};

export const Post = async (URL, params) => {
  let response = await fetch(`${domainURL}${URL}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(params),
  });

  return await ReturnResponse(response);
};

export const Get = async (URL) => {
  let response = await fetch(`${domainURL}${URL}`);
  return await ReturnResponse(response);
};

export const ReturnResponse = async (response) => {
  if (response.ok) {
    let responseJson = await response.clone().json();
    return responseJson;
  } else {
    response = {
      error: "error",
      errors: await response.clone().json(),
      status: response.status,
      error_description:
        response.statusText !== undefined
          ? response.statusText
          : "Unable to process Your request Please contact your admin",
    };
    return response;
  }
};

export default domainURL;
