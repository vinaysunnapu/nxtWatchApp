import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'

import Home from './components/Home'
import VideoDetails from './components/VideoDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFoundRoute'
import SavedVideos from './components/SavesVideos'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
    <ProtectedRoute exact path="/trending" component={Trending} />
    <ProtectedRoute exact path="/gaming" component={Gaming} />
    <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
