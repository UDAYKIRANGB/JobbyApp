import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    locationTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    locationTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    locationTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    locationTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationTypesList = [
  {
    label: 'Hyderabad',
    locationTypeId: 'HYDERABAD',
  },
  {
    label: 'Bangalore',
    locationTypeId: 'BANGALORE',
  },
  {
    label: 'Chennai',
    locationTypeId: 'CHENNAI',
  },
  {
    label: 'Delhi',
    locationTypeId: 'DELHI',
  },
  {
    label: 'Mumbai',
    locationTypeId: 'MUMBAI',
  },
]

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/jobs"
      render={() => (
        <Jobs
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          locationTypesList={locationTypesList}
        />
      )}
    />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
