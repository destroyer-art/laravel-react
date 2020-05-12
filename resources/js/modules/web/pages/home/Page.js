import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"

// import components
import Header from "./components/Header"
import Articles from "../../../../common/articles/listing/index"

// import services
import { articleListRequest } from '../../../article/service'

export default function Page({ dispatch }) {
  useLayoutEffect(() => {
    dispatch(articleListRequest({ url: '/articles/published' }))
  }, [])

  return <div>
    <Header/>
    <Articles/>
  </div>
}

Page.displayName = 'HomePage'
Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
