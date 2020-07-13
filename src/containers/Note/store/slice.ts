import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { featureKey } from './featureKey';
import { fetchNoteMarkdown } from './thunks/fetchNoteMarkdown';

export const noteSlice = createSlice({
  name: featureKey,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNoteMarkdown.fulfilled, (state, action) => {
      state.selectedNoteMarkdown = action.payload.noteMarkdown;
      state.noteListMarkdown = action.payload.noteListMarkdown;
    });
  },
});
