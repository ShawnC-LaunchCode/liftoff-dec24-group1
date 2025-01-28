import React, { useState, useEffect } from 'react';
import AddPersonButton from './addPersonButton';
import ViewPersonButton from './viewPersonButton';
import ModalManager from './modalManager';

const FamilyTree = () => {

  const [rootPerson, setRootPerson] = useState(null);
  const handleRootPersonClick = (rootPersonId) => {
    setRootPerson(rootPersonId); 
  };
  // I think something like <div onClick={() => handleRootPersonClick(rootId)}>Person thingy</div>
  // But for testing in the meantime...
  useEffect(() => {
    setRootPerson('dct4GZiwTnIvLg1YD7bAW');
  }, []);


  const [familyData, setFamilyData] = useState({
    name: "Me",
    parents: [
      {
        name: "Father",
        parents: [
          {
            name: "Grandfather (Paternal)",
            parents: []
          },
          {
            name: "Grandmother (Paternal)",
            parents: []
          }
        ]
      },
      {
        name: "Mother",
        parents: [
          {
            name: "Grandfather (Maternal)",
            parents: []
          },
          {
            name: "Grandmother (Maternal)",
            parents: []
          }
        ]
      }
    ],
    children: [
      {
        name: "Child 1",
        children: []
      },
      {
        name: "Child 2",
        children: []
      }
    ]
  });


  const TreeNode = ({ node, direction = 'root' }) => {
    const [isChildrenExpanded, setIsChildrenExpanded] = useState(true);
    const [isParentsExpanded, setIsParentsExpanded] = useState(true);


    return (
      <div className="flex flex-col items-center">
        {/* Parents section - always visible for root node */}
        {direction !== 'down' && node.parents && node.parents.length > 0 && isParentsExpanded && (
          <>
            <div className="flex gap-48">
              {node.parents.map((parent, index) => (
                <div key={index} className="relative">
                  <TreeNode node={parent} direction="up" />
                  <div className="absolute bottom-0 left-1/2 w-[2px] h-20 bg-gray-700 transform -translate-x-1/2" />
                </div>
              ))}
            </div>
            {node.parents.length > 1 && (
              <div className="relative w-[400px] h-[2px] bg-gray-700" />
            )}
          </>
        )}

        {/* Current node */}
        <div className={`px-8 py-4 border-2 ${direction === 'root' ? 'border-blue-500' : 'border-gray-700'} rounded-lg bg-white shadow-md`}>
          <div className="flex items-center gap-2">
            <span>{node.name}</span>
            {/* Only show collapse button for children if there are children */}
            {node.children?.length > 0 && (
              <button
                onClick={() => setIsChildrenExpanded(!isChildrenExpanded)}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                {isChildrenExpanded ? '▼' : '▶'}
              </button>
            )}
            {/* Show separate collapse button for parents if not root */}
            {direction !== 'root' && node.parents?.length > 0 && (
              <button
                onClick={() => setIsParentsExpanded(!isParentsExpanded)}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                {isParentsExpanded ? '▲' : '▴'}
              </button>
            )}
          </div>
        </div>

        {/* Children section */}
        {direction !== 'up' && node.children && node.children.length > 0 && isChildrenExpanded && (
          <>
            <div className="w-[2px] h-20 bg-gray-700" />
            
            {node.children.length > 1 && (
              <div className="relative w-[400px] h-[2px] bg-gray-700" />
            )}
            
            <div className="flex gap-48">
              {node.children.map((child, index) => (
                <div key={index} className="relative">
                  <TreeNode node={child} direction="down" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };


  return (
    <div className="p-8 w-full overflow-x-auto">
      <div className="flex justify-center min-w-max">
        <TreeNode node={familyData} />
      </div>
      {rootPerson && (
        <ModalManager rootPerson={rootPerson}>
          <AddPersonButton />
        </ModalManager>
      )}
      {rootPerson && (
      <ViewPersonButton rootPerson={rootPerson}/>
      )}
    </div>
  );
};


export default FamilyTree;
