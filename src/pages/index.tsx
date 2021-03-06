import React from 'react';
import '../assets/reset.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import CalculatorPage from './calculator/calculator';

function Index() {
  return (
    <div className='index home'>
      <HashRouter>
        <Switch>
          <Route path='/calculator' component={CalculatorPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default Index;
