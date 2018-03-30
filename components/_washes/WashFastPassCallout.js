import PropTypes from 'prop-types'
import fastPassData from '../../lib/_data/fastPassData'

const WashFastPassCallout = props => {
  const { copy, price } = fastPassData
  const splitCopy = copy.split('\n')
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='col-left'>
          <div className='first'>{ splitCopy[0].toUpperCase() }</div>
          <div className='second'>{ splitCopy[1].toUpperCase() }</div>
          <div className='third'>{ splitCopy[2].toUpperCase() }</div>
        </div>
        <div className='col-right'>
          <div className='price'>
            <div className='dollasign'>$</div>
            <div className='number'>{ price }</div>
            <div className='per-month'> PER MONTH </div>
          </div>
          <div className='fastpass-btn'>GO UNLIMITED!</div>
        </div>
      </div>
      <style jsx>{`
        .outer-container {
          width: 100%;
        }
        .inner-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .col-left {
          font-size: 1.25em;
          color: grey;
          font-weight: bold;
          text-align: justify;
          flex-wrap: nowrap;
          white-space: nowrap;
        }
        .col-left .second {
          color: black;
          font-size: 1.66em;
        }
        .col-left .third {
          font-size: 1.25em;
        }
        .col-right {
          display: flex;
          flex-direction: column;
          margin-left: 5px;
          
        }
        .price {
          display: flex;
          flex-direction: row;
        }
        .number {
          font-size: 3em;
          font-weight: bold;
        }
        .per-month {
          display: flex;
          flex-wrap: wrap;
          flex-grow: 0;
          align-self: flex-end;
          font-weight: bold;
        }
        .fastpass-btn {
          background: lightgrey;
          border: 1px solid black;
          border-radius: 5px;
          text-align: center;
          font-size: .75em;
          box-sizing: border-box;
          padding: .15em;
        }
      `}</style>
    </div>
  )
}

WashFastPassCallout.propTypes = {}

export default WashFastPassCallout
