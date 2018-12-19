import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

import axios from "axios";

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

export const getProfile = data => ({
  type: GET_PROFILE,
  payload: data
});

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};
