import { useEffect } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //useEffectを使用して[](最初にレンダリング)されたときにデータの取得を実行する。
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得しresに格納
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);

  return <div className="App"></div>;
}

export default App;
