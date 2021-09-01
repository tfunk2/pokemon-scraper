import "./App.css";
import pokeHTML from "./Pokemon-Shroomish-RW.gba.log.htm";
import React, { useState, useEffect } from "react";

function App() {
  // const pokeString = pokeHTML
  // const setFileToLocalStorage = (file) => {
  //   localStorage.setItem("pokeHTML", file);
  // };

  const noFileLoaded = "No log file has been uploaded yet...";

  const [fileName, setFileName] = useState("");
  const [HTMLasString, setHTMLasString] = useState("");
  const [patchesApplied, setPatchesApplied] = useState(noFileLoaded);
  const [randomizedEvolutions, setRandomizedEvolutions] =
    useState(noFileLoaded);
  const [evolutionPaths, setEvolutionPaths] = useState(noFileLoaded);
  const [pokemonStats, setPokemonStats] = useState(noFileLoaded);
  const [impossibleEvos, setImpossibleEvos] = useState(noFileLoaded);
  const [starters, setStarters] = useState(noFileLoaded);
  const [moveData, setMoveData] = useState(noFileLoaded);
  const [pokemonMoves, setPokemonMoves] = useState(noFileLoaded);
  const [trainerPokemon, setTrainerPokemon] = useState(noFileLoaded);
  const [staticPokemon, setStaticPokemon] = useState(noFileLoaded);
  const [wildPokemon, setWildPokemon] = useState(noFileLoaded);
  const [tmMoves, setTmMoves] = useState(noFileLoaded);
  const [moveTutorMoves, setMoveTutorMoves] = useState(noFileLoaded);
  const [inGameTrades, setInGameTrades] = useState(noFileLoaded);
  const [isPAVisible, setIsPAVisible] = useState(false);
  const [isREVisible, setIsREVisible] = useState(false);
  const [isEPVisible, setIsEPVisible] = useState(false);
  const [isPSVisible, setIsPSVisible] = useState(false);
  const [isRTEVisible, setIsRTEVisible] = useState(false);
  const [isRSVisible, setIsRSVisible] = useState(false);
  const [isMDVisible, setIsMDVisible] = useState(false);
  const [isPMVisible, setIsPMVisible] = useState(false);
  const [isTPVisible, setIsTPVisible] = useState(false);
  const [isSPVisible, setIsSPVisible] = useState(false);
  const [isWPVisible, setIsWPVisible] = useState(false);
  const [isTMVisible, setIsTMVisible] = useState(false);
  const [isMTVisible, setIsMTVisible] = useState(false);
  const [isIGTVisible, setIsIGTVisible] = useState(false);

  function readSingleFile(event) {
    // Retrieve the first (and only!) File from the FileList object
    let pokefile = event.target.files[0];
    console.log(pokefile);

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

        if (strippedOutFirstSentence) {
          setHTMLasString(strippedOutFirstSentence);
          setFileName(pokefile.name);
        }

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
        if (patchesAppliedSection) {
          let trimmedPatchesAppliedSection = patchesAppliedSection[0].replace(
            reRemoveTagRegex,
            ""
          );
          setPatchesApplied(trimmedPatchesAppliedSection);
        } else {
          setPatchesApplied(
            "<h2>Patches Applied</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Randomized Evolutions Section then grabs it
        const reRegex =
          /<h2 id="re">Randomized Evolutions<\/h2>[^]*<h2 id="ep">/g;
        let randomizedEvolutionsSection = flatHTML.match(reRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const epRemoveTagRegex = /<h2 id="ep">/;
        if (randomizedEvolutionsSection) {
          let trimmedRESection = randomizedEvolutionsSection[0].replace(
            epRemoveTagRegex,
            ""
          );
          setRandomizedEvolutions(trimmedRESection);
        } else {
          setRandomizedEvolutions(
            "<h2>Randomized Evolutions</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Evolution Paths Section then grabs it
        const epRegex =
          /<h2 id="ep">New Evolution Paths<\/h2>[^]*<h2 id="ps">/g;
        let evolutionPathsSection = flatHTML.match(epRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const psRemoveTagRegex = /<h2 id="ps">/;
        if (evolutionPathsSection) {
          let trimmedEPSection = evolutionPathsSection[0].replace(
            psRemoveTagRegex,
            ""
          );
          setEvolutionPaths(trimmedEPSection);
        } else {
          setEvolutionPaths(
            "<h2>Evolution Paths</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full POkemon Stats Section then grabs it
        const psRegex =
          /<h2 id="ps">Pokemon Base Stats & Types<\/h2>[^]*<h2 id="rte">/g;
        let pokemonStatsSection = flatHTML.match(psRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const rteRemoveTagRegex = /<h2 id="rte">/;
        if (pokemonStatsSection) {
          let trimmedPSSection = pokemonStatsSection[0].replace(
            rteRemoveTagRegex,
            ""
          );
          setPokemonStats(trimmedPSSection);
        } else {
          setPokemonStats(
            "<h2>POkemon Stats</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full POkemon Stats Section then grabs it
        const rteRegex =
          /<h2 id="rte">Removing Trade Evolutions<\/h2>[^]*<h2 id="rs">/g;
        let impossibleEvosSection = flatHTML.match(rteRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const rsRemoveTagRegex = /<h2 id="rs">/;
        if (impossibleEvosSection) {
          let trimmedRTESection = impossibleEvosSection[0].replace(
            rsRemoveTagRegex,
            ""
          );
          setImpossibleEvos(trimmedRTESection);
        } else {
          setImpossibleEvos(
            "<h2>POkemon Stats</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Pokemon Stats Section then grabs it
        const rsRegex = /<h2 id="rs">Random Starters<\/h2>[^]*<h2 id="md">/g;
        let randomStartersSection = flatHTML.match(rsRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const mdRemoveTagRegex = /<h2 id="md">/;
        if (randomStartersSection) {
          let trimmedRSSection = randomStartersSection[0].replace(
            mdRemoveTagRegex,
            ""
          );
          setStarters(trimmedRSSection);
        } else {
          setStarters(
            "<h2>Pokemon Stats</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Move Data Section then grabs it
        const mdRegex = /<h2 id="md">Move Data<\/h2>[^]*<h2 id="pm">/g;
        let moveDataSection = flatHTML.match(mdRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const pmRemoveTagRegex = /<h2 id="pm">/;
        if (moveDataSection) {
          let trimmedMDSection = moveDataSection[0].replace(
            pmRemoveTagRegex,
            ""
          );
          setMoveData(trimmedMDSection);
        } else {
          setMoveData(
            "<h2>Move Data</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Pokemon Movesets Section then grabs it
        const pmRegex = /<h2 id="pm">Pokemon Movesets<\/h2>[^]*<h2 id="tp">/g;
        let pokemonMovesetsSection = flatHTML.match(pmRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const tpRemoveTagRegex = /<h2 id="tp">/;
        if (pokemonMovesetsSection) {
          let trimmedPMSection = pokemonMovesetsSection[0].replace(
            tpRemoveTagRegex,
            ""
          );
          setPokemonMoves(trimmedPMSection);
        } else {
          setPokemonMoves(
            "<h2>Pokemon Movesets</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Trainers Pokemon Section then grabs it
        const tpRegex = /<h2 id="tp">Trainers Pokemon<\/h2>[^]*<h2 id="sp">/g;
        let trainersPokemonSection = flatHTML.match(tpRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const spRemoveTagRegex = /<h2 id="sp">/;
        if (trainersPokemonSection) {
          let trimmedTPSection = trainersPokemonSection[0].replace(
            spRemoveTagRegex,
            ""
          );
          setTrainerPokemon(trimmedTPSection);
        } else {
          setTrainerPokemon(
            "<h2>Trainers Pokemon</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Static Pokemon Section then grabs it
        const spRegex = /<h2 id="sp">Static Pokemon<\/h2>[^]*<h2 id="wp">/g;
        let staticPokemonSection = flatHTML.match(spRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const wpRemoveTagRegex = /<h2 id="wp">/;
        if (staticPokemonSection) {
          let trimmedSPSection = staticPokemonSection[0].replace(
            wpRemoveTagRegex,
            ""
          );
          setStaticPokemon(trimmedSPSection);
        } else {
          setStaticPokemon(
            "<h2>Static Pokemon</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Wild Pokemon Section then grabs it
        const wpRegex = /<h2 id="wp">Wild Pokemon<\/h2>[^]*<h2 id="tm">/g;
        let wildPokemonSection = flatHTML.match(wpRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const tmRemoveTagRegex = /<h2 id="tm">/;
        if (wildPokemonSection) {
          let trimmedWPSection = wildPokemonSection[0].replace(
            tmRemoveTagRegex,
            ""
          );
          setWildPokemon(trimmedWPSection);
        } else {
          setWildPokemon(
            "<h2>Wild Pokemon</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full TM Moves Section then grabs it
        const tmRegex = /<h2 id="tm">TM Moves<\/h2>[^]*<h2 id="mt">/g;
        let tmMovesSection = flatHTML.match(tmRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const mtRemoveTagRegex = /<h2 id="mt">/;
        if (tmMovesSection) {
          let trimmedTMSection = tmMovesSection[0].replace(
            mtRemoveTagRegex,
            ""
          );
          setTmMoves(trimmedTMSection);
        } else {
          setTmMoves(
            "<h2>TM Moves</h2>" +
              "This section is unaffected in this Pokemon verson..."
          );
        }

        // Matches the full Move Tutor Moves Section then grabs it
        const mtRegex = /<h2 id="mt">Move Tutor Moves<\/h2>[^]*<h2 id="igt">/g;
        let moveTutorSection = flatHTML.match(mtRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const igtRemoveTagRegex = /<h2 id="igt">/;
        if (moveTutorSection) {
          let trimmedMTSection = moveTutorSection[0].replace(
            igtRemoveTagRegex,
            ""
          );
          setMoveTutorMoves(trimmedMTSection);
        } else {
          setMoveTutorMoves(
            "<h2>Move Tutor</h2>" +
              "This section is unaffected in this Pokemon version.."
          );
        }

        // Matches the full Move Tutor Moves Section then grabs it
        const igtRegex = /<h2 id="igt">In-Game Trades<\/h2>[^]*<hr>/g;
        let inGameTradesSection = flatHTML.match(igtRegex);
        // Matches and then removes the H2 tag used to mark the end of the section
        const hrRemoveTagRegex = /<hr>/;
        if (inGameTradesSection) {
          let trimmedIGTSection = inGameTradesSection[0].replace(
            hrRemoveTagRegex,
            ""
          );
          setInGameTrades(trimmedIGTSection);
        } else {
          setInGameTrades(
            "<h2>In-Game Trades</h2>" +
              "This section is unaffected in this Pokemon version.."
          );
        }
      };
      reader.readAsText(pokefile);
      console.log("Read the file");
    } else {
      alert("Failed to load file");
    }
  }

  // function showAllSections() {}

  useEffect(() => {
    // Gets Div for Patches Applied and inserts the HTML from state
    let paDiv = document.getElementById("patches-applied");
    paDiv.innerHTML = patchesApplied;
  }, [patchesApplied]);

  useEffect(() => {
    // Gets Div for Randomized Evolutions and inserts the HTML from state
    let reDiv = document.getElementById("randomized-evolutions");
    reDiv.innerHTML = randomizedEvolutions;
  }, [randomizedEvolutions]);

  useEffect(() => {
    // Gets Div for Evolution Paths and inserts the HTML from state
    let epDiv = document.getElementById("new-evolution-paths");
    epDiv.innerHTML = evolutionPaths;
  }, [evolutionPaths]);

  useEffect(() => {
    // Gets Div for Evolution Paths and inserts the HTML from state
    let psDiv = document.getElementById("pokemon-stats");
    psDiv.innerHTML = pokemonStats;
  }, [pokemonStats]);

  useEffect(() => {
    // Gets Div for Evolution Paths and inserts the HTML from state
    let rteDiv = document.getElementById("removing-trade-evolutions");
    rteDiv.innerHTML = impossibleEvos;
  }, [impossibleEvos]);

  useEffect(() => {
    // Gets Div for Starters and inserts the HTML from state
    let rsDiv = document.getElementById("random-starters");
    rsDiv.innerHTML = starters;
  }, [starters]);

  useEffect(() => {
    // Gets Div for Move Data and inserts the HTML from state
    let mdDiv = document.getElementById("move-data");
    mdDiv.innerHTML = moveData;
  }, [moveData]);

  useEffect(() => {
    // Gets Div for Pokemon Movesets and inserts the HTML from state
    let pmDiv = document.getElementById("pokemon-moves");
    pmDiv.innerHTML = pokemonMoves;
  }, [pokemonMoves]);

  useEffect(() => {
    // Gets Div for Trainers Pokemon and inserts the HTML from state
    let tpDiv = document.getElementById("trainers-pokemon");
    tpDiv.innerHTML = trainerPokemon;
  }, [trainerPokemon]);

  useEffect(() => {
    // Gets Div for Static Pokemon and inserts the HTML from state
    let spDiv = document.getElementById("static-pokemon");
    spDiv.innerHTML = staticPokemon;
  }, [staticPokemon]);

  useEffect(() => {
    // Gets Div for Wild Pokemon and inserts the HTML from state
    let wpDiv = document.getElementById("wild-pokemon");
    wpDiv.innerHTML = wildPokemon;
  }, [wildPokemon]);

  useEffect(() => {
    // Gets Div for TM Moves and inserts the HTML from state
    let tmDiv = document.getElementById("tm-moves");
    tmDiv.innerHTML = tmMoves;
  }, [tmMoves]);

  useEffect(() => {
    // Gets Div for TM Moves and inserts the HTML from state
    let mtDiv = document.getElementById("move-tutor-moves");
    mtDiv.innerHTML = moveTutorMoves;
  }, [moveTutorMoves]);

  useEffect(() => {
    // Gets Div for TM Moves and inserts the HTML from state
    let igtDiv = document.getElementById("in-game-trades");
    igtDiv.innerHTML = inGameTrades;
  }, [inGameTrades]);

  return (
    <div className="App">
      <header>
        <h1>PokeRandomizer Log Enhancer</h1>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://afunkyportfolio.web.app/"
        >
          <p>by Tyler Funk 🤘</p>
        </a>
      </header>
      <div className="file-picker-container" truncate>
        <label id="file-picker-label" for="file-picker">
          Browse For Log File...
        </label>
        <input
          onChange={readSingleFile}
          id="file-picker"
          type="file"
          accept=".htm"
        />
        {fileName ? (
          <p className="successful-upload">
            {fileName}
            <span> successfully uploaded</span>
          </p>
        ) : (
          <p>No File Uploaded...</p>
        )}
      </div>
      {/* <iframe id="pokeHTML" title="pokemon log html" src={pokeHTML}></iframe> */}
      {/* <div className="show-all" onClick={showAllSections}>Show All Sections</div> */}
      <h3>Toggle Sections</h3>
      <div className="toggler-container">
        <div
          className={isPAVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsPAVisible(!isPAVisible)}
        >
          Patches Applied
        </div>
        <div
          className={isREVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsREVisible(!isREVisible)}
        >
          Randomized Evolutions
        </div>
        <div
          className={isEPVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsEPVisible(!isEPVisible)}
        >
          Evolution Paths
        </div>
        <div
          className={isPSVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsPSVisible(!isPSVisible)}
        >
          Pokemon Stats
        </div>
        <div
          className={
            isRTEVisible ? "section-toggler on" : "section-toggler off"
          }
          onClick={() => setIsRTEVisible(!isRTEVisible)}
        >
          Impossible Evos
        </div>
        <div
          className={isRSVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsRSVisible(!isRSVisible)}
        >
          Starters
        </div>
        <div
          className={isMDVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsMDVisible(!isMDVisible)}
        >
          Move Data
        </div>
        <div
          className={isPMVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsPMVisible(!isPMVisible)}
        >
          Pokemon Moves
        </div>
        <div
          className={isTPVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsTPVisible(!isTPVisible)}
        >
          Trainer Pokemon
        </div>
        <div
          className={isSPVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsSPVisible(!isSPVisible)}
        >
          Static Pokemon
        </div>
        <div
          className={isWPVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsWPVisible(!isWPVisible)}
        >
          Wild Pokemon
        </div>
        <div
          className={isTMVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsTMVisible(!isTMVisible)}
        >
          TM Moves
        </div>
        <div
          className={isMTVisible ? "section-toggler on" : "section-toggler off"}
          onClick={() => setIsMTVisible(!isMTVisible)}
        >
          Move Tutor
        </div>
        <div
          className={
            isIGTVisible ? "section-toggler on" : "section-toggler off"
          }
          onClick={() => setIsIGTVisible(!isIGTVisible)}
        >
          In-Game Trades
        </div>
      </div>

      {isPAVisible ? (
        <div>
          <div id="patches-applied"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="patches-applied"></div>
          <hr />
        </div>
      )}
      {isREVisible ? (
        <div>
          <div id="randomized-evolutions"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="randomized-evolutions"></div>
          <hr />
        </div>
      )}
      {isEPVisible ? (
        <div>
          <div id="new-evolution-paths"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="new-evolution-paths"></div>
          <hr />
        </div>
      )}
      {isPSVisible ? (
        <div>
          <div id="pokemon-stats"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="pokemon-stats"></div>
          <hr />
        </div>
      )}
      {isRTEVisible ? (
        <div>
          <div id="removing-trade-evolutions"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="removing-trade-evolutions"></div>
          <hr />
        </div>
      )}
      {isRSVisible ? (
        <div>
          <div id="random-starters"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="random-starters"></div>
          <hr />
        </div>
      )}
      {isMDVisible ? (
        <div>
          <div id="move-data"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="move-data"></div>
          <hr />
        </div>
      )}
      {isPMVisible ? (
        <div>
          <div id="pokemon-moves"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="pokemon-moves"></div>
          <hr />
        </div>
      )}
      {isTPVisible ? (
        <div>
          <div id="trainers-pokemon"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="trainers-pokemon"></div>
          <hr />
        </div>
      )}
      {isSPVisible ? (
        <div>
          <div id="static-pokemon"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="static-pokemon"></div>
          <hr />
        </div>
      )}
      {isWPVisible ? (
        <div>
          <div id="wild-pokemon"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="wild-pokemon"></div>
          <hr />
        </div>
      )}
      {isTMVisible ? (
        <div>
          <div id="tm-moves"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="tm-moves"></div>
          <hr />
        </div>
      )}
      {isMTVisible ? (
        <div>
          <div id="move-tutor-moves"></div>
          <hr />
        </div>
      ) : (
        <div className="hidden">
          <div id="move-tutor-moves"></div>
          <hr />
        </div>
      )}
      {isIGTVisible ? (
        <div>
          <div id="in-game-trades"></div>
        </div>
      ) : (
        <div className="hidden">
          <div id="in-game-trades"></div>
        </div>
      )}
    </div>
  );
}

export default App;
