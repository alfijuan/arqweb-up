import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Default } from './views/default';
import { UserList, UserABM } from './views/users';
import { CategoriesList, CategoriesABM } from './views/categories';
import { CoursesList, CoursesABM } from './views/courses';
import { LessonsList, LessonsABM } from './views/lessons';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/courses/:id/lessons/:lessonId" component={LessonsABM} />
        <Route path="/courses/:id/lessons/add" component={LessonsABM} />
        <Route path="/courses/:id/lessons" component={LessonsList} />

        <Route path="/courses/:id" component={CoursesABM} />
        <Route path="/courses/add" component={CoursesABM} />
        <Route path="/courses" component={CoursesList} />

        <Route path="/categories/:id" component={CategoriesABM} />
        <Route path="/categories/add" component={CategoriesABM} />
        <Route path="/categories" component={CategoriesList} />

        <Route path="/users/:id" component={UserABM} />
        <Route path="/users/add" component={UserABM} />
        <Route path="/users" component={UserList} />
        <Route component={Default} />
      </Switch>
    </BrowserRouter>
  );  
}

export default App;