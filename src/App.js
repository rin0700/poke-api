import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import "./App.css";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //ロード画面の表示/非表示を設定
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURl, setPrevURL] = useState("");

  //useEffectを使用して[](最初にレンダリング)されたときにデータの取得を実行する。
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得しresに格納
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURl) return;

    setLoading(true);
    let data = await getAllPokemon(prevURl);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {/* trueの場合はロード中/falseの場合は取得しましたを返す */}
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
