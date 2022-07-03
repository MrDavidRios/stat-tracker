import { useState } from 'react';
import Dropdown from './Dropdown';
import { Entry, FilterValue, Statistic } from './Statistic';

export const AddEntryModal = ({ stat, idx, addEntryCallback, closeModal }: { stat: Statistic; idx: number; addEntryCallback: Function; closeModal: Function }) => {
  const defaultFilterVals = stat.filters.map(filterProt => new FilterValue(filterProt, 0));

  const [entry, updateEntry] = useState(new Entry(0, defaultFilterVals, new Date()));

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
        <div className="input-with-label-below">
          <input
            className="form-control"
            value={entry.value}
            onChange={e => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1')
                .replace(/^0[^.]/, '0');

              const modifiedEntry = { ...entry };

              if (e.target.value.trim() === '') modifiedEntry.value = 0;
              else modifiedEntry.value = parseInt(e.target.value);

              updateEntry(modifiedEntry);
            }}
          ></input>
          <p>Value</p>
        </div>
        <div id="valueOptionsWrapper">
          {stat.filters.map((_filter, _idx) => (
            <div className="add-entry-filter-form" key={_idx}>
              <p>{_filter.name + ':'}</p>
              <Dropdown options={_filter.valueOptions} callback={(idx: number) => dropdownSelected(_idx, idx)} />
            </div>
          ))}
        </div>
        <div>
          <button
            id="addEntryButton"
            type="button"
            className="btn btn-primary"
            onClick={() => {
              addEntryCallback(idx, entry);
              closeModal();
            }}
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>
  );
};
