import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import CadastrarUsuarios from '../Pages/CadastrarUsuarios/index'
import ListarUsuarios from '../Pages/ListarUsuarios/index'
import EditarUsuarios from '../Pages/EditarUsuarios/index'

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = false;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/" component={CadastrarUsuarios} />
          <Route exact path="/listar" component={ListarUsuarios} />
          <Route exact path="/editar/:idUsuario" component={EditarUsuarios} />
          <Route path="*" component={CadastrarUsuarios} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;