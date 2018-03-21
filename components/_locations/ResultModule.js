const ResultModule = ({ location, pickLocation, detail }) => {
  const address = location ? location.address : ''
  const addrSplitta = address.indexOf(',')
  const addr1 = address.substring(0, addrSplitta)
  const addr2 = address.substring(addrSplitta + 2, address.length)
  const onPickLocation = () => {
    if (pickLocation) pickLocation(location)
  }
  return location !== null ? (
    <div className='result-outer'>
      <div className='result-inner'>
        <h3>{ location.name }</h3>
        <div className='details-container'>
          <div className='col col-left'>
            <div className='small-grey-1 addr-1'>{ addr1 }</div>
            <div className='small-grey-1 addr-2'>{ addr2 }</div>
            <div className='phone'>{ location.phone }</div>
            <div className='small-grey-2 details'>{ location.details } </div>
          </div>
          <div className='col col-right'>
            <div className='hours'>HOURS</div>
            <div>{ location.hours.map((hrs, i) => (
              <div key={`hrs-${i}`} className='mapped-hrs'>
                <div className='small-grey-2'>{ hrs.day }</div>
                <div className='small-grey-2'>{ hrs.time }</div>
              </div>
            )) }</div>
            { !detail &&
              <div className='visit-btn' onClick={onPickLocation}>VISIT LOCATION PAGE</div>
            }
          </div>
        </div>
      </div>
      <style jsx>{`
        .result-inner {
          margin: 1em 0;
        }
        h3 {
          margin: 0;
          margin-bottom: .25em;
        }
        .details-container {
          display: flex;
          justify-content: space-between;
          position: relative;
          line-height: 1.25em;
        }
        .col1 {
          width: 69%;
        }
        .col2 {
          width: 39%;
        }
        .col {
          width: 49%;
        }
        .small-grey-1, .small-grey-2 {
          font-size: .75em;
          color: grey;
        }
        .small-grey-2 {
          font-size: .5em;
          line-height: 2em;
        }
        .hours {
          font-size: .7em;
        }
        .phone, .visit-btn {
          font-size: .85em;
        }
        .visit-btn {
          background-color: lightgrey;
          border: 2px solid grey;
          border-radius: 2px;
          text-align: center;
          font-size: .5em;
          cursor: pointer;
        }
        .mapped-hrs {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  ) : null
}

export default ResultModule
