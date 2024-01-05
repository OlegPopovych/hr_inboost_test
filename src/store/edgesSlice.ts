'use strict';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { Edge, MarkerType} from 'reactflow';

const initialEdges: Edge[] = [];

const initialState = {
  data: initialEdges,
};
export const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    addNewEdge: (state, action: PayloadAction<{source: string | null, target: string | null}>) => {
      const {source, target} = action.payload;
      state.data.push({
        id: `e${source}-${target}`,
        source: source || '',
        target: target || '',
        type: 'smoothstep',
        data: {
          selectIndex: 0,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    },
  },
});

export const { addNewEdge } = edgesSlice.actions;

export const selectEdges = (state: RootState) => state.edges.data;

export default edgesSlice.reducer;
