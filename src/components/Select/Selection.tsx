import { Handle, Position, NodeProps } from 'reactflow';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNode, selectNodes } from '../../store/nodesSlice';
import { addNewEdge } from '../../store/edgesSlice';
import { useState } from 'react';
import cn from 'classnames';

import './select.scss';
import { CheckIcon } from './CheckIcon';

const options = [
  {
    value: '1',
    label: 'Варіант 1',
  },
  {
    value: '2',
    label: 'Варіант 2',
  },
  {
    value: '3',
    label: 'Варіант 3',
  },
  {
    value: '4',
    label: 'Варіант 4',
  },
];

const Select = ({ nodeId }: { value: string; nodeId: string }) => {
  const nodes = useAppSelector(selectNodes);
  // const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);

  const dispatcher = useAppDispatch();

  const currentNode = nodes.find((node) => node.id === nodeId);

  const currentNodeIndex = nodes.findIndex((node) => node.id === nodeId);

  const labels = nodes
    .slice(0, currentNodeIndex + 1)
    .map((node) => node.data.label)
    .filter((node) => node);

  const onSelectHandler = ({ value }: { value: string }) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: { label: value },
        };
      }

      return node;
    });

    if (nodes.length === 1) {
      const lastNode = nodes[nodes.length - 1];
      const newId = String(Number(lastNode.id) + 1);
      const newNode = {
        id: newId,
        type: 'custom',
        position: {
          x: lastNode.position.x + 150,
          y: lastNode.position.y + 150,
        },
        data: { label: value },
      };

      dispatcher(addNode([...nodes, newNode]));
      dispatcher(
        addNewEdge({
          source: lastNode.id,
          target: newId,
        }),
      );

      return;
    }

    if (currentNodeIndex === nodes.length - 1) {
      const lastNode = nodes[nodes.length - 1];
      const newId = String(Number(lastNode.id) + 1);
      const newNode = {
        id: newId,
        type: 'custom',
        position: {
          x: lastNode.position.x + 150,
          y: lastNode.position.y + 150,
        },
        data: { label: value },
      };

      dispatcher(addNode([...updatedNodes, newNode]));
      dispatcher(
        addNewEdge({
          source: lastNode.id,
          target: newId,
        }),
      );

      return;
    }
    dispatcher(addNode(updatedNodes));
  };

  return (
    <div className="select">
      <div className="select__field"></div>
      <button
        className="select__button nodrag"
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
      >
        {labels.join('-')}
      </button>
      {open && (
        <div className="select__list nodrag">
          {options.map((option) => {
            const isSelected = option.value === currentNode?.data.label;
            return (
              <div
                className={cn('select__element')}
                key={option.value}
                onMouseDown={() => onSelectHandler(option)}
              >
                <>
                  <CheckIcon isSelected={isSelected} />
                  {option.label}
                </>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const CustomNodeSelct = ({
  id,
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  const nodes = useAppSelector(selectNodes);
  const currentNodeIndex = nodes.findIndex((node) => node.id === id);
  const isLast = currentNodeIndex === nodes.length - 1;

  return (
    <>
      <Handle
        type="target"
        style={{ display: id === '0' ? 'none' : 'block' }}
        position={targetPosition}
        isConnectable={isConnectable}
      />
      {
        <div className="custom-node__body">
          <Select nodeId={id} value={data.label} />
        </div>
      }
      <Handle
        type="source"
        style={{ display: isLast ? 'none' : 'block' }}
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};
