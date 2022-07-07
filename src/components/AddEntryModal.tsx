import { useState } from 'react';
import Dropdown from './Dropdown';
import { Entry, FilterValue, Statistic } from './Statistic';

export const AddEntryModal = ({ stat, idx, addEntryCallback, closeModal }: { stat: Statistic; idx: number; addEntryCallback: Function; closeModal: Function }) => {
  const defaultFilterVals = stat.filters.map(filterProt => new FilterValue(filterProt, 0));

  const [entry, updateEntry] = useState(new Entry(0, defaultFilterVals, new Date()));
  const [validInput, updateInputValidity] = useState(false);
  const [triedToSubmit, updateTriedToSubmit] = useState(false);

  function dropdownSelected(filterIdx: number, valueOptionIdx: number) {
    const modifiedEntry = { ...entry };
    modifiedEntry.filters[filterIdx].valueIdx = valueOptionIdx;
    updateEntry(modifiedEntry);
  }

  return (
    <div className="backdrop">
      <div id="addEntryModal" className="horizontally-centered-absolute">
        <div>
          <h2>Add Entry</h2>
          <button id="closeButton" onClick={() => closeModal()} title="Close and Save Changes">
            <div>
              <i className="bi bi-x-lg"></i>
            </div>
          </button>
        </div>
        <div id="valueInput">
          <input
            className={`form-control ${!validInput && triedToSubmit ? 'is-invalid' : ''}`}
            aria-describedby="valueInputFeedback"
            placeholder="Value"
            onChange={e => {
              const modifiedEntry = { ...entry };

              try {
                e.target.value = e.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1')
                  .replace(/^0[^.]/, '0');

                modifiedEntry.value = parseFloat(e.target.value);

                if (e.target.value === '' || e.target.value === '.') updateInputValidity(false);
                else updateInputValidity(true);

                updateTriedToSubmit(false);
                updateEntry(modifiedEntry);
              } catch {}
            }}
          ></input>
          <div id="valueInputFeedback" className="invalid-feedback">
            Please provide a valid number.
          </div>
        </div>
        <div id="valueOptionsWrapper">
          {stat.filters.map((_filter, _idx) => (
            <div className="add-entry-filter-form" key={_idx}>
              <p>{_filter.name + ':'}</p>
              <Dropdown options={_filter.valueOptions.map(e => e.name)} callback={(idx: number) => dropdownSelected(_idx, idx)} />
            </div>
          ))}
        </div>
        <div>
          <button
            id="addEntryButton"
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (validInput) {
                const entryWithDate = { ...entry };
                entryWithDate.date = new Date();

                addEntryCallback(idx, entryWithDate);
                closeModal();
              } else updateTriedToSubmit(true);
            }}
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>
  );
};
