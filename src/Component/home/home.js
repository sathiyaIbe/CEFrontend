import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css'
const Home = () => {
  const [result, setResult] = useState(0)
  const [listCurrencies, setListCurrencie] = useState(null)
  const [fromCurrencies, setFromCurrencies] = useState('')
  const [toCurrencies, setToCurrencies] = useState(null)
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState(0)
  const [showToList, setShowToList] = useState(false)
  const [showFromList, setShowFromList] = useState(false)
  const [fromFull, setFromFull] = useState('')
  const [toFull, setToFull] = useState('')
  const [showResult, setShowResult] = useState(false)
  const host = 'api.frankfurter.app';
  useEffect(() => {
    fetch(`https://${host}/currencies`)
      .then(resp => resp.json())
      .then((data) => {
        setListCurrencie(Object.entries(data))
        setShow(true)
      })
  }, [])
  const handlingConverter = async (e) => {
    e.preventDefault()
    const data = {
      amount,
      fromCurrencies,
      toCurrencies
    }
    const value =
      await axios.get(`http://localhost:9000/exchange/${amount},${fromCurrencies},${toCurrencies}`)
    console.log(value.data.amount)
    setResult((value.data.rates[toCurrencies]))
    setShowResult(true)
  }
  function changeTo(data) {
    setShowToList(!showToList)
    setToCurrencies(data[0])
    setToFull(data[1])
    setShowResult(false)
  }
  function changeFrom(data) {
    setShowFromList(false)
    setFromCurrencies(data[0])
    setFromFull(data[1])
    setShowResult(false)
  }
  function setAmountHandle(e) {
    setAmount(e)
    setShowResult(false)
  }
  return (
    <div className='main-conatainer'>
      <section className='sec-bg-img '>
        <div className="container">
          <div className="row pt-3">
            <div className="col-md-12 bg-container bg-white rounded ">
              {show &&
                <form method='post' className='px-3 py-5 rounded  position-relative  search-container' onSubmit={handlingConverter}>
                  <h3 className='text-center'>Currency Exchange</h3>
                  <div className="row offset-2  ">
                    <div className="col-md-3 position-relative ">
                      <label className='fs-6 fw-bold'>Amount</label>
                      <input className='form-control' min={"1"} type='Number' value={amount} onChange={(e) => setAmountHandle(e.target.value)} />
                    </div>
                    <div className="col-md-3 position-relative ">
                      <label className='fs-6 fw-bold'>From</label>
                      <div   >
                        <button type='button' className='form-select ' style={{ height: "40px" }} value={fromCurrencies} onClick={() => setShowFromList(true)} >{fromCurrencies}</button>
                        {showFromList &&
                          <div className='card py-2  position-absolute z-3' style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            <ul>
                              {listCurrencies.map((data, index) => {
                                return (
                                  <li type='button' className='px-2 py-1 select' onClick={() => changeFrom(data)} value={data}  >{data[0]} - {data[1]}</li>
                                )
                              })
                              }
                            </ul>
                          </div>
                        }
                      </div>
                    </div>
                    <div className="col-md-3 position-relative ">
                      <label className='fs-6 fw-bold'>To</label>
                      <div id={listCurrencies[1]}  >
                        <button type='button' className='form-select ' style={{ height: "40px" }} value={toCurrencies} onClick={() => setShowToList(true)} >{toCurrencies}</button>
                        {showToList &&
                          <div className='card py-2  position-absolute z-3' style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            <ul className='list-unstyled' style={{ maxHeight: '300px' }}>
                              {listCurrencies.map((data, index) => {
                                return (
                                  <li type='button' className='px-2 py-1 select ' value={data[0]} onClick={() => changeTo(data)}>{data[0]} - {data[1]}</li>
                                )
                              })
                              }
                            </ul>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className='d-flex flex-column align-items-center mt-2'>
                    <button type='submit' className='btn btn-primary ' style={{ width: "150px" }}>Convert</button>
                    {showResult &&
                      <div>
                        <p>{amount} {fromFull}s = <span className=' fs-4'>{result.toFixed(2)} {toFull}s </span> </p>
                        <p>1 {fromFull} = {(result / amount).toFixed(4)} {toFull}</p>
                        <p>1 {toFull} = {((amount / result).toFixed(4))} {fromFull}</p>
                      </div>
                    }
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home