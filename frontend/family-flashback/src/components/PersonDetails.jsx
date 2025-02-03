import React, { useState } from 'react';
import PersonForm from './PersonForm'; // We'll create this next

const PersonDetails = ({ person, onClose, onUpdate }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddRelativeForm, setShowAddRelativeForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if this is the root person (generationLevel === 0)
  const isRootPerson = person.generationLevel === 0;

  if (!person) return null;

  if (showEditForm) {
    return <PersonForm 
      person={person} 
      onClose={() => setShowEditForm(false)} 
      onUpdate={onUpdate}
      mode="edit" 
    />;
  }

  if (showAddRelativeForm) {
    return <PersonForm 
      parentPerson={person}
      onClose={() => setShowAddRelativeForm(false)}
      onUpdate={onUpdate}
      mode="add"
    />;
  }

  const handleDelete = async () => {
    if (isRootPerson) {
      alert('The root person cannot be deleted.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this person? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8080/persons/${person.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete person');
      }

      // Call onUpdate to refresh the tree
      if (onUpdate) {
        await onUpdate();
      }
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error deleting person:', error);
      alert('Failed to delete person: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-indigo-900/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ease-out"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 border-b border-indigo-100 pb-4">
          <h2 className="text-2xl font-semibold text-indigo-900 tracking-tight">{person.name}</h2>
          <button 
            onClick={onClose}
            className="text-indigo-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {person.gender && (
            <div className="flex items-center py-2 border-b border-indigo-100">
              <span className="font-medium w-32 text-indigo-900">Gender</span>
              <span className="text-indigo-700">{person.gender === 'M' ? 'Male' : 'Female'}</span>
            </div>
          )}
          
          {person.birthDate && (
            <div className="flex items-center py-2 border-b border-indigo-100">
              <span className="font-medium w-32 text-indigo-900">Birth Date</span>
              <span className="text-indigo-700">
                {new Date(person.birthDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          
          {person.deathDate && (
            <div className="flex items-center py-2 border-b border-indigo-100">
              <span className="font-medium w-32 text-indigo-900">Death Date</span>
              <span className="text-indigo-700">
                {new Date(person.deathDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          
          {person.birthTown && (
            <div className="flex items-center py-2 border-b border-indigo-100">
              <span className="font-medium w-32 text-indigo-900">Birth Town</span>
              <span className="text-indigo-700">{person.birthTown}</span>
            </div>
          )}
          
          {person.bio && (
            <div className="pt-4">
              <span className="font-medium block mb-2 text-indigo-900">Biography</span>
              <p className="text-indigo-700 leading-relaxed bg-white/80 p-4 rounded-lg shadow-sm">
                {person.bio}
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t border-indigo-100">
            <button
              onClick={() => setShowEditForm(true)}
              className="flex-1 px-4 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              Edit Details
            </button>
            <button
              onClick={() => setShowAddRelativeForm(true)}
              className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              Add Relative
            </button>
          </div>
          
          {!isRootPerson && (
            <div className="pt-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full px-4 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-rose-300 disabled:cursor-not-allowed font-medium"
              >
                {isDeleting ? 'Deleting...' : 'Delete Person'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails; 