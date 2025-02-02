import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveSchema } from '../types/scrollSaveSchema';
// import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
// import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

/**
 * Actions, redusers (edit, delete profile)
 * extraReducers - redusers with business logic for async thunk that can have anything in it
 */
export const scrollSaveSlice = createSlice({
    name: 'scrollSaveSlice',
    initialState,
    reducers: {
        setScrollPosition(
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) {
            state.scroll[payload.path] = payload.position; // for example { 'articles': 500 }
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: scrollSaveActions } = scrollSaveSlice;
export const { reducer: scrollSaveReducer } = scrollSaveSlice;
