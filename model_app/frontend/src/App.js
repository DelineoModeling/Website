import React from 'react';
import './App.css';
import { Header, Footer } from './components';
import { Home, About, Simulator, DevelopmentBlog, Team, Post1, Post2, Post3, Post4} from './containers';
import { Provider } from 'react-redux';
import TeamApplication from "./containers/TeamApplication"
import store from './store';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './const/theme';
// routers
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
  return (
     <ThemeProvider theme={theme}>
      <Provider store={store}>
          <div className={"App"}>
              <Router>
                  <Header />
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/simulator" component={Simulator} />
                      <Route exact path="/team" component={Team} />
                      <Route exact path="/developmentblog" component={DevelopmentBlog} />
                      <Route exact path="/developmentblog/Machine-Learning-Website" component={Post1} />
                      <Route exact path="/developmentblog/Simulation-Development" component={Post2} />
                      <Route exact path="/developmentblog/Simulation-Website" component={Post3} />
                      <Route exact path="/developmentblog/Wells-Riley-Equation" component={Post4} />
                      <Route exact path="/teamapplication" component={TeamApplication}/>
                  </Switch>
                  <Footer />
              </Router>
          </div>
      </Provider>
     </ThemeProvider>
  );
}

export default App;
