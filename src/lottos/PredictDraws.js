import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'
import '../App.css'
import classNames from 'classnames'



const PredictDraws = (props) => {

  const { lottoData, columns, numberRange } = props

  const [numbers, setNumbers] = useState(lottoData?.numbers.sort((a, b) => a.value - b.value))
  const [predicts, setPredicts] = useState([])



  useEffect(() => {
    
  }, [predicts])

  const getPredicts = (columns, numberRange) => {

    var pred = []

    // take 1 from last hits
    let lastHits = getLastHitNumbers()
    var indx = Math.random() * (lastHits.length)
    pred.push(lastHits[parseInt(indx)])

    // select 3 groups based on totalHits
    var flip_coin = Math.random() * 2


    var arr = flip_coin >= 1 ? getTotalHitsNumbers() : getDistanceNumbers()
    let low = arr[0]
    let middle = arr[1]
    let high = arr[2]


    // take 1 low
    indx = Math.random() * low.length
    pred.push(low[parseInt(indx)].value)


    // take 2 middle
    indx = Math.random() * middle.length
    pred.push(middle[parseInt(indx)].value)

    indx = Math.random() * middle.length
    pred.push(middle[parseInt(indx)].value)

    if (flip_coin < 1) {
      // add two more
      indx = Math.random() * middle.length
      pred.push(middle[parseInt(indx)].value)
      indx = Math.random() * middle.length
      pred.push(middle[parseInt(indx)].value)
    }

    pred = [...new Set(pred)]
    if (pred.length < 4) {
      indx = Math.random() * middle.length
      pred.push(middle[parseInt(indx)].value)
    }

    // take 3 high
    indx = Math.random() * high.length
    pred.push(high[parseInt(indx)].value)
    if (flip_coin >= 1) {
      indx = Math.random() * high.length
      pred.push(high[parseInt(indx)].value)

      indx = Math.random() * high.length
      pred.push(high[parseInt(indx)].value)
    }

    pred = [...new Set(pred)]
    while (pred.length < columns) {
      indx = Math.random() * high.length
      pred.push(high[parseInt(indx)].value)
      pred = [...new Set(pred)]
    }


    pred.sort((a, b) => a - b)

    console.log(pred)
    return pred

  }

  const getLastHitNumbers = () => {
    var arr = []
    for (var i = 0; i < numbers.length; i++) {
      if (numbers[i].isHit === true)
        arr.push(numbers[i].value)
    }
    return arr.sort((a, b) => a - b)
  }

  const getTotalHitsNumbers = () => {

    var tmp = numbers.sort((a, b) => a.totalHits > b.totalHits ? 1 : -1)
    var low = []
    var middle = []
    var high = []

    var oneThird = parseInt(tmp.length / 3 + 1)
    var twoThird = parseInt((tmp.length * 2) / 3 + 1)

    for (var i = 0; i < tmp.length; i++) {
      if (i < oneThird) {
        low.push(tmp[i])
      }
      else if (i < twoThird) {
        middle.push(tmp[i])
      }
      else {
        high.push(tmp[i])
      }
    }

    var arr = []
    arr.push(low)
    arr.push(middle)
    arr.push(high)

    return arr
  }


  const getDistanceNumbers = () => {

    var tmp = numbers.sort((a, b) => a.distance > b.distance ? 1 : -1)
    var low = []
    var middle = []
    var high = []

    var oneThird = parseInt(tmp.length / 3 + 1)
    var twoThird = parseInt((tmp.length * 2) / 3 + 1)

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].distance == 0) continue

      if (i < oneThird) {
        low.push(tmp[i])
      }
      else if (i < twoThird) {
        middle.push(tmp[i])
      }
      else {
        high.push(tmp[i])
      }
    }

    var arr = []
    arr.push(low)
    arr.push(middle)
    arr.push(high)

    return arr
  }



  const getPredicts_org = (columns, numberRange) => {

    var min = numbers[0].value
    var max = numbers[numberRange - 1].value

    var predicts = []
    while (predicts.length < columns) {
      predicts.push(parseInt((min + (Math.random() * (max - min)))))
      predicts = [...new Set(predicts)]
    }
    predicts.sort((a, b) => a - b)


    let arr = getTotalHitsNumbers()
    console.log(arr)
    return predicts

  }



  const getHeader = () => {
    return (
      <thead className="table-danger text-center">
        <tr>
          {Array.from(Array(10).keys()).map((no) =>
            (<th key={no} className='text-warning bg-success'>{no + 1}</th>))}
        </tr>
      </thead>
    )
  }

  const getRow = (start, end) => {

    return (
      <tr>
        {numbers
          .map(no => no.value > start && no.value <= end ?
            (<td className={classNames('bg-color', { 'bg-color8': predicts.indexOf(no.value) > -1 }, { 'bg-greenyellow': predicts.indexOf(no.value) < 0 })} key={no.value}>
              <span className={classNames('fs-5 font-color', { 'text-danger': predicts.indexOf(no.value) > -1 }, { 'text-success': predicts.indexOf(no.value) < 0 })}>{no.value}   </span>
              <span className='text-primary fst-italic'>({no.distance})</span>
              <span className='my-color-2 fst-italic'>({no.totalHits})</span></td>)
            : '')}
      </tr>
    )
  }



  return (
    <div>
      {numbers &&
        <Table responsive className="table-primary mb-3" size="lg" >
          {getHeader()}

          <tbody className='fw-bold' >

            {getRow(0, 10)}
            {getRow(10, 20)}
            {getRow(20, 30)}
            {getRow(30, 40)}
            {getRow(40, 50)}
          </tbody>

          {getHeader()}
        </Table>}
      <div>
        <Table>
          <thead className="table-danger text-center">
            <tr>
              {Array.from(Array(columns).keys()).map((no) =>
                (<th key={no} className='text-warning bg-success'>{no + 1}</th>))}
            </tr>
          </thead>
          <tr>
            {predicts.map(p => (<td className='bg-color1 text-center text-danger fs-4 fw-bold px-2' key={p}>{p}</td>))}
          </tr>

        </Table>
        <button
          type="button"
          onClick={() => setPredicts(getPredicts(columns, numberRange))}
          className="btn btn-primary fw-bold float-end"
        >Predict Next Draw</button>
      </div>
    </div>
  )
}


export default PredictDraws