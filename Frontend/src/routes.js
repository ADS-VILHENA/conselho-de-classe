import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon';
import Register from './pages/register';
import Panel from './pages/panel';
import Monitor from './pages/monitor';
import Course from './pages/course';
import Diagnostic from './pages/diagnostic';
import Serie from './pages/serie'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/panel" component={Panel} />
                <Route path="/monitor/:serie_id" component={Monitor} />
                <Route path="/course" component={Course} />
                <Route path="/serie/:id" component={Serie} />
                <Route path="/diagnostic/:id" component={Diagnostic} />
            </Switch>
        </BrowserRouter>
    );
}