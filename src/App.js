import React from 'react'
import './App.css'
// import { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo   } from "react"
import { useState, useEffect } from "react"
import useFetch from "./pages/useFetch"
import styled from 'styled-components'
// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AllNumbersStatistics from './lottos/AllNumbersStatistics'
import NumberDrowsInDistance from './lottos/NumberDrowsInDistance'
import LottoDraws from './lottos/LottoDraws'
import LottoTryLogo from './images/LottoTryLogo.png'


const Styles = styled.div`
  padding: 1rem;

  table {
    alignment:center;
/*     border-spacing: 2px;
    border: 1px solid black;
 */   
    align-items: center;
    border:4px outset grey; pddding:2px;

    tr {
      :last-child {
        td {
          //border-bottom: 0;
        }
      }
    }

    th,
    td {
     
      margin: 2;
      padding: 5px;  //0.3rem;
      /*
       border-bottom: 1px solid black;
      border-right: 1px solid black;
      border: 1px double;
      cellpadding:2px;
      cellspacing:2px;*/ 

      :last-child {
        border-right: 1px;
      }
      border:3px inset grey; margin:1px;
      overflow-wrap: break-word;
      text-align:center;
    }
  }
`


function App() {



  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const [drawNumber, setDrawNumber] = useState('')
  const [lottoName, setLottoName] = useState(1)
  const [sortType, setSortType] = useState('number');
  const [lottoColumns, setLottoColumns] = useState(7);



  let url = 'http://api.lottotry.com/api/lottotypes?lottoName='   + lottoName 

  //let url = 'http://localhost:9090/api/lottotypes?lottoName='   + lottoName 


  const [{data, json}] = useFetch(url, page, pageSize, drawNumber)

  var pageLimit = 10

  

  const getPaginationGroup = ()  => {
    pageLimit = totalPages <= pageLimit ? totalPages : pageLimit
    let start = Math.floor((page - 1) / pageLimit) * pageLimit
    
    var remainingPages = totalPages - page
    
    if (remainingPages < 0 )
    {
      setPage(totalPages)
      pageLimit = totalPages
      remainingPages = 0
    }
    if (remainingPages === 0)
    {
      start = totalPages - 1
    }
    
    var arrayLength = remainingPages > 0 ? pageLimit : remainingPages + 1
    let array = new Array(arrayLength).fill().map((_, idx) => start + idx + 1)
    return array
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setPage(pageNumber)
  }

  function goToNextPage() {
    setPage((page) => page + 1)
    
  }

  function goToPreviousPage() {
    setPage((page) => page - 1)
  }

  
  useEffect(() => {
    

    var o = JSON.parse(json)
    
    setTotalPages(o.totalPages) 

  }, [json, url, sortType, data, lottoColumns, lottoName, drawNumber])

  const selectLotto = (value) => {
    console.log(value)
    setLottoName(value)
    setDrawNumber('')

    switch(value) {
      case "BC49": return setLottoColumns(7)
      
      case "Lotto649": return setLottoColumns(7)

      case "LottoMax": return setLottoColumns(8)

      case "DailyGrand": return setLottoColumns(5)
      case "DailyGrand_GrandNumber": return setLottoColumns(1)

      default:  return setLottoColumns(7) 

    }

  }



  return (
    <Styles>     
      {
        <div className="container-fluid">
            <nav className="navbar navbar-expand-xl bg-success sticky noqII">
              <ul className="navbar-nav">
              <li className="nav-item">
                  <a className="navbar-brand" href="/images">
                    <img src={LottoTryLogo} className="img-fluid" alt="Lottotry Logo" width="50%" />
                  </a>
                </li>
                <li className="nav-item">              
                  <div className="mt-2 margin-left margin-right fw-bold">
                    <select id="rpp" className="dropdown btn btn-success  dropdown-toggle margin-right fw-bold"  
                        onChange={(e) => selectLotto(e.target.value)}>    
                        {['BC49', 'Lotto649', 'LottoMax', 'DailyGrand', 'DailyGrand_GrandNumber'].map(lotto => (
                          <option key={lotto} value={lotto}>{lotto}</option>
                        ))}                                 
                    </select>
                  </div>
                </li>
                <li className="nav-item">   
                  <div className="mt-2 margin-left margin-right fw-bold">     
                    <select id="rpp" className="dropdown btn btn-success  dropdown-toggle  fw-bold"  
                      onChange={(e) => setSortType(e.target.value)}>         
                      {['number', 'distance', 'totalHits', 'lottoDraws', 'numberDraws'].map(sortType => (
                        <option key={sortType} value={sortType}> Sort by {sortType}</option>
                      ))}              
                    </select>
                  </div>
                </li>
                {data !== null ? 
                (<li className="nav-item">   
                  <div className="mt-2 margin-left margin-right fw-bold">     
                    <select id="rpp" className="dropdown btn btn-success  dropdown-toggle fw-bold"  
                      onChange={(e) => setDrawNumber(e.target.value)}>         
                      {data.map(draw => (
                        <option key={draw.drawNumber} value={draw.drawNumber}> Draw - {draw.drawNumber}</option>
                      ))}              
                    </select>
                  </div>
                </li>) : '' }

              </ul>
            </nav>

            {data !== null ? (
            <>
            {
              (() => {
                switch (sortType) {
                case  'lottoDraws':
                  return (
                    <LottoDraws lottoData={data} columns={lottoColumns} />
                  )                 
                case  'numberDraws':
                  return (
                  
                    <NumberDrowsInDistance lottoData={data} rows={pageSize}/>
                  )
                  default:
                    return (
                      <AllNumbersStatistics lottoData={data} sortType={sortType}  drawNumber={drawNumber}  />
                    )
                }
              }) ()}
              
          
              <div className="card bg-success text-warning">
                <div className="row">
                  <div className="col-lg-3 mt-1 margin-left fw-bold">
                    <select id="rpp" className="dropdown btn btn-success dropdown-toggle ps-4 fw-bold"  
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value)}>
                      {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}> {pageSize}</option>
                      ))}
                    </select>
                    <span className='ps-3'>draws per page</span>
                  </div>
                  <div className="col-lg-8">
                    <button 
                      type="button"
                      onClick={goToPreviousPage}
                      className={`prev btn btn-success fw-bold ${page === 1 ? 'disabled' : ''}`}
                    >Prev</button>

                    {getPaginationGroup().map((item, index) => (
                        <button 
                        type="button"
                        key={index}
                        onClick={changePage}
                        className={`paginationItem btn btn-secondary  fw-bold ${page === item ? 'active' : null}`}
                        >
                        <span>{item}</span>
                        </button>
                    ))}

                    <button 
                      type="button"
                      onClick={goToNextPage}
                      className={`next btn btn-success  fw-bold ${page === totalPages ? 'disabled' : ''}`}
                      >Next</button>
                  </div>
                </div>
              </div>
            </>              
              ) : (
                <h1>No data to display</h1>
              )}

        </div>   
      }                         
  </Styles>
  )
}

export default App
