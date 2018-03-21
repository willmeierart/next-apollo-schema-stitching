import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { geocodeByAddress, getLatLng } from '../../lib/_mapUtils'
import { binder } from '../../lib/_utils'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = { autocompleteItems: [], value: '', markers: [] }
    binder(this, ['autocompleteCallback',
      'clearSuggestions',
      'fetchPredictions',
      'selectAddress',
      'handleSelect',
      'getActiveItem',
      'selectActiveItemAtIndex',
      'handleEnterKey',
      'handleEnterKeyWithoutActiveItem',
      'handleDownKey',
      'handleUpKey',
      'handleInputKeyDown',
      'setActiveItemAtIndex',
      'handleInputChange',
      'handleInputOnBlur',
      'renderSuggestion',
      'renderFooter',
      'handleInput',
      'getInputProps'
    ])
    this.debouncedFetchPredictions = debounce(this.fetchPredictions, 800)
    this.highlightFirstSuggestion = false
    this.shouldFetchSuggestions = (thing) => { if (thing) return true }
  }

  componentDidMount () {
    const init = () => {
      if (typeof window !== 'undefined' || !window.google.maps.places) {
        if (!window.google) {
          // throw new Error('no Google')
          console.log('no google')
          setTimeout(init, 500)
        } else {
          this.autocompleteService = new window.google.maps.places.AutocompleteService()
          this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK
          this.distanceService = new window.google.maps.DistanceMatrixService()
        }
      } else {
        setTimeout(init, 500)
      }
    }
    init()
  }

  autocompleteCallback (predictions, status) {
    // called by this.fetchPredictions, used as callback to native google autocomplete func
    // predictions are each full object returned from autocompleteservice
    if (status !== this.autocompleteOK) {
      console.error(status)
      this.clearSuggestions()
      return
    }
    const formattedSuggestion = format => ({
      main: format.main_text,
      secondary: format.secondary_text
    })
    this.setState({
      autocompleteItems: predictions.map((p, idx) => ({
        suggestion: p.description,
        placeId: p.place_id,
        active: this.highlightFirstSuggestion && idx === 0,
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting)
      }))
    })
  }

  fetchPredictions () {
    // magical google autocomplete connector function
    const { value } = this.state
    if (value.length) {
      this.autocompleteService.getPlacePredictions(
        {
          ...this.props.options,
          input: value
        },
        this.autocompleteCallback
      )
    }
  }

  clearSuggestions () {
    this.setState({ autocompleteItems: [] })
  }

  selectAddress (address, placeId, e) {
    // called by each handler: enter / mousedown / touchend
    if (e !== undefined) {
      e.preventDefault()
    }
    this.clearSuggestions()
    this.handleSelect(address, placeId) // these are properties on the 'active selection' object
  }

  handleSelect (address, placeId) {
    // called right above ^
    this.props.onSelect
      ? this.props.onSelect(address, placeId) // this doesn't exist, as far as I know...
      : this.handleInput(address)

    // MINE: try this here....
    geocodeByAddress(address).then(res => {
      // console.log(res)
      if (res.length > 0 && typeof res !== 'string') {
        const markers = []
        res.forEach(place =>
          getLatLng(place).then(latLng => {
            // console.log(latLng)
            const marker = {
              position: latLng,
              title: place.formatted_address,
              animation: 'drop',
              onClick: () => { console.log('clicked') }
            }
            markers.push(marker)
            this.props.setCenter(latLng)
          }).then(() => {
            console.log(markers)
            // this.props.setMarkers([])
            this.props.setMarkers(markers)
          })
        )
      } else {
        this.props.setMarkers([])
      }
    }).catch(err => { console.log(err) })
  }

  handleInput (val) { this.setState({ value: val }) } // val = address (active selection)

  getActiveItem () { return this.state.autocompleteItems.find(item => item.active) }

  selectActiveItemAtIndex (index) {
    // this is what points at a certain item and gets selects that one specifically
    console.log(this.state.autocompleteItems)
    const activeName = this.state.autocompleteItems.find(item => item.index === index).suggestion
    this.setActiveItemAtIndex(index) // below
    this.handleInput(activeName) // above
  }

  setActiveItemAtIndex (index) {
    this.setState({
      autocompleteItems: this.state.autocompleteItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, active: true }
        } else {
          return { ...item, active: false }
        }
      })
    })
  }

  handleEnterKey (val) {
    console.log(val)
    const activeItem = this.getActiveItem()
    console.log(activeItem)
    if (activeItem === undefined) {
      this.handleEnterKeyWithoutActiveItem()
    } else {
      this.selectAddress(activeItem.suggestion, activeItem.placeId)
    }
  }

  handleEnterKeyWithoutActiveItem () {
    console.log('no active item')
    this.props.setMarkers([])
  }

  handleDownKey () {
    if (this.state.autocompleteItems.length === 0) return
    const activeItem = this.getActiveItem()
    if (activeItem === undefined) {
      this.selectActiveItemAtIndex(0)
    } else {
      const nextIndex = (activeItem.index + 1) % this.state.autocompleteItems.length
      this.selectActiveItemAtIndex(nextIndex)
    }
  }

  handleUpKey () {
    if (this.state.autocompleteItems.length === 0) return
    const activeItem = this.getActiveItem()
    if (activeItem === undefined) {
      this.selectActiveItemAtIndex(this.state.autocompleteItems.length - 1)
    } else {
      let prevIndex
      if (activeItem.index === 0) {
        prevIndex = this.state.autocompleteItems.length - 1
      } else {
        prevIndex = (activeItem.index - 1) % this.state.autocompleteItems.length
      }
      this.selectActiveItemAtIndex(prevIndex)
    }
  }

  handleInputKeyDown (event) {
    switch (event.key) {
      case 'Enter' :
        event.preventDefault()
        this.handleEnterKey(event.target.value)
        break
      case 'ArrowDown' :
        event.preventDefault()
        this.handleDownKey()
        break
      case 'ArrowUp' :
        event.preventDefault()
        this.handleUpKey()
        break
      case 'Escape' :
        this.clearSuggestions()
        break
      default :
        break
    }
    // if (this.props.inputProps.onKeyDown) { this.props.inputProps.onKeyDown(event) }
  }

  handleInputChange (event) {
    const { value } = event.target
    this.handleInput(value)
    if (!value) {
      this.clearSuggestions()
      return
    }
    if (this.shouldFetchSuggestions({ value })) {
      this.debouncedFetchPredictions()
    }
  }

  handleInputOnBlur (event) {
    this.clearSuggestions()
    // if (this.props.inputProps.onBlur) { this.props.inputProps.onBlur(event) }
  }

  renderSuggestion ({ suggestion }) {
    return <div>{ suggestion }</div>
  }

  renderFooter () {}

  getInputProps () {
    const defaultInputProps = {
      type: 'text',
      autoComplete: 'off'
    }
    return {
      ...defaultInputProps,
      onChange: e => { this.handleInputChange(e) },
      onKeyDown: e => { this.handleInputKeyDown(e) },
      onBlur: e => { this.handleInputOnBlur(e) },
      value: this.state.value
    }
  }

  render () {
    const { autocompleteItems } = this.state
    const inputProps = this.getInputProps()

    return (
      <div className='searchbar-wrapper'>
        <div className='searchbar-root'>
          <input className='searchbar-input' {...inputProps} placeholder='Please enter a location' />
          { /*autocompleteItems.length > 0*/true && (
            <div className='searchbar-autocompleteContainer'>
              { autocompleteItems.map((p, idx) => (
                <div key={p.placeId} className={p.active ? 'searchbar-autocompleteItemActive' : 'searchbar-autocompleteItem'}
                  onMouseOver={() => this.setActiveItemAtIndex(p.index)}
                  onMouseDown={e => this.selectAddress(p.suggestion, p.placeId, e)}
                  onTouchStart={() => this.setActiveItemAtIndex(p.index)}
                  onTouchEnd={e => this.selectAddress(p.suggestion, p.placeId, e)}>
                  { this.renderSuggestion({
                    suggestion: p.suggestion,
                    formattedSuggestion: p.formattedSuggestion
                  }) }
                </div>
              )) }
              { this.renderFooter() }
            </div>
          ) }
        </div>
        <style jsx>{`

          .searchbar-wrapper {
            margin-bottom: 2vh;
            width: 100%;
            display: flex;
          }

          .searchbar-root {
            position: relative;
            padding-bottom: 0px;
            z-index: 10;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .searchbar-input {
            display: inline-block;
            padding: 10px;
            width: 50%;
            left:25%;
            border-radius: 3px;
            border: 1px solid black;
          }

          .searchbar-autocompleteContainer {
            position: absolute;
            top: 99%;
            background-color: white;
            border: 1px solid #555555;
            width: 50%;
            display: flex;
            flex-direction: column;
          };
          .searchbar-autocompleteItem{
            background-color: #ffffff;
          }
          .searchbar-autocompleteItem, 
          .searchbar-autocompleteItemActive {
            {/* height: 20px; */}
            padding: 10px;
            {/* color: #555555; */}
            color:black;
            cursor: pointer;
          };
          .searchbar-autocompleteItemActive {
            background-color: #fafafa;
          }

        `}</style>
      </div>
    )
  }
}
