import * as React from 'react';
import './App.css';

import logo from './logo.svg';

interface IItems {
  name: string;
  count: number;
}

interface IUpdaterProps {
  label: string;
  count: number;
  items: IItems[];
}

const Updater = React.memo<IUpdaterProps>(
  ({ count, label, items }) => {
    const title = React.useMemo(() => `${label}, Count = ${count}`, [count, label]);
    const total = React.useMemo(() => {
      console.log('Recalculate');
      return `Total: ${items.reduce((prev: number, cur: IItems) => {
        return prev + cur.count;
      }, 0)}`;
    }, [items]);

    return (
      <>
        <p className='App-intro'>{title}</p>
        <p className='App-intro'>{total}</p>
      </>
    );
  },
  (prevProps, nextProps) => {
    // They are equal?
    return prevProps.count === nextProps.count && prevProps.items.length === nextProps.items.length;
  }
);

const App: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState<IItems[]>([]);
  const [inputState, setInputState] = React.useState('');

  const addItem = React.useCallback(
    (name: string) => {
      setItems((prev) => [
        ...prev,
        {
          count: Math.random() * 10,
          name,
        },
      ]);
    },
    [setItems]
  );

  const updateCount = React.useCallback(() => {
    setCount((prev) => prev + 1);
  }, [setCount]);

  console.log(count);
  console.log(items);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>Welcome to React</h1>
        <input onChange={(e) => setInputState(e.target.value)} />
        <button onClick={() => addItem(inputState)}>Add Item</button>
      </header>

      <div onClick={updateCount}>
        <Updater items={items} label='Update Count' count={count} />
      </div>
    </div>
  );
};

export default App;
