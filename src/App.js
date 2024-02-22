
import { useEffect, useState } from "react";
import rawData from "./data.json";
import './App.css';
import PageContainer from "./components/PageContainer/PageContainer";
import Toggler from "./components/Toggler/Toggler";
import NumImp from "./components/NumImp";
import RybyList from "./components/RybyList/RybyList";
import RybyForm from "./components/RybyForm/RybyForm";
function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [listRyby, setListRyby] = useState(rawData.ryby);
  const [valid, setValid] = useState(false);

  const [sirka, setSirka] = useState(0)
  const [delka, setDelka] = useState(0)
  const [vyska, setVyska] = useState(0)
  const [objemAkvarka, setObjemAkvarka] = useState(0)
  const [objemAkvarkaDleRyb, setObjemAkvarkaDleRyb] = useState(0)
  const [newRyby, setNewRyby] = useState({
    id:
      listRyby.length > 0
        ? Math.max(...listRyby.map((ryby) => ryby.id)) + 1
        : 1,
    name: "",
    size: "malá",

  });
  const handleChoose = (source) => {
    switch (source) {
      case "ryby": {
        setActiveTab(1);
        break;
      }
      case "akvarko": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };
  const handleDelete = (idToDelete) => {
    setListRyby(listRyby.filter((ryba) => ryba.id !== idToDelete));
  };

  const handleAdd = () => {

    setListRyby((listRyby) => {
      return [...listRyby, newRyby];
    });
    const newRybyId = newRyby.id + 1;
    const updatedRyby = {
      id: newRybyId,
      name: "",
      size: "malá",

    };
    setNewRyby(updatedRyby);
    validateData(updatedRyby);

  };
  const validateData = (ryba) => {
    if (ryba.name.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };
  const handleChange = (event) => {

    const updatedRyby = { ...newRyby, [event.target.name]: event.target.value };
    validateData(updatedRyby);
    setNewRyby(updatedRyby);
  };
  const handelData = (data, source) => {
    switch (source) {
      case "num-sirka":
        setSirka(parseInt(data) || 0);
        break
      case "num-vyska":
        setVyska(parseInt(data) || 0);
        break
      case "num-delka":
        setDelka(parseInt(data) || 0);
        break
      default: break
    }
  }


  const vypocet = () => {
    let objemTemp = 0
    for (let i = 0; i < listRyby.length; i++) {
      if (listRyby[i].size === "malá") {
        objemTemp += 10
      }
      else {
        objemTemp += 20
      }
    }
    setObjemAkvarkaDleRyb(parseFloat(objemTemp) || 0)
    setObjemAkvarka(parseFloat((sirka / 10) * (vyska / 10) * (delka / 10)) || 0)
    if (objemAkvarkaDleRyb <= objemAkvarka) {
      console.log("OK")
      document.getElementById("btnSchvalit").disabled = false
      document.getElementById("btnSchvalit").style.backgroundColor = "green"
    }
    else {
      document.getElementById("btnSchvalit").style.backgroundColor = "red"
      document.getElementById("btnSchvalit").disabled = true
    }
  }
  useEffect(() => {
    if (activeTab === 2) { vypocet() }
  });



  return (
    <div className='container' ><PageContainer>
      <Toggler active={activeTab} onChoose={handleChoose} />
      {activeTab === 1 && (
        <>
          <RybyList data={listRyby} onDelete={handleDelete} />
          <RybyForm
            data={newRyby}
            onChange={handleChange}
            onAdd={handleAdd}
            validation={valid}
          />
        </>
      )}
      {activeTab === 2 && (
        <>
          <NumImp
            id="num-sirka"
            label="šířka akvárka (cm)"
            dataIn={sirka}
            handleData={handelData}
          ></NumImp>
          <NumImp
            id="num-delka"
            label="délka akvárka (cm)"
            dataIn={delka}
            handleData={handelData}
          ></NumImp>
          <NumImp
            id="num-vyska"
            label="výška akvárka (cm)"
            dataIn={vyska}
            handleData={handelData}
          ></NumImp>

          <p >Objem akvárka: {objemAkvarka} l </p>
          <p>Požadovaný objem akvárka dle ryb: {objemAkvarkaDleRyb} l </p>
          <button type="button" id="btnSchvalit"  >Schválit</button>
        </>
      )}
    </PageContainer></div>
  );
}

export default App;
