import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import SearchableTable from './components/SearchableTable';
import registerServiceWorker from './registerServiceWorker';
import SearchableTable from './components2/SearchableTable';

function Custom(props){
    let textInput = null;
    function handleclick(){
        textInput.focus();
    }
    return (
        <div>
        <input
          type="text"
          ref={(input) => { textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={handleclick}
        />
      </div>
    )
}
ReactDOM.render(
    <Custom />,
    document.getElementById('root')
)
registerServiceWorker();
