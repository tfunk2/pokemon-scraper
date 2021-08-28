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

  function readSingleFile(event) {
    // Retrieve the first (and only!) File from the FileList object
    let pokefile = event.target.files[0];

    if (pokefile) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var contents = e.target.result;
        // Take out comments from HTML
        let strippedOutComments = contents.replace(/<!--=+-->/gi, "");
        // Take out a weird sentence repeated throughout HTML
        let strippedOutFirstSentence = strippedOutComments.replace(
          /This if statement could be pointless\./gi,
          ""
        );
        // Sets the HTMLasString state
        setHTMLasString(strippedOutFirstSentence);
        // Matches the header h2 for each section
        const h2regex = /<h2 id="[a-z]+">.+?<\/h2>/g;
        // Grabs all matches then sets it to the state allH2s
        let allH2s = strippedOutFirstSentence.match(h2regex);
        setAllSectionH2s(allH2s);
        // Matches all white space characters necessary
        const strippedNewLinesAndReturns = /\n|\r|\t/g;
        // Removes all matches
        const flatHTML = strippedOutFirstSentence.replace(
          strippedNewLinesAndReturns,
          ""
        );
        // Matches the full Patches Applied Section then grabs it
        const paRegex = /<h2 id="pa">Patches Applied<\/h2>[^]*<h2 id="re">/g;
        let patchesAppliedSection = flatHTML.match(paRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const reRemoveTagRegex = /<h2 id="re">/;
        let trimmedPatchesAppliedSection = patchesAppliedSection[0].replace(
          reRemoveTagRegex,
          ""
        );
        setPatchesApplied(trimmedPatchesAppliedSection);
        // Matches the full Randomized Evolutions Section then grabs it
        const reRegex =
          /<h2 id="re">Randomized Evolutions<\/h2>[^]*<h2 id="ep">/g;
        let randomizedEvolutionsSection = flatHTML.match(reRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const epRemoveTagRegex = /<h2 id="ep">/;
        let trimmedRESection = randomizedEvolutionsSection[0].replace(
          epRemoveTagRegex,
          ""
        );
        setRandomizedEvolutions(trimmedRESection);
      };
      reader.readAsText(pokefile);
      console.log("Read the file");
    } else {
      alert("Failed to load file");
    }
  }

  function showAllSections() {
    let currentH2;
    // Gets Div for Patches Applied and inserts the HTML from state
    let paDiv = document.getElementById("patches-applied");
    paDiv.innerHTML = patchesApplied;
    // Gets Div for Randomized Evolutions and inserts the HTML from state
    let epDiv = document.getElementById("randomized-evolutions");
    epDiv.innerHTML = randomizedEvolutions;
    allSectionH2s.forEach((sectionH2) => {
      // console.log(sectionH2);
      if (sectionH2 === '<h2 id="pa">Patches Applied</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="re">Randomized Evolutions</h2>') {
        console.log("this was breaking it");
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
        if (currentH2) {
          currentH2.innerHTML = sectionH2;
        }
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
      {/* use this below to see the HTML code */}
      {/* <h2>HTMLasString</h2>
      <p>{HTMLasString}</p>
      <hr /> */}
      <button onClick={showAllSections}>Show All Sections</button>
      <div id="patches-applied"></div>
      <hr />
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
