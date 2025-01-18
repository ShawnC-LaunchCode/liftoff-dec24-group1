import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
const canvasWidth = 800; // Set your canvas width
const canvasHeight = 600; // Set your canvas height

const initialNodes = [
  { id: '1', position: { x: canvasWidth / 2, y: canvasHeight / 2 }, data: { label: 'Root User' } },
  { id: '2', position: { x: canvasWidth / 2 - 100, y: canvasHeight / 2 + 100 }, data: { label: 'Child 1' } },
  { id: '3', position: { x: canvasWidth / 2 + 100, y: canvasHeight / 2 + 100 }, data: { label: 'Child 2' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' }
];

export default function Tree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  useEffect(() => {
    fetch('http://localhost:8080/user/LOTxIUI-uvUtkU1h5QScK')
      .then(response => response.json())
      .then(data => {
        fetch(`http://localhost:8080/persons/${data.personID}`)
          .then(response => response.json())
          .then(personData => {
            console.log('Person API Response data:', personData);
            
            // Update the node with id '1' to include the person's name
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === '1') {
                  return { ...node, data: { ...node.data, label: personData.user.name } };
                }
                return node;
              })
            );

            console.log('User Name:', personData.user.name);
          })
          .catch(error => {
            console.error('Error fetching person data:', error);
          });
        console.log('User API Response data:', data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}