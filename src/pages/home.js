import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Post from '../components/Post'

class home extends Component {
  state = {
    posts : null
  }
  componentDidMount(){
    axios.get('/posts')
      .then(res=>{
        console.log(res.data)
        this.setState({posts:res.data})
      })
      .catch(err=>console.log(err))
  }
  render() {
    const {posts} = this.state
    let recentPostMarkup = posts ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : <p>Loading...</p>
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPostMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    )
  }
}

export default home
