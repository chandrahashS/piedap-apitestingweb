import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// routes
import { GET_ALL_COACHING_FOCUS_AREAS } from "../../../utils/routes";

// ---------------------------------------------------------------------------------

export const getCoachingFocusAreas = createAsyncThunk(
  "coachingFocusAreas/getCoachingFocusAreas",
  async () => {
    return axios.get(GET_ALL_COACHING_FOCUS_AREAS, { withCredentials: true });
  }
);

export const getCoachingFocusAreasByClient = createAsyncThunk(
  "coachingFocusAreas/getCoachingFocusAreasByClient",
  async (id) => {
    return axios.get(`${GET_ALL_COACHING_FOCUS_AREAS}/${id}`, {
      withCredentials: true,
    });
  }
);

// ---------------------------------------------------------------------------------

const coachingFocusAreasSlice = createSlice({
  name: "coachingFocusAreas",
  initialState: {
    loading: false,
    coachingFocusAreasData: [],
    message: "",
    errMessage: "",
  },
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
    resetErrMessage: (state) => {
      state.errMessage = "";
    },
  },
  extraReducers: {
    [getCoachingFocusAreas.pending]: (state, action) => {
      state.loading = true;
    },
    [getCoachingFocusAreas.fulfilled]: (state, action) => {
      state.loading = false;
      state.coachingFocusAreasData = action?.payload?.data;
    },
    [getCoachingFocusAreas.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.data?.message;
    },
    [getCoachingFocusAreasByClient.pending]: (state, action) => {
      state.loading = true;
    },
    [getCoachingFocusAreasByClient.fulfilled]: (state, action) => {
      state.loading = false;
      state.coachingFocusAreasData = action?.payload?.data;
    },
    [getCoachingFocusAreasByClient.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.data?.message;
    },
  },
});

export const { resetMessage, resetErrMessage } =
  coachingFocusAreasSlice.actions;

export default coachingFocusAreasSlice.reducer;
