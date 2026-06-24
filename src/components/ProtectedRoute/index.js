import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  const {component: Component, render, ...rest} = props
  return (
    <Route
      {...rest}
      render={routeProps =>
        Component ? <Component {...routeProps} /> : render(routeProps)
      }
    />
  )
}

export default ProtectedRoute
