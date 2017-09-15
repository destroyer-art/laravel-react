import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { articleListRequest } from '../../store/services/article'

// import Components
import Articles from '../../common/articles/listing/index'

class Page extends Component {
  static displayName = 'HomePage'
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      //
    }
  }
  
  componentDidMount() {
    this.props.dispatch(articleListRequest({ url: '/articles/published' }))
  }
  
  render() {
    return (
      <div>
        <header className="bg-primary text-white">
          <div className="container text-center">
            <img width="125" height="125" src="/img/moeen.jpg" alt="..." className="rounded-circle" />
            <h1>Moeen Farooq Basra</h1>
            <p className="lead">Master in Information Technology</p>
            <p className="lead">Web Developer at <a className="text-white" href="infamous.ae" target="_blank">Infamous.ae</a></p>
            <p className="lead"><i className="oi oi-heart text-danger" />{`{ PHP, JavaScript, Python, MySQL, MongoDB }`}</p>
          </div>
        </header>
        <Articles/>
      </div>
    )
  }
}

export default Page
