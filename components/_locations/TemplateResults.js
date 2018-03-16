import React from 'react'

const TemplateResults = ({ children }) => {
  const SearchBar = children[0]
  const Map = children[1]
  return (
    <div className='template-wrapper'>
      { children }
      <style jsx>{`
      
      `}</style>
    </div>
  )
}

export default TemplateResults
