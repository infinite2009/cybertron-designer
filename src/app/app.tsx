import React, { ComponentClass, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { routeConfig } from '@/router';

// const LazyStrawberryIcon = lazy(() => import('./strawberry'));
const App = (): React.ReactElement => {
  const routerTpl = routeConfig.map((item) => {
    const Cmp: ComponentClass = item.component as ComponentClass;
    return (
      <Route key={item.path} path={item.path} exact>
        {
          item.redirect ?
            <Redirect key={item.path} to={item.redirect} /> : <Suspense key={item.path} fallback={'loading...'}>
              <Cmp />
            </Suspense>
        }
      </Route>
    );
  });
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          {routerTpl}
        </Switch>
      </Router>
      {/* <Suspense fallback={'loading...'}>
        <LazyStrawberryIcon className={styles.stylesImage} />
      </Suspense> */}
    </RecoilRoot>
  )
};

export default App;
