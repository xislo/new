import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { googleClientID } from "lib/client/environment";
import { GoogleLogin as login } from "state/Account/Epic";
import { addToken } from "lib/helpers/localStorage/";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { handleResponseWithToaster } from "components/Toaster/";

const onAfterSuccess = ({ response: { data } }) => {
  const { token, user } = data;
  addToken(
    JSON.stringify({
      token: token,
      userData: { loginType: "google", ...user },
    })
  );
  window.location.href = "/";
};

const GoogleLoginButton = ({ login }) => {
  const [isloading, setIsloading] = useState(false);
  return (
    <GoogleLogin
      clientId={googleClientID}
      render={(renderProps) => (
        <div class="social-logins form-element">
          <div
            style={{ cursor: "pointer" }}
            onClick={renderProps.onClick}
            class="social-connection"
          >
            <a
              class="align-items-center button d-flex hollow primary"
              href="#"
              id="google-login"
            >
              <span class="google-box">
                <img
                  style={{
                    height: "15px",
                    width: "15px",
                  }}
                  // verticalAlign: "text-top",
                  alt="Google login"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
              </span>
              Sign in with Google
              {isloading && <Spinner className="ml-2" size="sm" />}
            </a>
          </div>
        </div>
      )}
      buttonText="Login"
      onSuccess={({ tokenId }) => {
        setIsloading(true);
        debugger;
        login({
          token: tokenId,
        }).then((response) => {
          setIsloading(false);

          handleResponseWithToaster({
            response,
            onAfterSuccess: onAfterSuccess,
            onAfterFailure: () => {},
          });
        });
      }}
      onFailure={(responseGoogle) => {
        debugger;
      }}
      cookiePolicy={"single_host_origin"}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(GoogleLoginButton);
