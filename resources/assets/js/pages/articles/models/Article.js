import moment from 'moment'
import Model from '../../../utils/Model'

class Article extends Model {
  constructor(props) {
    super(props)
    
    this.initialize(props)
  }
  
  initialize(props) {
    super.initialize(props)
    
    this.slug = props.slug | ''
    this.title = props.title || ''
    this.description = props.description || ''
    this.content = props.content || ''
    this.published = props.published || false
    this.publishedAt = props.publishedAt ? moment(props.publishedAt) : null
  }
}

export default Article
