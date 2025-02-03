import React, { useState, useEffect } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PersonDetails from './PersonDetails';

const CustomNode = ({ data, isSelected, onClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(data);
  };

  const isRootNode = data.generationLevel === 0;

  return (
    <div 
      className={`px-6 py-3 shadow-lg rounded-xl transition-all duration-200 cursor-pointer
        ${isRootNode 
          ? 'bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-violet-200 hover:border-violet-300' 
          : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-gray-300'
        }
        ${isSelected ? '!border-indigo-500 shadow-indigo-100 scale-105' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`font-medium ${isSelected ? 'text-indigo-900' : isRootNode ? 'text-violet-900' : 'text-gray-800'}`}>
        {data.name}
      </div>
    </div>
  );
};

// Add this new edge type
const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {}
}) => {
  const edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  
  return (
    <path
      d={edgePath}
      className="react-flow__edge-path"
      style={{
        ...style,
        strokeWidth: 2,
        stroke: '#94a3b8',
      }}
    />
  );
};

const FamilyTree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const fetchFamilyTree = async () => {
    try {
      const response = await fetch('http://localhost:8080/persons/user', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert persons data to nodes with explicit positioning
      const newNodes = data.map((person) => ({
        id: person.id,
        position: { 
          x: 0, 
          y: 0  // We'll set these properly below
        },
        data: {
          ...person,
          label: person.name
        },
        type: 'custom',
        draggable: false,
        style: { width: 'auto' }
      }));

      // Group nodes by generation level
      const generationGroups = {};
      newNodes.forEach(node => {
        const gen = node.data.generationLevel;
        if (!generationGroups[gen]) {
          generationGroups[gen] = [];
        }
        generationGroups[gen].push(node);
      });

      // Position nodes with fixed values
      const VERTICAL_SPACING = 200;
      const HORIZONTAL_SPACING = 300;
      
      Object.entries(generationGroups).forEach(([generation, nodes]) => {
        const yPosition = parseInt(generation) * VERTICAL_SPACING;
        const totalWidth = (nodes.length - 1) * HORIZONTAL_SPACING;
        const startX = -totalWidth / 2;

        nodes.forEach((node, index) => {
          node.position = {
            x: startX + (index * HORIZONTAL_SPACING),
            y: yPosition
          };
          console.log(`Node ${node.id} positioned at:`, node.position); // Debug positioning
        });
      });

      // Create edges with the custom type
      const newEdges = [];
      const rootPerson = data.find(person => person.generationLevel === 0);
      
      if (rootPerson) {
        data.forEach(person => {
          if (person.id !== rootPerson.id) {
            const edge = {
              id: `e${rootPerson.id}-${person.id}`,
              source: rootPerson.id,
              target: person.id,
              type: 'custom',
              style: { 
                stroke: '#94a3b8', 
                strokeWidth: 2 
              },
              data: {
                sourceNode: rootPerson,
                targetNode: person
              }
            };
            newEdges.push(edge);
          }
        });
      }

      console.log('Setting nodes:', newNodes); // Debug log
      console.log('Setting edges:', newEdges); // Debug log

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error('Error fetching family tree:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchFamilyTree();
  }, []);

  // Add useEffect to log state changes
  useEffect(() => {
    console.log('Nodes updated:', nodes);
  }, [nodes]);

  useEffect(() => {
    console.log('Edges updated:', edges);
  }, [edges]);

  // Add this useEffect to debug state updates
  useEffect(() => {
    console.log('Current nodes:', nodes);
    console.log('Current edges:', edges);
  }, [nodes, edges]);

  const handleNodeClick = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  const handlePersonUpdate = async () => {
    await fetchFamilyTree();
    setSelectedPerson(null); // Close all modals
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: 'calc(100vh - 100px)',
      marginBottom: '20px',
      position: 'relative',
      background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)'
    }}>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent transition-all duration-300"
        style={{
          opacity: selectedPerson ? 1 : 0,
          pointerEvents: selectedPerson ? 'auto' : 'none',
          zIndex: 1
        }}
      />
      
      {nodes.length === 0 ? (
        <div>Loading family tree...</div>
      ) : (
        <>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={{
              custom: (props) => (
                <CustomNode 
                  {...props} 
                  isSelected={selectedPerson?.id === props.data.id}
                  onClick={handleNodeClick}
                />
              )
            }}
            edgeTypes={{
              custom: CustomEdge
            }}
            defaultEdgeOptions={{
              type: 'custom',
              animated: true
            }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.5}
            maxZoom={1.5}
            nodesDraggable={false}
            elementsSelectable={true}
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>

          {selectedPerson && (
            <PersonDetails 
              person={selectedPerson} 
              onClose={handleCloseModal}
              onUpdate={handlePersonUpdate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FamilyTree;
