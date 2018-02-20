import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { binder, geocodeByAddress, geocodeByPlaceId, getLatLng } from '../utils'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = { autocompleteItems: [], value:'' }
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
    if (!window.google) {
      throw new Error('no Google')
    }
    if (!window.google.maps.places) {
      throw new Error('no Google Places')
    }
    this.autocompleteService = new window.google.maps.places.AutocompleteService()
    this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK
  }

  autocompleteCallback (predictions, status) {
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
        active: this.highlightFirstSuggestion && idx === 0 ? true : false,
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting)
      }))
    })
  }

  fetchPredictions () {
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

  clearSuggestions () { this.setState({ autocompleteItems: [] }) }

  selectAddress (address, placeId, e) {
    if (e !== undefined) {
      e.preventDefault()
    }
    this.clearSuggestions()
    this.handleSelect(address, placeId)
  }

  handleInput (val) {
    console.log(val);
    this.setState({ value: val })
    geocodeByAddress(val).then(res => {
      console.log(res);
      if (res.length > 0 && typeof res !== 'string') {
        const markers = []
        res.forEach(place =>
          getLatLng(place).then(latLng => {
            console.log(latLng);
            const marker = {
              position: latLng,
              label: '',
              title: place.formatted_address,
              animation: 'drop',
              onClick: () => { console.log('clicked'); }
            }
            markers.push(marker)
          }).then(() => {
            console.log(markers)
            this.props.setMarkers([])
            this.props.setMarkers(markers)
          })
        )
      } else {
        this.props.setMarkers([])
      }
    }).catch( err => { console.log(err); })
  }

  handleSelect (address, placeId) {
    this.props.onSelect
      ? this.props.onSelect(address, placeId)
      : this.handleInput(address)
  }

  getActiveItem () { return this.state.autocompleteItems.find(item => item.active) }

  selectActiveItemAtIndex (index) {
    console.log(this.state.autocompleteItems)
    const activeName = this.state.autocompleteItems.find(item => item.index === index).suggestion
    this.setActiveItemAtIndex(index)
    this.handleInput(activeName)
  }

  handleEnterKey (val) {
    const activeItem = this.getActiveItem()
    if (activeItem === undefined) {
      this.handleEnterKeyWithoutActiveItem(val)
    } else {
      this.selectAddress(activeItem.suggestion, activeItem.placeId)
    }
  }

  handleEnterKeyWithoutActiveItem (val) {
    if (this.props.onEnterKeyDown) {
      geocodeByAddress(val).then(res => {
        console.log(res)
        getLatLng(res[0]).then(latLng => {
          console.log(latLng)
          this.props.setCenter(latLng)
        })
      })
      this.clearSuggestions()
    } else {
      return
    }
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

  handleInputChange (event) {
    const { value } = event.target
    this.handleInput(value)
    if (!value) {
      this.clearSuggestions()
      return
    }
    if (this.shouldFetchSuggestions({ value })) { this.debouncedFetchPredictions }
  }

  handleInputOnBlur (event) {
    this.clearSuggestions()
    // if (this.props.inputProps.onBlur) { this.props.inputProps.onBlur(event) }
  }

  renderSuggestion () { ({ suggestion }) => <div>{ suggestion }</div> }

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
          <input {...inputProps} placeholder='Please enter a location' />
          { autocompleteItems.length > 0 && (
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
      </div>
    )
  }
}
