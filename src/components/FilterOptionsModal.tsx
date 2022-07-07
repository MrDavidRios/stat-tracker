import { useState } from 'react';
import { getDuplicates } from '../utils/arrayOps';
import { presetFilterColors } from '../utils/themeColors';
import { FilterPrototype, ValueOption } from './Statistic';

export const FilterOptionsModal = ({
  filter: originalFilter,
  idx,
  updateFilterCallback,
  closeModalCallback,
}: {
  filter: FilterPrototype;
  idx: number;
  updateFilterCallback: Function;
  closeModalCallback: Function;
}) => {
  function closeModal() {
    // Remove empty options
    const prunedFilter = { ...filter, valueOptions: filter.valueOptions.filter(_option => _option.name !== '') };

    const valueOptionNames = filter.valueOptions.map(_valueOption => _valueOption.name.toLowerCase());

    if (valueOptionNames.length !== new Set(valueOptionNames).size) {
      const duplicateFilterNameIndices: number[][] = Array.from(getDuplicates(valueOptionNames).values());
      setInvalidInputIndices(duplicateFilterNameIndices);
    } else {
      updateFilterCallback(prunedFilter, idx);
      closeModalCallback();
    }
  }

  const [filter, updateFilter] = useState(originalFilter);
  const [invalidInputIndices, setInvalidInputIndices] = useState([] as number[][]);

  return (
    <div className="backdrop">
      <div id="filterOptionsModal" className="horizontally-centered-absolute">
        <div>
          <h2>Filter Options</h2>
          <button id="closeButton" onClick={() => closeModal()} title="Close and Save Changes">
            <div>
              <i className="bi bi-x-lg"></i>
            </div>
          </button>
        </div>
        <div id="optionsWrapper">
          {filter.valueOptions.map((option, idx) => (
            <div id="optionCard" key={idx}>
              <div className="color-picker-container">
                <input
                  className="color-picker"
                  type="color"
                  value={option.color}
                  onChange={e => {
                    const modifiedFilter = { ...filter };
                    modifiedFilter.valueOptions[idx].color = e.target.value;
                    updateFilter(modifiedFilter);
                  }}
                ></input>
              </div>

              <div className="input-with-label-below">
                <input
                  className={`form-control ${invalidInputIndices.some(e => e.includes(idx)) ? 'is-invalid' : ''}`}
                  value={option.name}
                  placeholder="Option"
                  aria-describedby="optionInputFeedback"
                  onChange={e => {
                    if (invalidInputIndices.some(e => e.includes(idx))) {
                      const modifiedInvalidInputIndices = invalidInputIndices.filter(e => !e.includes(idx));
                      setInvalidInputIndices(modifiedInvalidInputIndices);
                    }

                    const modifiedFilter = { ...filter };
                    modifiedFilter.valueOptions[idx].name = e.target.value;
                    updateFilter(modifiedFilter);
                  }}
                ></input>
                <div id="optionInputFeedback" className="invalid-feedback">
                  Duplicate Value
                </div>
              </div>
              <button
                onClick={() => {
                  updateFilter({ ...filter, valueOptions: filter.valueOptions.filter((_option, _idx) => _idx !== idx) });
                }}
              >
                <div>
                  <i className="bi bi-dash-lg"></i>
                </div>
              </button>
            </div>
          ))}
        </div>
        <div>
          <button
            id="addOptionButton"
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (!filter.valueOptions.map(e => e.name).includes('')) {
                const newFilterIdx = filter.valueOptions.length;

                const modifiedFilter = { ...filter, valueOptions: [...filter.valueOptions, new ValueOption('', presetFilterColors[newFilterIdx % presetFilterColors.length].primary)] };
                updateFilter(modifiedFilter);
              }
            }}
          >
            Add Option
          </button>
        </div>
      </div>
    </div>
  );
};
