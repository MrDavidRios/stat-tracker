import { useState } from 'react';
import { FilterPrototype } from './Statistic';

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
    const prunedFilter = { ...filter, valueOptions: filter.valueOptions.filter(_option => _option !== '') };

    updateFilterCallback(prunedFilter, idx);
    closeModalCallback();
  }

  const [filter, updateFilter] = useState(originalFilter);

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
              <div className="input-with-label-below">
                <input
                  className="form-control"
                  value={option}
                  onChange={e => {
                    const modifiedFilter = { ...filter };
                    modifiedFilter.valueOptions[idx] = e.target.value;
                    updateFilter(modifiedFilter);
                  }}
                ></input>
                <p>Option</p>
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
              if (!filter.valueOptions.includes('')) {
                const modifiedFilter = { ...filter, valueOptions: [...filter.valueOptions, ''] };
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
