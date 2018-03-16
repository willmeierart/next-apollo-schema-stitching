import React from 'react'
import Images from './Images'

const TemplateDetail = ({ children }) => {
  const SearchBar = children[0]
  const Map = children[1]
  return (
    <div className='template-wrapper'>
      <Images images={[]} />
      { children }
      <style jsx>{`
      
      `}</style>
    </div>
  )
}

export default TemplateDetail
