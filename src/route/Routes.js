import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './loading'

const pageA = Loadable({
    loader: () => import('../views/pageA'),
    loading: LoadingComponent
});
const pageB = Loadable({
    loader: () => import('../views/pageB'),
    loading: LoadingComponent
});

const Root = () => (
    <div>
        <Switch>
            <Route path='/' render={() => (
                <Switch>
                    <Route path="/index" component={pageA} />
                    <Route path="/pageB" component={pageB} />
                    <Route render={() => <Redirect to="/index" />} />
                </Switch>
            )}></Route>
        </Switch>
    </div>
);

export default Root;