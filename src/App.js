import "./App.css";
import pokeHTML from "./Pokemon-Shroomish-RW.gba.log.htm";
import React, { useState, useEffect } from "react";

function App() {
  // const pokeString = pokeHTML
  // const setFileToLocalStorage = (file) => {
  //   localStorage.setItem("pokeHTML", file);
  // };

  const [HTMLasString, setHTMLasString] = useState("Currently empty");
  const [allSectionH2s, setAllSectionH2s] = useState([]);
  const [patchesApplied, setPatchesApplied] = useState("Currently empty");
  const [randomizedEvolutions, setRandomizedEvolutions] =
    useState("Currently empty");
  const [evolutionPaths, setEvolutionPaths] = useState("Currently empty");
  const [pokemonStats, setPokemonStats] = useState("Currently empty");
  const [impossibleEvos, setImpossibleEvos] = useState("Currently empty");
  const [starters, setStarters] = useState("Currently empty");
  const [moveData, setMoveData] = useState("Currently Empty");
  const [pokemonMoves, setPokemonMoves] = useState("Currently empty");
  const [trainerPokemon, setTrainerPokemon] = useState("Currently empty");
  const [staticPokemon, setStaticPokemon] = useState("Currently empty");
  const [wildPokemon, setWildPokemon] = useState("Currently empty");
  const [tmMoves, setTmMoves] = useState("Currently empty");
  const [moveTutorMoves, setMoveTutorMoves] = useState("Currently empty");
  const [inGameTrades, setInGameTrades] = useState("Currently empty");

  // useEffect(() => {
  //   setPatchesApplied("File Uploaded");
  // }, [HTMLasString]);

  function readSingleFile(event) {
    // Retrieve the first (and only!) File from the FileList object
    let pokefile = event.target.files[0];

    if (pokefile) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var contents = e.target.result;
        // alert(
        //   "Got the file." +
        //     "name: " +
        //     pokefile.name +
        //     ", " +
        //     "type: " +
        //     pokefile.type +
        //     ", " +
        //     "size: " +
        //     pokefile.size +
        //     "bytes, " +
        //     "contents:" +
        //     contents
        // );
        // console.log(e.target.result);
        let strippedOutComments = contents.replace(/<!--=+-->/gi, "");
        let strippedOutFirstSentence = strippedOutComments.replace(
          /This if statement could be pointless\./gi,
          ""
        );
        // console.log(strippedOutComments.replace(/> +</g, "><"));
        setHTMLasString(strippedOutFirstSentence);
        const h2regex = /<h2 id="[a-z]+">.+?<\/h2>/g;
        let allH2s = strippedOutFirstSentence.match(h2regex);
        setAllSectionH2s(allH2s);
        console.log("allh2s--->> ", allH2s);
      };
      reader.readAsText(pokefile);
      console.log("Read the file");
    } else {
      alert("Failed to load file");
    }
  }

  function showAllSections() {
    let currentH2;
    allSectionH2s.forEach((sectionH2) => {
      console.log(sectionH2);
      if (sectionH2 === '<h2 id="pa">Patches Applied</h2>') {
        currentH2 = document.getElementById("patches-applied");
        // setPatchesApplied(sectionH2);
      }
      if (sectionH2 === '<h2 id="re">Randomized Evolutions</h2>') {
        currentH2 = document.getElementById("randomized-evolutions");
      }
      if (sectionH2 === '<h2 id="ep">New Evolution Paths</h2>') {
        currentH2 = document.getElementById("new-evolution-paths");
      }
      if (sectionH2 === '<h2 id="ps">Pokemon Base Stats & Types</h2>') {
        currentH2 = document.getElementById("pokemon-stats");
      }
      if (sectionH2 === '<h2 id="rte">Removing Trade Evolutions</h2>') {
        currentH2 = document.getElementById("removing-trade-evolutions");
      }
      if (sectionH2 === '<h2 id="rs">Random Starters</h2>') {
        currentH2 = document.getElementById("random-starters");
      }
      if (sectionH2 === '<h2 id="md">Move Data</h2>') {
        currentH2 = document.getElementById("move-data");
      }
      if (sectionH2 === '<h2 id="pm">Pokemon Movesets</h2>') {
        currentH2 = document.getElementById("pokemon-moves");
      }
      if (sectionH2 === '<h2 id="tp">Trainers Pokemon</h2>') {
        currentH2 = document.getElementById("trainers-pokemon");
      }
      if (sectionH2 === '<h2 id="sp">Static Pokemon</h2>') {
        currentH2 = document.getElementById("static-pokemon");
      }
      if (sectionH2 === '<h2 id="wp">Wild Pokemon</h2>') {
        currentH2 = document.getElementById("wild-pokemon");
      }
      if (sectionH2 === '<h2 id="tm">TM Moves</h2>') {
        currentH2 = document.getElementById("tm-moves");
      }
      if (sectionH2 === '<h2 id="mt">Move Tutor Moves</h2>') {
        currentH2 = document.getElementById("move-tutor-moves");
      }
      if (sectionH2 === '<h2 id="igt">In-Game Trades</h2>') {
        currentH2 = document.getElementById("in-game-trades");
      }
      if (currentH2 !== null) {
        currentH2.innerHTML = sectionH2;
      }
    });
  }

  return (
    <div className="App">
      <input
        onChange={readSingleFile}
        id="file-picker"
        type="file"
        accept=".htm"
      />
      <iframe id="pokeHTML" title="pokemon log html" src={pokeHTML}></iframe>
      {/* <iframe id="pokeHTML-input" title="pokemon log html" src={pokeHTML}></iframe> */}
      {/* <h2>HTMLasString</h2>
      <p>{HTMLasString}</p>
      <hr /> */}
      <button onClick={showAllSections}>Show All Sections</button>
      <h2>Patches Applied</h2>
      {/* <p id="patches-applied">{patchesApplied}</p> */}
      <div id="patches-applied"></div>
      <hr />
      <h2>Randomized Evolutions</h2>
      <div id="randomized-evolutions"></div>
      <hr />
      <h2>New Evolution Paths</h2>
      <div id="new-evolution-paths"></div>
      <hr />
      <h2>Pokemon Base Stats & Types</h2>
      <div id="pokemon-stats"></div>
      <hr />
      <h2>Removing Trade Evolutions</h2>
      <div id="removing-trade-evolutions"></div>
      <hr />
      <h2>Random Starters</h2>
      <div id="random-starters"></div>
      <hr />
      <h2>Move Data</h2>
      <div id="move-data"></div>
      <hr />
      <h2>Pokemon Movesets</h2>
      <div id="pokemon-moves"></div>
      <hr />
      <h2>Trainers Pokemon</h2>
      <div id="trainers-pokemon"></div>
      <hr />
      <h2>Static Pokemon</h2>
      <div id="static-pokemon"></div>
      <hr />
      <h2>Wild Pokemon</h2>
      <div id="wild-pokemon"></div>
      <hr />
      <h2>TM Moves</h2>
      <div id="tm-moves"></div>
      <hr />
      <h2>Move Tutor Moves</h2>
      <div id="move-tutor-moves"></div>
      <hr />
      <h2>In-Game Trades</h2>
      <div id="in-game-trades"></div>
    </div>
  );
}

export default App;
