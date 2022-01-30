import { reactive } from 'vue';
import createAuth0Client from '@auth0/auth0-spa-js';
// eslint-disable-next-line import/no-cycle
// import router from '../router';

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

export const AuthState = reactive({
  loading: true,
  isAuthenticated: false,
  user: {},
  auth0Client: null,
  popupOpen: false,
  error: null,
});

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  const state = AuthState;

  // Create a new instance of the SDK client using members of the given options object
  const initAuth = () => {
    createAuth0Client({
      ...options,
      client_id: options.clientId,
      audience: options.audience,
      redirect_uri: redirectUri,
    }).then(async (auth) => {
      try {
        state.auth0Client = auth;
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes('code=')
          && window.location.search.includes('state=')
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await state.auth0Client.handleRedirectCallback();

          state.error = null;

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirectCallback(appState);
        }
      } catch (e) {
        state.error = e;
      } finally {
        // Initialize our internal authentication state
        state.isAuthenticated = await state.auth0Client.isAuthenticated();
        state.user = await state.auth0Client.getUser();
        state.loading = false;
      }
    });
  };

  async function loginWithPopup(popUpOptions, config) {
    state.popupOpen = true;

    try {
      await state.auth0Client.loginWithPopup(popUpOptions, config);
      state.user = await state.auth0Client.getUser();
      state.isAuthenticated = await state.auth0Client.isAuthenticated();
      state.error = null;
    } catch (e) {
      state.error = e;
      // eslint-disable-next-line
      console.error(e);
    } finally {
      state.popupOpen = false;
    }

    state.user = await state.auth0Client.getUser();
    state.isAuthenticated = true;
  }

  /** Handles the callback when logging in using a redirect */
  async function handleRedirectCallback() {
    state.loading = true;
    try {
      await state.auth0Client.handleRedirectCallback();
      state.user = await state.auth0Client.getUser();
      state.isAuthenticated = true;
      state.error = null;
    } catch (e) {
      state.error = e;
    } finally {
      state.loading = false;
    }
  }

  /** Authenticates the user using the redirect method */
  function loginWithRedirect(o) {
    return state.auth0Client.loginWithRedirect(o);
  }
  /** Returns all the claims present in the ID token */
  function getIdTokenClaims(o) {
    return state.auth0Client.getIdTokenClaims(o);
  }
  /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
  function getTokenSilently(o) {
    return state.auth0Client.getTokenSilently(o);
  }
  /** Gets the access token using a popup window */

  function getTokenWithPopup(o) {
    return state.auth0Client.getTokenWithPopup(o);
  }
  /** Logs the user out and removes their session on the authorization server */
  function logout(o) {
    return state.auth0Client.logout(o);
  }

  instance = {
    state,
    handleRedirectCallback,
    loginWithRedirect,
    loginWithPopup,
    getIdTokenClaims,
    getTokenSilently,
    getTokenWithPopup,
    logout,
  };

  initAuth();

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(app, options) {
    app.provide('$auth', useAuth0(options));
  },
};
