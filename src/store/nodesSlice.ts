'use strict';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { Node} from 'reactflow';

const initialNodes: Node[] = [
  {
    id: '0',
    type: 'custom',
    position: { x: 10, y: 100 },
    data: { label: '' },
  },
];
const initialState = {
  data: initialNodes,
};
export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addNode } = nodesSlice.actions;

export const selectNodes = (state: RootState) => state.nodes.data;

export default nodesSlice.reducer;
