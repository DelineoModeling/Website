import React from 'react';
import './App.css';
import { Header, Footer } from './components';
import { Home, About, DevelopmentBlog, Team, Post1, Post2, Anytown, RealSimulator} from './containers';
import { Provider } from 'react-redux';
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
                      <Route exact path="/simulator" component={RealSimulator} />
                      <Route exact path="/anytown" component={Anytown} />
                      <Route exact path="/team" component={Team} />
                      <Route exact path="/developmentblog" component={DevelopmentBlog} />
                      <Route exact path="/developmentblog/post1" component={Post1} />
                      <Route exact path="/developmentblog/post2" component={Post2} />
                  </Switch>
                  <Footer />
              </Router>
          </div>
      </Provider>
     </ThemeProvider>
  );
}

export default App;
