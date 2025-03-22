import { useState } from 'react';

interface BadgerProps {
  id: number;
  hp: number;
  onUpdateHP: (id: number, newHP: number) => void;
  onDelete: (id: number) => void;
  onUpdateColor: (id: number, newColor: string) => void;
  onUpdateName: (id: number, newName: string) => void;
  name: string;
  bgColor: string;
}

export default function BadgerCard({
  id,
  hp,
  name,
  bgColor,
  onUpdateHP,
  onDelete,
  onUpdateColor,
  onUpdateName,
}: BadgerProps) {
  const [amount, setAmount] = useState<number | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);
    if (value === '' || (numberValue >= 0 && numberValue <= hp)) {
      setAmount(value === '' ? '' : numberValue);
    }
  };

  const handleSubtract = () => {
    onUpdateHP(id, hp - (Number(amount) || 0));
    setAmount('');
  };

  const handleAdd = () => {
    onUpdateHP(id, hp + (Number(amount) || 0));
    setAmount('');
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateColor(id, e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateName(id, e.target.value);
  };

  return (
    <div
      className="p-4 border-amber-700 rounded-lg shadow-md bg-white flex flex-col items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex gap-10 items-center bg-white px-2">
        {/* <h2 className="text-3xl font-pixel font-bold">Badger #{id}</h2> */}
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="text-3xl font-pixel font-bold px-2 py-1 w-30 focus:outline-none"
        />
        <p className="text-gray-700 text-3xl font-pixel">HP: {hp}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <input
          className="bg-gray-300 text-black rounded-2xl px-2 py-1 text-right font-pixel"
          type="number"
          value={amount}
          onChange={handleChange}
          min={0}
          max={hp}
        />
        <div className="flex gap-2">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-2xl font-pixel text-lg"
            onClick={handleSubtract}
          >
            DAMAGE
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-2xl font-pixel text-lg"
            onClick={handleAdd}
          >
            HEAL
          </button>
          <button
            className="bg-black text-white px-3 py-1 rounded-2xl font-pixel text-lg"
            onClick={() => onDelete(id)}
          >
            DEAD
          </button>
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <label className="font-pixel text-sm">Choose Color: </label>
        <input type="color" value={bgColor} onChange={handleColorChange} />
      </div>
    </div>
  );
}
