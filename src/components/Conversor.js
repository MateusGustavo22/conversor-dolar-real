import "./Conversor.css"
import React, { useState } from 'react';
import {useRef} from 'react';
import brl from "./imagens/brl.svg"
import usa from "./imagens/usa.svg"
import axios from 'axios';
  
function Conversor() {
  
  const [valor1, setValor1] = useState("0")
  const [valor2, setValor2] = useState("0")
  
  function atualizarData() {
    const data = new Date()
    const dia = ("00"+(data.getDate()+1)).slice(-2)
    const mes = ("00"+(data.getMonth()+1)).slice(-2)
    const ano = data.getFullYear()
    const dataFormatada = dia+"/"+mes+"/"+ano
    
    return dataFormatada
  }
  
  const dataAtual = atualizarData()
  
  const [data, setData] = useState(dataAtual)
 
  var dolar = 0
  
  async function pegarCotacao() {
    let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL"
    const response = await axios.get(url)
    const precoy = response.data.USDBRL.bid
    const precoFloat = parseFloat(precoy)
    dolar = precoFloat.toFixed(2)
    
    return precoFloat.toFixed(2)
  }
  
  pegarCotacao()
  
  function atualizarInput() {
    setValor2((valor1*dolar).toFixed(2))
  }
  
  return ( 
    <div className="conversor">
      <h1>Conversor de dólar</h1>
      <div className="input_area">
        <div className="input_1">
          <div className="band_icon">
            <img src={usa} alt="bandeira"/>
          </div>
          <div className="input_campo">
            <input id="dolar" type="number" value={valor1} onChange={e => setValor1(e.target.value)} />
          </div>
        </div>
        <div className="input_2">
          <div className="band_icon">
            <img src={brl} alt="bandeira"/>
          </div>
          <div className="input_campo">
            <input id="real" type="number" value={valor2} onChange={e => setValor2(e.target.value)} />
          </div>
        </div>
        <button onClick={atualizarInput}>Converter</button>
      </div>
      <span id="data">{data}</span>
    </div>
  )
  
}

export default Conversor