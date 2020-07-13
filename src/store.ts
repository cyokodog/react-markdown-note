import { configureStore /*, ThunkAction, Action*/ } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import { noteSlice } from './containers/Note/store/slice';
// import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: combineReducers({
    note: noteSlice.reducer,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
