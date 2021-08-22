import '../assets/reset.css';
import { Switch, Route, HashRouter } from 'react-router-dom'
import Home from './home/home';
import CalculatorPage from './home/calculator/calculator';
import DetailPage from './home/detail/detail';

function Index() {
  return (
    <div className='index'>
      <HashRouter>
        <Switch>
          <Route path='/rank' component={Home} />
          <Route path='/calculator' component={CalculatorPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default Index;