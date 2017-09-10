// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userUpdate } from '../../../store/actions/user'
import { userUpdateRequest } from '../../../store/services/user'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'UserPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(name, value) {
    const payload = { [name]: value }
    this.props.dispatch(userUpdate(payload))
  }
  
  handleSubmit(e) {
    e.preventDefault()
    
    const payload = Object.assign({}, this.props.user)
    
    this.props.dispatch(userUpdateRequest(payload))
  }
  
  render() {
    return <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <h1>Profile</h1>
  
      <section className="row">
        <div className="col-12 col-md-9 col-sm-12">
          <Form user={this.props.user}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}/>
        </div>
      </section>
    </main>
  }
}

export default Page
