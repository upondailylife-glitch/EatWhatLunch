import { useState } from 'react';
import './EntryPanel.css';

export default function EntryPanel({
  entries,
  onAddEntry,
  onRemoveEntry,
  onResetEntries,
  disabled,
}) {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onAddEntry(draft);

    if (result.ok) {
      setDraft('');
      setError('');
      return;
    }

    setError(result.message);
  };

  return (
    <section className="entry-panel">
      <div className="entry-panel__header">
        <h2>词条池</h2>
        <span>{entries.length} 项</span>
      </div>

      <form className="entry-panel__form" onSubmit={handleSubmit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="例如：酸菜鱼"
          maxLength={20}
          disabled={disabled}
        />
        <button type="submit" disabled={disabled}>
          添加
        </button>
      </form>

      {error && <p className="entry-panel__error">{error}</p>}

      <ul className="entry-panel__list">
        {entries.map((item, index) => (
          <li key={`${item}-${index}`}>
            <span title={item}>{item}</span>
            <button type="button" onClick={() => onRemoveEntry(index)} disabled={disabled}>
              删除
            </button>
          </li>
        ))}
      </ul>

      <button className="entry-panel__reset" type="button" onClick={onResetEntries} disabled={disabled}>
        恢复默认词条
      </button>
    </section>
  );
}
