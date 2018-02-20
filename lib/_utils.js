// syntactic-sugary method for this-binding react-class-methods
// use in class constructor like: 'binder(this,['method1','method2'])'
export const binder = (x, Ms) => Ms.forEach(m => (x[m] = x[m].bind(x)))

// apparently react doesn't want you to iterate over children as a simple array, this allows it.
// useful in the case of e.g. applying 'fadeColors' to 
export const forEachChild = (array, callback) => {
  return Array.prototype.forEach.call(array, child => {
    callback(child)
  })
}

// probably going to use something like this a lot (throw inside of position-relative container el):
export const renderGrid = (set, Component) => {
  return set.map((self, i) => {
    return (
      <div className='wrapper' key={i}>
        <Component self={self} />
        <style jsx>{`
          .wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: none;
          }
        `}</style>
      </div>
    )
  })
}
