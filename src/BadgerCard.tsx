import { useEffect, useRef, useState } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';

interface BadgerProps {
  id: number;
  hp: number;
  name: string;
  bgColor: string;
  isDead: boolean;
  onUpdateHP: (id: number, newHP: number) => void;
  onMarkDead: (id: number, dead: boolean) => void;
  onDelete: (id: number) => void;
  onUpdateColor: (id: number, newColor: string) => void;
  onUpdateName: (id: number, newName: string) => void;
}

export default function BadgerCard({
  id,
  hp,
  name,
  bgColor,
  isDead,
  onUpdateHP,
  onMarkDead,
  onDelete,
  onUpdateColor,
  onUpdateName,
}: BadgerProps) {
  const [amount, setAmount] = useState<number | ''>('');
  const [showPicker, setShowPicker] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [wasCleared, setWasCleared] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleColorChange = (e: { target: { value: string } }) => {
    onUpdateColor(id, e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
    onUpdateName(id, e.target.value);
  };

  return (
    <div
      className={`relative p-4 border-amber-700 rounded-lg shadow-md flex flex-col items-center transition
      ${isDead ? 'grayscale opacity-60' : ''}`}
      style={{
        backgroundColor: bgColor,
        filter: isDead ? 'grayscale(100%) brightness(0.9)' : 'none',
      }}
    >
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-600 font-bold"
        title="Remove card"
      >
        ✖
      </button>
      <div className="flex gap-10 items-center bg-white px-2 border-amber-950 border-2 rounded-2xl">
        <input
          type="text"
          value={tempName}
          onChange={handleNameChange}
          onFocus={() => {
            if (!wasCleared) {
              setTempName('');
              setWasCleared(true);
            }
          }}
          className="text-3xl font-pixel font-bold px-2 py-1 w-35 focus:outline-none"
        />

        <p className="text-gray-700 text-3xl font-pixel">
          HP: {hp}{' '}
          {isDead && (
            <span className="ml-2 text-red-700 font-bold">(DEAD)</span>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-2 w-full items-center">
        <input
          className="bg-gray-300 text-black rounded-2xl px-2 py-1 text-right font-pixel"
          type="number"
          value={amount}
          onChange={handleChange}
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
            onClick={() => onMarkDead(id, true)}
          >
            DEAD
          </button>

          <div className="relative mt-2">
            <button
              className="text-white px-3 py-1 rounded font-pixel text-xl"
              onClick={(e) => {
                e.stopPropagation();
                setShowPicker((prev) => !prev);
              }}
            >
              🎨
            </button>

            {showPicker && (
              <div
                ref={pickerRef}
                className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 p-2 bg-white rounded shadow"
              >
                <TwitterPicker
                  triangle="hide"
                  colors={[
                    '#FF6900',
                    '#FCB900',
                    '#7BDCB5',
                    '#00D084',
                    '#8ED1FC',
                    '#0693E3',
                    '#ABB8C3',
                    '#EB144C',
                    '#F78DA7',
                    '#9900EF',
                    '#fc03ec',
                    '#050505',
                    '#0f5216',
                    '#521e0f',
                  ]}
                  color={bgColor}
                  onChange={(color: ColorResult) => {
                    handleColorChange({ target: { value: color.hex } });
                    setShowPicker(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
