// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { articleAddRequest } from '../../../store/services/article'
import { Validator } from 'vee-validate'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'AddArticle'
  static propTypes = {
    article: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new Validator({
      title: 'required|min:3',
      content: 'required|min:10',
      description: 'required|min:10',
    })
    
    this.state = {
      errors: this.validator.errors
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(name, value) {
    this.props.article[name] = value
    const { errors } = this.validator
  
    errors.remove(name)
  
    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const article = this.props.article.toJson()
    const { errors } = this.validator
    
    this.validator.validateAll(article)
      .then((success) => {
        if (success) {
          this.submit(article)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(article) {
    this.props.dispatch(articleAddRequest(article))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator
  
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
  
        this.setState({ errors })
      })
  }
  
  render() {
    return <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <h1>Edit</h1>
      <Form article={this.props.article}
            errors={this.state.errors}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit} />
    </main>
  }
}

export default Page
