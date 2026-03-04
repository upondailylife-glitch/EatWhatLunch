import { useState } from 'react';
import EntryPanel from './components/EntryPanel';
import LunchWheel from './components/LunchWheel';
import { useLunchEntries } from './hooks/useLunchEntries';

function App() {
  const { entries, addEntry, removeEntry, resetEntries } = useLunchEntries();
  const [result, setResult] = useState('点击转盘，决定今天中午吃什么');
  const [spinning, setSpinning] = useState(false);

  return (
    <main className="app">
      <header className="hero">
        <p className="hero__kicker">Eat What Lunch</p>
        <h1>今天中午吃什么？</h1>
        <p className="hero__subtitle">输入你的备选菜单，让转盘来做决定。</p>
      </header>

      <section className="content-grid">
        <LunchWheel
          entries={entries}
          onResult={setResult}
          onSpinStateChange={setSpinning}
          spinning={spinning}
        />

        <EntryPanel
          entries={entries}
          onAddEntry={addEntry}
          onRemoveEntry={removeEntry}
          onResetEntries={resetEntries}
          disabled={spinning}
        />
      </section>

      <section className="result-card" aria-live="polite">
        <span>抽取结果</span>
        <strong>{result}</strong>
      </section>
    </main>
  );
}

export default App;
