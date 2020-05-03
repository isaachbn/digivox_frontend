import React from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Client from './components/client/Home';
import CreateClient from './components/client/CreateClient';
import EditClient from './components/client/EditClient';
import Type from './components/type/Home';
import CreateType from './components/type/CreateType';
import EditType from './components/type/EditType';
import Item from './components/item/Home';
import CreateItem from './components/item/CreateItem';
import EditItem from './components/item/EditItem';

const App: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <Link to="/client"> Clientes </Link>
                    </li>
                    <li>
                        <Link to="/item"> Manter Item </Link>
                    </li>
                    <li>
                        <Link to="/type"> Manter Tipo Item </Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/client" exact component={Client} />
                <Route path="/client/create" exact component={CreateClient} />
                <Route path="/client/edit/:id" exact component={EditClient} />
                <Route path="/type" exact component={Type} />
                <Route path="/type/create" exact component={CreateType} />
                <Route path="/type/edit/:id" exact component={EditType} />
                <Route path="/item" exact component={Item} />
                <Route path="/item/create" exact component={CreateItem} />
                <Route path="/item/edit/:id" exact component={EditItem} />
            </Switch>
        </div>
    );
};

export default App;
