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
    allSectionH2s.forEach((sectionH2) => {
      if (sectionH2 === '<h2 id="pa">Patches Applied</h2>') {
        setPatchesApplied(sectionH2);
      }
      if (sectionH2 === '<h2 id="re">Randomized Evolutions</h2>') {
        setRandomizedEvolutions(sectionH2);
      }
      if (sectionH2 === '<h2 id="ep">New Evolution Paths</h2>') {
        setEvolutionPaths(sectionH2);
      }
      if (sectionH2 === '<h2 id="ps">Pokemon Base Stats & Types</h2>') {
        setPokemonStats(sectionH2);
      }
      if (sectionH2 === '<h2 id="rte">Removing Trade Evolutions</h2>') {
        setImpossibleEvos(sectionH2);
      }
      if (sectionH2 === '<h2 id="rs">Random Starters</h2>') {
        setStarters(sectionH2);
      }
      if (sectionH2 === '<h2 id="md">Move Data</h2>') {
        setMoveData(sectionH2);
      }
      if (sectionH2 === '<h2 id="pm">Pokemon Movesets</h2>') {
        setPokemonMoves(sectionH2);
      }
      if (sectionH2 === '<h2 id="tp">Trainers Pokemon</h2>') {
        setTrainerPokemon(sectionH2);
      }
      if (sectionH2 === '<h2 id="sp">Static Pokemon</h2>') {
        setStaticPokemon(sectionH2);
      }
      if (sectionH2 === '<h2 id="wp">Wild Pokemon</h2>') {
        setWildPokemon(sectionH2);
      }
      if (sectionH2 === '<h2 id="tm">TM Moves</h2>') {
        setTmMoves(sectionH2);
      }
      if (sectionH2 === '<h2 id="mt">Move Tutor Moves</h2>') {
        setMoveTutorMoves(sectionH2);
      }
      if (sectionH2 === '<h2 id="igt">In-Game Trades</h2>') {
        setInGameTrades(sectionH2);
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
      <h2>patchesApplied</h2>
      <p>{patchesApplied}</p>
      <hr />
      <h2>randomizedEvolutions</h2>
      <p>{randomizedEvolutions}</p>
      <hr />
      <h2>evolutionPaths</h2>
      <p>{evolutionPaths}</p>
      <hr />
      <h2>pokemonStats</h2>
      <p>{pokemonStats}</p>
      <hr />
      <h2>impossibleEvos</h2>
      <p>{impossibleEvos}</p>
      <hr />
      <h2>starters</h2>
      <p>{starters}</p>
      <hr />
      <h2>moveData</h2>
      <p>{moveData}</p>
      <hr />
      <h2>pokemonMoves</h2>
      <p>{pokemonMoves}</p>
      <hr />
      <h2>trainerPokemon</h2>
      <p>{trainerPokemon}</p>
      <hr />
      <h2>staticPokemon</h2>
      <p>{staticPokemon}</p>
      <hr />
      <h2>wildPokemon</h2>
      <p>{wildPokemon}</p>
      <hr />
      <h2>tmMoves</h2>
      <p>{tmMoves}</p>
      <hr />
      <h2>moveTutorMoves</h2>
      <p>{moveTutorMoves}</p>
      <hr />
      <h2>inGameTrades</h2>
      <p>{inGameTrades}</p>
    </div>
  );
}

export default App;
