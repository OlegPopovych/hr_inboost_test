import ReactFlow, {
  Background,
  Edge,
  Connection,
  useEdgesState,
  NodeChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { CustomNodeSelct } from '../Select/Selection';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNode, selectNodes } from '../../store/nodesSlice';
import { addNewEdge, selectEdges } from '../../store/edgesSlice';

const nodeTypes = {
  custom: CustomNodeSelct,
};

const BasicFlow = () => {
  const edges = useAppSelector(selectEdges);
  const [, , onEdgesChange] = useEdgesState(edges);
  const dispatcher = useAppDispatch();
  const nodes = useAppSelector(selectNodes);

  const onNodesChange = (movedNode: NodeChange[]) => {
    const currentNode = movedNode[0];
    if (currentNode.type === 'position') {
      const updatedNodes = nodes.map((node) => {
        if (node.id === currentNode.id) {
          return {
            ...node,
            position: currentNode.position || node.position,
          };
        }

        return node;
      });

      dispatcher(addNode(updatedNodes));
    }
  };

  const onConnect = (params: Edge | Connection) => {
    const { source, target } = params;
    dispatcher(addNewEdge({ source, target }));
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  );
};

export default BasicFlow;
