import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import "./App.css";
import { Cards } from "./Cards.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Filters = styled.div`
  width: 100%;
`;

const FilterItems = styled.div`
  margin-bottom: 16px;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
`;

const CountryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
`;

const Flag = styled.img`
  height: 44px;
  width: 70px;
  margin-right: 8px;
  cursor:grab;
`;

function App() {
  const [countries, setCards] = useState([]);
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
    setCards(Cards);
  }, []);

  const filteredCountries = countries
    .filter(card => {
      return card.ext == "png" && card.is_previewable == true && card.title.toLowerCase().includes(searchTerm.toLowerCase());
      // return card.project.includes(regionFilter) && card.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  const audienceFilters = ['Consumer', 'Business', 'Corporate'];
  const portfolioFilters = ['Proprietary', 'Proprietary Cobrand'];
  const regionFilters = ['APAC', 'EMEA', 'LAC', 'NORAM'];

  const [audienceActive, setAudienceActive] = useState(audienceFilters[0]);
  const [portfolioActive, setPortfolioActive] = useState(portfolioFilters[0]);
  const [regionActive, setRegionActive] = useState(regionFilters[0]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search Card Art"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Filters>


        <div align="left">
          <header>Audience</header>
        </div>
        <FilterItems>
          {audienceFilters.map(type => (
            <button
              key={type}
              audienceActive={audienceActive === type}
              onClick={() => setAudienceActive(type)}
            >
              {type}
            </button>
          ))}
        </FilterItems>

        <div align="left">
          <header>Portfolio</header>
        </div>
        <FilterItems>
          {portfolioFilters.map(type => (
            <button
              key={type}
              audienceActive={portfolioActive === type}
              onClick={() => setPortfolioActive(type)}
            >
              {type}
            </button>
          ))}
        </FilterItems>


        <div align="left">
          <header>Region</header>
        </div>
        <FilterItems>
          {regionFilters.map(type => (
            <button
              key={type}
              audienceActive={regionActive === type}
              onClick={() => setRegionActive(type)}
            >
              {type}
            </button>
          ))}
        </FilterItems>
      </Filters>


      <div align="left">
        <header>Results {filteredCountries.length}</header>
      </div>
      <Container>
        {filteredCountries.map(country => (
          <CountryContainer key={country.title}>
            <span onDragEnd={(e) => {
              if (e.view.length === 0) return;
              window.parent.postMessage(
                {
                  pluginDrop: {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    files: [],
                    dropMetadata: { url: country.preview_url }
                  }
                },
                '*'
              );
            }}>
              <Flag src={country.preview_url} />
            </span >
            {country.title}
          </CountryContainer>
        ))}
      </Container>
    </div>
  );
}

export default App;
