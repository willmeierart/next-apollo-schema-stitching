import React, { Component } from 'react'

class Images extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeImg: ''
    }
  }

  renderThumbs () {
    return this.props.images.reduce((a, b) => {
      if (b !== this.state.activeImg) {
        a.push(
          <div className='thumb-wrapper'>
            <img src={b} onClick={this.selectImg} />
          </div>
        )
      }
    }, [])
  }

  selectImg (img) { this.setState({ activeImg: img }) }

  render () {
    return (
      <div>
        <div className='main-img-wrapper'>
          <img src={this.state.activeImg} />
        </div>
        <div className='thumb-row-wrapper'>{ this.renderThumbs() }</div>
      </div>
    )
  }
}

export default Images
