import './App.css'
// import { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo   } from "react"
import { useState, useEffect } from "react"
import useFetch from "./pages/useFetch"
import styled from 'styled-components'


import AllNumbersStatistics from './lottos/AllNumbersStatistics'
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
  const [totalPages, setTotalPages] = useState(10)
  const [pageSize, setPageSize] = useState(10)
  const [lottoName, setLottoName] = useState(1)

  let url = 'http://localhost:9090/api/lottonumbers?lottoname='   + lottoName

  const [{data, json}] = useFetch(url, page, pageSize)

  const pageLimit = 10

  const getPaginationGroup = ()  => {
    let start = Math.floor((page - 1) / pageLimit) * pageLimit
    let array = new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
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
    setTotalPages((totalPages) =>  totalPages = o.totalCount)

  }, [json, url])

  return (
    <Styles>     
      {
        <div className="container-fluid">
            {/* {console.log(data)} */}
            <nav className="navbar navbar-expand-xl bg-success mb-1">
              <ul className="navbar-nav">
              <li className="nav-item">
                  <a className="navbar-brand" href="/images">
                    <img src={LottoTryLogo} className="img-fluid" alt="Lottotry Logo" width="50%" />
                  </a>
                </li>
                <li className="nav-item">
               
                  {/* <span className='margin-right text-light'>Select Lotto </span> */}
                  <select id="rpp" className="dropdown btn btn-light  dropdown-toggle mt-2"  onChange={(e) => setLottoName(e.target.value)}>                       
                        <option className="dropdown-item" value="1">BC49</option>
                        <option value="2">Lotto649</option>
                        <option value="3">LottoMax</option>
                  </select>
                </li>
              </ul>
            </nav>

            {data !== null ? (
            <>
              {/* <BC49 lottoData={data}/>  */}
              <AllNumbersStatistics lottoData={data}/>

              <div className="card bg-success text-warning">
                <div className="row">
                  <div className="col-lg-4 mt-1">
                    <span className="ps-5 margin-right">Select</span>
                    <select id="rpp" className="dropdown btn btn-light dropdown-toggle ps-4"  onChange={(e) => setPageSize(e.target.value)}>
                      <option className="dropdown-item" value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                    <span className='ps-3'>records per page</span>
                  </div>
                  <div className="col-lg-8">
                    <button 
                      type="button"
                      onClick={goToPreviousPage}
                      className={`prev btn btn-primary ${page === 1 ? 'disabled' : ''}`}
                    >Prev</button>

                    {getPaginationGroup().map((item, index) => (
                        <button 
                        type="button"
                        key={index}
                        onClick={changePage}
                        className={`paginationItem btn btn-secondary ${page === item ? 'active' : null}`}
                        >
                        <span>{item}</span>
                        </button>
                    ))}

                    <button 
                      type="button"
                      onClick={goToNextPage}
                      className={`next btn btn-primary ${page === totalPages ? 'disabled' : ''}`}
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
