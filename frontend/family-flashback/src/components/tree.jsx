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
      
      // Convert persons data to nodes
      const newNodes = data.map((person) => ({
        id: person.id,
        position: { 
          x: 0, 
          y: person.generationLevel * 200 // Increased vertical spacing
        },
        data: {
          ...person,
          label: person.name
        },
        type: 'custom',
        draggable: false,
        style: { width: 'auto' } // Allow node width to be dynamic
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

      // Center align nodes in each generation
      Object.values(generationGroups).forEach(genNodes => {
        const spacing = 300; // Increased horizontal spacing
        const totalWidth = (genNodes.length - 1) * spacing;
        const startX = -totalWidth / 2; // Center the group

        genNodes.forEach((node, index) => {
          node.position.x = startX + (index * spacing);
        });
      });

      // Create edges between adjacent generations
      const newEdges = [];
      data.forEach(person => {
        const closestUpperGen = data
          .filter(p => p.generationLevel === person.generationLevel - 1)
          .map(p => ({
            id: `e${p.id}-${person.id}`,
            source: p.id,
            target: person.id,
            type: 'smoothstep',
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: {
              type: 'arrow',
              color: '#94a3b8',
            },
          }));
        newEdges.push(...closestUpperGen);
      });

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
            nodes={nodes.map(node => ({
              ...node,
              data: {
                ...node.data,
                isSelected: selectedPerson?.id === node.id
              }
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={{
              custom: (props) => (
                <CustomNode 
                  {...props} 
                  isSelected={props.data.isSelected}
                  onClick={handleNodeClick}
                />
              )
            }}
            fitView
            panOnScroll={true}
            zoomOnScroll={true} // Enable zoom on scroll
            minZoom={0.5} // Set minimum zoom level
            maxZoom={1.5} // Set maximum zoom level
            nodesDraggable={false}
            preventScrolling={false} // Allow scrolling
            style={{ 
              zIndex: 0,
              backgroundColor: 'transparent'
            }}
            defaultViewport={{ zoom: 1 }}
            fitViewOptions={{
              padding: 0.2,
              duration: 800
            }}
          >
            <Background 
              color="#94a3b8" 
              style={{ backgroundColor: 'transparent' }}
              gap={24}
              size={1}
            />
            <Controls 
              showZoom={true} // Show zoom controls
              showFitView={true}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md"
            />
            <MiniMap 
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md"
              nodeColor={node => {
                if (node.data.generationLevel === 0) return '#8b5cf6';
                return '#cbd5e1';
              }}
              zoomable
              pannable
            />
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
