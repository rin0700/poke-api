import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //ロード画面の表示/非表示を設定
  const [loading, setLoading] = useState(true);

  //useEffectを使用して[](最初にレンダリング)されたときにデータの取得を実行する。
  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得しresに格納
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  return <div className="App">
    {/* trueの場合はロード中/falseの場合は取得しましたを返す */}
    {loading ? (
      <h1>ロード中・・・</h1>
    ) : (
      <>
      <h1>ポケモンデータを取得しました。</h1>
      </>
    )}
  </div>;
}

export default App;
