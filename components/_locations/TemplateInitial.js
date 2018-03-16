import React from 'react'

const TemplateInitial = ({ children }) => {
  const Title = children[0]
  const SearchBar = children[1]
  const Map = children[2]
  return (
    <div className='template-wrapper'>
      <div className='title-wrapper'>{ Title }</div>
      <div className='search-wrapper'>{ SearchBar }</div>
      <div className='map-wrapper'>{ Map }</div>
      <style jsx>{`
        .template-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .map-wrapper {}
      `}</style>
    </div>
  )
}

export default TemplateInitial
