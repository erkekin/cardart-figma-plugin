import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import "./App.css";
import { Data } from "./Data.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const CountryContainer = styled.div`
  display: flex;
  // align-items: center;
  width: 90%;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Flag = styled.img`
  height: 48px;
  margin-right: 8px;
  cursor:grab;
`;

function App() {
  const [countries, setCountries] = useState([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }
  
  useEffect(() => {
    setCountries(Data);
  }, []);

  const filteredCountries = countries.filter(country => {
    return country.region.includes(regionFilter) && country.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <div>
      <div>
        Filters
      </div>
      <div>
        <button
          // className={selectedOptions.includes('option1') ? 'selected' : 'button'}
          // style={{ backgroundColor: selectedOptions.includes('option1') ? 'blue' : 'white' }}
          onClick={() => handleOptionToggle('option1')}
        >
          Option 1
        </button>
        <button
          // className={selectedOptions.includes('option2') ? 'selected' : 'button'}
          // style={{ backgroundColor: selectedOptions.includes('option2') ? 'blue' : 'white' }}
          onClick={() => handleOptionToggle('option2')}
        >
          Option 2
        </button>
        <button
          // className={selectedOptions.includes('option3') ? 'selected' : 'button'}
          // style={{ backgroundColor: selectedOptions.includes('option3') ? 'blue' : 'white' }}
          onClick={() => handleOptionToggle('option3')}
        >
          Option 3
        </button>
      </div>
      <div>
        {selectedOptions.length > 0 ? `Selected options: ${selectedOptions.join(', ')}` : 'No options selected'}
      </div>
 

    <Container>
      <Select onChange={e => setRegionFilter(e.target.value)}>
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Select>
      <Input
        type="text"
        placeholder="Search by Country"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredCountries.map(country => (
        <CountryContainer key={country.name}>
          <span onDragEnd={ (e) => {
              if (e.view.length === 0) return;
              window.parent.postMessage(
                {
                  pluginDrop: {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    files: [],
                    dropMetadata: { url: country.flags.png}
                  }
                },
                '*'
              );
          }}>
          <Flag src={country.flag} />
          </span >
          <h3>{country.name}</h3>
        </CountryContainer>
      ))}
    </Container>
    </div>
  );
}

export default App;
