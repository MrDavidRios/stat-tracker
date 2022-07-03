import { useEffect, useState } from 'react';

const Dropdown = ({ options, callback, selectedValueIdx = 0, filterTemplate = true }: { options: string; callback: Function; selectedValueIdx?: number; filterTemplate?: boolean }) => {
  const [selectedOption, setSelectedOption] = useState(selectedValueIdx);

  const optionsArr: string[] = JSON.parse(options);

  if (filterTemplate) optionsArr.unshift('Filter Options');

  let stateFinished = false;

  useEffect(() => {
    stateFinished = true;
  });

  function updateSelectedOption(idx: number) {
    setSelectedOption(idx);
    callback(idx);
  }

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {stateFinished ? optionsArr[selectedOption] : optionsArr[selectedValueIdx]}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {optionsArr.map((option, idx) => (
          <li key={idx}>
            <a onClick={() => updateSelectedOption(idx)} className={`dropdown-item ${(filterTemplate && idx > 0) || !filterTemplate ? '' : 'disabled'}`} draggable="false" href="#">
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
