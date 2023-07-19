/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render typeahead sow component
 * Associated Route/Usage: /#search
*/

// server.autosuggest.js
import React from 'react';
import Autosuggest from 'react-autosuggest';
import config from '../../config';
const controllerRef = new AbortController();
//const { signal } = controller;

class SowAutoSuggest extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }

    // Filter logic
    getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;
        let response = await fetch(`${config.apiUrl.node}/search/auto-suggestions/${inputValue}`, { signal: controllerRef.current?.signal }).catch(e => {
            // called on cancel
            console.error(`Error: ${e.message}`);
        });
       
        if(response){
            let data = await response.json()
            controllerRef.current = null;
            return data;
        }else{
            return []
        }
        
    };

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.NumberSOW;

    // Render Each Option
    renderSuggestion = suggestion => (
        <span className="sugg-option">
            <span className="name">
                {suggestion.NumberSOW}
            </span>
        </span>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
            .then(data => {
                if (data!=null && data.data && data.data.length>0) {
                    //console.log(data.data)
                    this.setState({
                        suggestions: data?data.data:[]
                    });
                } else {
                    this.setState({
                        suggestions: []
                    });
                }
            })
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    suggestionSelected = (e, option) => {
        window.location = "/#/"+(this.props.params?this.props.params.slug:'sow')+"/"+(option?option.suggestion.NumberSOW:'');
    }

    render() {
        const { value, suggestions } = this.state;

        // Option props
        const inputProps = {
            placeholder: 'Type SOW',
            value,
            onChange: this.onChange
        };

        // Adding AutoSuggest component
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.suggestionSelected}
                inputProps={inputProps}
            />
        );
    }
}

export default SowAutoSuggest;