import "./App.css";
import pokeHTML from "./Pokemon-Shroomish-RW.gba.log.htm";

function App() {
  // const pokeString = pokeHTML
  // const setFileToLocalStorage = (file) => {
  //   localStorage.setItem("pokeHTML", file);
  // };

  function readSingleFile(event) {
    //Retrieve the first (and only!) File from the FileList object
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
        console.log(contents);
        console.log("contents: ", contents.replace(/<!--.+-->/gi, ""));
      };
      // reader.readAsText(pokefile);
    } else {
      alert("Failed to load file");
    }
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
    </div>
  );
}

export default App;
