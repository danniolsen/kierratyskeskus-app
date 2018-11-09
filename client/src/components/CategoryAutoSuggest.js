import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';
import Fields from './Fields';

// TODO: Style li's generated by autosuggest
// TODO: Make Category to use redux-form
// TODO: Check after redux-form that the validation works

const languages = [
  {
    title: '1970s',
    languages: [
      {
        name: 'C',
        year: 1972,
      },
    ],
  },
  {
    title: '1980s',
    languages: [
      {
        name: 'C++',
        year: 1983,
      },
      {
        name: 'Perl',
        year: 1987,
      },
    ],
  },
  {
    title: '1990s',
    languages: [
      {
        name: 'Haskell',
        year: 1990,
      },
      {
        name: 'Python',
        year: 1991,
      },
      {
        name: 'Java',
        year: 1995,
      },
      {
        name: 'Javascript',
        year: 1995,
      },
      {
        name: 'PHP',
        year: 1995,
      },
      {
        name: 'Ruby',
        year: 1995,
      },
    ],
  },
  {
    title: '2000s',
    languages: [
      {
        name: 'C#',
        year: 2000,
      },
      {
        name: 'Scala',
        year: 2003,
      },
      {
        name: 'Clojure',
        year: 2007,
      },
      {
        name: 'Go',
        year: 2009,
      },
    ],
  },
  {
    title: '2010s',
    languages: [
      {
        name: 'Elm',
        year: 2012,
      },
    ],
  },
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Teach Autosuggest how to calculate suggestions for any given input value.
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return languages;
  }

  const regex = new RegExp(`^${escapedValue}`, 'i');

  return languages
    .map(section => ({
      title: section.title,
      languages: section.languages.filter(language => regex.test(language.name)),
    }))
    .filter(section => section.languages.length > 0);
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
  return suggestion.name;
}

// Use your imagination to render suggestions.
function renderSuggestion(suggestion) {
  return (
    <span>
      <input id={suggestion.name} type="checkbox" />
      <label className="suggestionLabelStyle" htmlFor={suggestion.name}>{suggestion.name}</label>
    </span>
  );
}

function renderSectionTitle(section) {
  return (
    <div>
      <input type="checkbox" />
      <strong>{section.title}</strong>
    </div>
  );
}

function getSectionSuggestions(section) {
  return section.languages;
}

const renderInputComponent = inputProps => (
  <div>
    <input {...inputProps} className="form-control" />
  </div>
);

export default class CategoryAutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: languages,
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  render() {
    const { label } = _.find(Fields, { label: 'Category' });
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange,
    };
    return (
      <div className="form-group autosuggestionStyle">
        <label>{label}</label>
        <Autosuggest
          multiSection
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={getSectionSuggestions}
          renderInputComponent={renderInputComponent}
          alwaysRenderSuggestions
          inputProps={inputProps}
        />
      </div>
    );
  }
}
