import "./App.css";
import pokeHTML from "./Pokemon-Shroomish-RW.gba.log.htm";
import React, { useState, useEffect } from "react";

function App() {
  // const pokeString = pokeHTML
  // const setFileToLocalStorage = (file) => {
  //   localStorage.setItem("pokeHTML", file);
  // };

  const noChangesMade = "No changes made to this section...";

  const [HTMLasString, setHTMLasString] = useState();
  const [allSectionH2s, setAllSectionH2s] = useState([]);
  const [patchesApplied, setPatchesApplied] = useState(noChangesMade);
  const [randomizedEvolutions, setRandomizedEvolutions] =
    useState(noChangesMade);
  const [evolutionPaths, setEvolutionPaths] = useState(noChangesMade);
  const [pokemonStats, setPokemonStats] = useState(noChangesMade);
  const [impossibleEvos, setImpossibleEvos] = useState(noChangesMade);
  const [starters, setStarters] = useState(noChangesMade);
  const [moveData, setMoveData] = useState(noChangesMade);
  const [pokemonMoves, setPokemonMoves] = useState(noChangesMade);
  const [trainerPokemon, setTrainerPokemon] = useState(noChangesMade);
  const [staticPokemon, setStaticPokemon] = useState(noChangesMade);
  const [wildPokemon, setWildPokemon] = useState(noChangesMade);
  const [tmMoves, setTmMoves] = useState(noChangesMade);
  const [moveTutorMoves, setMoveTutorMoves] = useState(noChangesMade);
  const [inGameTrades, setInGameTrades] = useState(noChangesMade);

  function readSingleFile(event) {
    // Retrieve the first (and only!) File from the FileList object
    let pokefile = event.target.files[0];

    if (pokefile) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var contents = e.target.result;

        // Take out comments from HTML contents
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

        // Matches the full Evolution Paths Section then grabs it
        const epRegex =
          /<h2 id="ep">New Evolution Paths<\/h2>[^]*<h2 id="ps">/g;
        let evolutionPathsSection = flatHTML.match(epRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const psRemoveTagRegex = /<h2 id="ps">/;
        let trimmedEPSection = evolutionPathsSection[0].replace(
          psRemoveTagRegex,
          ""
        );
        setEvolutionPaths(trimmedEPSection);

        // Matches the full POkemon Stats Section then grabs it
        const psRegex =
          /<h2 id="ps">Pokemon Base Stats & Types<\/h2>[^]*<h2 id="rte">/g;
        let pokemonStatsSection = flatHTML.match(psRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const rteRemoveTagRegex = /<h2 id="rte">/;
        let trimmedPSSection = pokemonStatsSection[0].replace(
          rteRemoveTagRegex,
          ""
        );
        setPokemonStats(trimmedPSSection);

        // Matches the full POkemon Stats Section then grabs it
        const rteRegex =
          /<h2 id="rte">Removing Trade Evolutions<\/h2>[^]*<h2 id="rs">/g;
        let impossibleEvosSection = flatHTML.match(rteRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const rsRemoveTagRegex = /<h2 id="rs">/;
        let trimmedRTESection = impossibleEvosSection[0].replace(
          rsRemoveTagRegex,
          ""
        );
        setImpossibleEvos(trimmedRTESection);

        // Matches the full Pokemon Stats Section then grabs it
        const rsRegex = /<h2 id="rs">Random Starters<\/h2>[^]*<h2 id="md">/g;
        let randomStartersSection = flatHTML.match(rsRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const mdRemoveTagRegex = /<h2 id="md">/;
        let trimmedRSSection = randomStartersSection[0].replace(
          mdRemoveTagRegex,
          ""
        );
        setStarters(trimmedRSSection);

        // Matches the full Move Data Section then grabs it
        const mdRegex = /<h2 id="md">Move Data<\/h2>[^]*<h2 id="pm">/g;
        let moveDataSection = flatHTML.match(mdRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const pmRemoveTagRegex = /<h2 id="pm">/;
        let trimmedMDSection = moveDataSection[0].replace(pmRemoveTagRegex, "");
        setMoveData(trimmedMDSection);

        // Matches the full Pokemon Movesets Section then grabs it
        const pmRegex = /<h2 id="pm">Pokemon Movesets<\/h2>[^]*<h2 id="tp">/g;
        let pokemonMovesetsSection = flatHTML.match(pmRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const tpRemoveTagRegex = /<h2 id="tp">/;
        let trimmedPMSection = pokemonMovesetsSection[0].replace(
          tpRemoveTagRegex,
          ""
        );
        setPokemonMoves(trimmedPMSection);

        // Matches the full Trainers Pokemon Section then grabs it
        const tpRegex = /<h2 id="tp">Trainers Pokemon<\/h2>[^]*<h2 id="sp">/g;
        let trainersPokemonSection = flatHTML.match(tpRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const spRemoveTagRegex = /<h2 id="sp">/;
        let trimmedTPSection = trainersPokemonSection[0].replace(
          spRemoveTagRegex,
          ""
        );
        setTrainerPokemon(trimmedTPSection);

        // Matches the full Static Pokemon Section then grabs it
        const spRegex = /<h2 id="sp">Static Pokemon<\/h2>[^]*<h2 id="wp">/g;
        let staticPokemonSection = flatHTML.match(spRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const wpRemoveTagRegex = /<h2 id="wp">/;
        let trimmedSPSection = staticPokemonSection[0].replace(
          wpRemoveTagRegex,
          ""
        );
        setStaticPokemon(trimmedSPSection);

        // Matches the full Wild Pokemon Section then grabs it
        const wpRegex = /<h2 id="wp">Wild Pokemon<\/h2>[^]*<h2 id="tm">/g;
        let wildPokemonSection = flatHTML.match(wpRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const tmRemoveTagRegex = /<h2 id="tm">/;
        let trimmedWPSection = wildPokemonSection[0].replace(
          tmRemoveTagRegex,
          ""
        );
        setWildPokemon(trimmedWPSection);

        // Matches the full TM Moves Section then grabs it
        const tmRegex = /<h2 id="tm">TM Moves<\/h2>[^]*<h2 id="mt">/g;
        let tmMovesSection = flatHTML.match(tmRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const mtRemoveTagRegex = /<h2 id="mt">/;
        let trimmedTMSection = tmMovesSection[0].replace(mtRemoveTagRegex, "");
        setTmMoves(trimmedTMSection);

        // Matches the full Move Tutor Moves Section then grabs it
        const mtRegex = /<h2 id="mt">Move Tutor Moves<\/h2>[^]*<h2 id="igt">/g;
        let moveTutorSection = flatHTML.match(mtRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const igtRemoveTagRegex = /<h2 id="igt">/;
        let trimmedMTSection = moveTutorSection[0].replace(
          igtRemoveTagRegex,
          ""
        );
        setMoveTutorMoves(trimmedMTSection);

        // Matches the full Move Tutor Moves Section then grabs it
        const igtRegex = /<h2 id="igt">In-Game Trades<\/h2>[^]*<hr>/g;
        let inGameTradesSection = flatHTML.match(igtRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const hrRemoveTagRegex = /<hr>/;
        let trimmedIGTSection = inGameTradesSection[0].replace(
          hrRemoveTagRegex,
          ""
        );
        setInGameTrades(trimmedIGTSection);
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
    let reDiv = document.getElementById("randomized-evolutions");
    reDiv.innerHTML = randomizedEvolutions;
    // Gets Div for Evolution Paths and inserts the HTML from state
    let epDiv = document.getElementById("new-evolution-paths");
    epDiv.innerHTML = evolutionPaths;
    // Gets Div for Evolution Paths and inserts the HTML from state
    let psDiv = document.getElementById("pokemon-stats");
    psDiv.innerHTML = pokemonStats;
    // Gets Div for Evolution Paths and inserts the HTML from state
    let rteDiv = document.getElementById("removing-trade-evolutions");
    rteDiv.innerHTML = impossibleEvos;
    // Gets Div for Starters and inserts the HTML from state
    let rsDiv = document.getElementById("random-starters");
    rsDiv.innerHTML = starters;
    // Gets Div for Move Data and inserts the HTML from state
    let mdDiv = document.getElementById("move-data");
    mdDiv.innerHTML = moveData;
    // Gets Div for Pokemon Movesets and inserts the HTML from state
    let pmDiv = document.getElementById("pokemon-moves");
    pmDiv.innerHTML = pokemonMoves;
    // Gets Div for Trainers Pokemon and inserts the HTML from state
    let tpDiv = document.getElementById("trainers-pokemon");
    tpDiv.innerHTML = trainerPokemon;
    // Gets Div for Static Pokemon and inserts the HTML from state
    let spDiv = document.getElementById("static-pokemon");
    spDiv.innerHTML = staticPokemon;
    // Gets Div for Wild Pokemon and inserts the HTML from state
    let wpDiv = document.getElementById("wild-pokemon");
    wpDiv.innerHTML = wildPokemon;
    // Gets Div for TM Moves and inserts the HTML from state
    let tmDiv = document.getElementById("tm-moves");
    tmDiv.innerHTML = tmMoves;
    // Gets Div for TM Moves and inserts the HTML from state
    let mtDiv = document.getElementById("move-tutor-moves");
    mtDiv.innerHTML = moveTutorMoves;
    // Gets Div for TM Moves and inserts the HTML from state
    let igtDiv = document.getElementById("move-tutor-moves");
    igtDiv.innerHTML = inGameTrades;
    allSectionH2s.forEach((sectionH2) => {
      // console.log(sectionH2);
      if (sectionH2 === '<h2 id="pa">Patches Applied</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="re">Randomized Evolutions</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="ep">New Evolution Paths</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="ps">Pokemon Base Stats & Types</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="rte">Removing Trade Evolutions</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="rs">Random Starters</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="md">Move Data</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="pm">Pokemon Movesets</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="tp">Trainers Pokemon</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="sp">Static Pokemon</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="wp">Wild Pokemon</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="tm">TM Moves</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="mt">Move Tutor Moves</h2>') {
        console.log("this was breaking it");
      }
      if (sectionH2 === '<h2 id="igt">In-Game Trades</h2>') {
        console.log("this was breaking it");
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
      {/* <iframe id="pokeHTML" title="pokemon log html" src={pokeHTML}></iframe> */}
      <button onClick={showAllSections}>Show All Sections</button>
      <div id="patches-applied"></div>
      <hr />
      <div id="randomized-evolutions"></div>
      <hr />
      <div id="new-evolution-paths"></div>
      <hr />
      <div id="pokemon-stats"></div>
      <hr />
      <div id="removing-trade-evolutions"></div>
      <hr />
      <div id="random-starters"></div>
      <hr />
      <div id="move-data"></div>
      <hr />
      <div id="pokemon-moves"></div>
      <hr />
      <div id="trainers-pokemon"></div>
      <hr />
      <div id="static-pokemon"></div>
      <hr />
      <div id="wild-pokemon"></div>
      <hr />
      <div id="tm-moves"></div>
      <hr />
      <div id="move-tutor-moves"></div>
      <hr />
      <div id="in-game-trades"></div>
    </div>
  );
}

export default App;
