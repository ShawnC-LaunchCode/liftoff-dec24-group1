import React, { useState } from 'react';

const PersonForm = ({ person, parentPerson, onClose, onUpdate, mode }) => {
  const [formData, setFormData] = useState(
    mode === 'edit' ? person : {
      name: '',
      gender: '',
      birthDate: '',
      deathDate: '',
      birthTown: '',
      bio: '',
      generationLevel: parentPerson ? parentPerson.generationLevel + 1 : 0,
      relationship: '',
      rootPersonId: mode === 'add' ? parentPerson.id : null
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = mode === 'edit' 
        ? `http://localhost:8080/persons/${person.id}`
        : 'http://localhost:8080/persons';
        
      // Only include fields that have been changed when editing
      const requestBody = mode === 'edit' 
        ? Object.entries({
            name: formData.name,
            gender: formData.gender,
            birthDate: formData.birthDate,
            deathDate: formData.deathDate,
            birthTown: formData.birthTown,
            bio: formData.bio,
          }).reduce((acc, [key, value]) => {
            // Only include fields that have a value and are different from the original
            if (value !== null && value !== undefined && value !== person[key]) {
              acc[key] = value || null;
            }
            return acc;
          }, {})
        : {
            name: formData.name,
            gender: formData.gender,
            birthDate: formData.birthDate || null,
            deathDate: formData.deathDate || null,
            birthTown: formData.birthTown || null,
            bio: formData.bio || null,
            relationship: formData.relationship,
            rootPersonId: formData.rootPersonId
          };

      const response = await fetch(url, {
        method: mode === 'edit' ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save person');
      }

      // Call onUpdate to refresh the tree
      if (onUpdate) {
        await onUpdate();
      }
      
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error saving person:', error);
      alert('Failed to save person: ' + error.message);
    }
  };

  const handleRelationshipChange = (relationship) => {
    let newGenerationLevel = parentPerson.generationLevel;
    
    switch (relationship) {
      case 'parent':
        newGenerationLevel -= 1;
        break;
      case 'child':
        newGenerationLevel += 1;
        break;
      case 'sibling':
        // Same generation level
        break;
      case 'spouse':
        // Same generation level
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      relationship,
      generationLevel: newGenerationLevel
    });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full mx-4 transform transition-all duration-300 ease-out"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            {mode === 'edit' ? 'Edit Person Details' : 'Add New Family Member'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'add' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Relationship to {parentPerson.name}
              </label>
              <select
                value={formData.relationship}
                onChange={e => handleRelationshipChange(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                required
              >
                <option value="">Select Relationship</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="sibling">Sibling</option>
                <option value="spouse">Spouse</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={e => setFormData({...formData, birthDate: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Death Date</label>
              <input
                type="date"
                value={formData.deathDate}
                onChange={e => setFormData({...formData, deathDate: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Birth Town</label>
            <input
              type="text"
              value={formData.birthTown}
              onChange={e => setFormData({...formData, birthTown: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Biography</label>
            <textarea
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 min-h-[120px]"
              rows="4"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              {mode === 'edit' ? 'Save Changes' : 'Add Person'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonForm; 