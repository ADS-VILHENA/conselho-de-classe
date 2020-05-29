﻿import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon';
import Register from './pages/register';
import Panel from './pages/panel';
import Monitor from './pages/monitor';
import Course from './pages/course';
import Diagnostic from './pages/diagnostic';
import Class from './pages/class'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/panel" component={Panel} />
                <Route path="/monitor/:id" component={Monitor} />
                <Route path="/course" component={Course} />
                <Route path="/class" component={Class} />
                <Route path="/diagnostic" component={Diagnostic} />
            </Switch>
        </BrowserRouter>
    );
}