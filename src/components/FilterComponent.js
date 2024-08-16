import React, { useState } from 'react';

const FilterComponent = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    edible: '',
    poisonous: '',
    cycle: '',
    watering: '',
    sunlight: '',
    indoor: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const renderSelect = (name, options) => (
    <select 
      name={name} 
      onChange={handleChange}
      className="w-full p-2 mb-2 rounded border border-[#588157] focus:outline-none focus:border-[#3A5A40]"
    >
      <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-[#A3B18A] p-4 rounded-md">
      <h3 className="text-lg font-semibold text-[#344E41] mb-4">Filters</h3>
      {renderSelect('edible', [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ])}
      {renderSelect('poisonous', [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ])}
      {renderSelect('cycle', [
        { value: 'perennial', label: 'Perennial' },
        { value: 'annual', label: 'Annual' },
        { value: 'biennial', label: 'Biennial' },
        { value: 'biannual', label: 'Biannual' }
      ])}
      {renderSelect('watering', [
        { value: 'frequent', label: 'Frequent' },
        { value: 'average', label: 'Average' },
        { value: 'minimum', label: 'Minimum' },
        { value: 'none', label: 'None' }
      ])}
      {renderSelect('sunlight', [
        { value: 'full_shade', label: 'Full Shade' },
        { value: 'part_shade', label: 'Part Shade' },
        /* { value: 'sun-part_shade', label: 'Sun-Part Shade' }, */
        { value: 'full_sun', label: 'Full Sun' }
      ])}
      {renderSelect('indoor', [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ])}
      <button 
        type="submit"
        className="w-full bg-[#588157] text-white px-4 py-2 rounded-md hover:bg-[#3A5A40] transition duration-300"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterComponent;