import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const treeSlice = createSlice({
  name: 'fileTree',
  initialState: { tree: [] },
  reducers: {
    updateTree: (state, action) => {
      const { payload } = action;
      state.tree = payload;
    }
  }
});

export const { updateTree } = treeSlice.actions;

export default treeSlice.reducer;

export const selectTree = (state: RootState) => state.fileTree.tree;
