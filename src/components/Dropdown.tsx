import { useState } from 'react';

const Dropdown = ({ options, callback, selectedValueIdx = 0 }: { options: string[]; callback: Function; selectedValueIdx?: number }) => {
  const [selectedOption, setSelectedOption] = useState(selectedValueIdx);

  function updateSelectedOption(idx: number) {
    setSelectedOption(idx);
    callback(idx);
  }

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {options[selectedOption]}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {options.map((option, idx) => (
          <li key={idx}>
            <a
              onClick={e => {
                e.preventDefault();

                updateSelectedOption(idx);
              }}
              className="dropdown-item"
              draggable="false"
              href="#"
            >
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
