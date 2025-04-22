const App = ({ data }) => {
  return (
    <main>
      <h1>Neon Local</h1>
      <p>Simple React SSR Vite Express</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
};

export default App;
