import { useState } from 'react';
import { FilterPrototype, Statistic } from './Statistic';
import { FilterOptionsModal } from './FilterOptionsModal';

export const StatFiltersForm = ({ stat, updateStat }: { stat: Statistic; updateStat: Function }) => {
  const [filterModalOpenIdx, setFilterModalStatus] = useState(-1);

  function updateFilter(filter: FilterPrototype, idx: number) {
    const newStat = structuredClone(stat);
    newStat.filters[idx] = filter;
    updateStat(newStat);
  }

  return (
    <div id="statFilterForm">
      {stat.filters.map((filter, idx) => (
        <div className="filter-template-edit" key={idx}>
          <div className="input-with-label-below">
            <input
              className="form-control"
              value={filter.name}
              onChange={e => {
                const updatedFilters = [...stat.filters];
                updatedFilters[idx] = { ...updatedFilters[idx], name: e.target.value };

                const modifiedStat: Statistic = { ...stat, filters: updatedFilters };

                updateStat(modifiedStat);
              }}
            ></input>
            <p>Filter Name</p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setFilterModalStatus(idx);
              }}
            >
              Edit Filter Options
            </button>
            <p style={{ color: filter.valueOptions.length === 0 ? 'red' : '' }}>
              {filter.valueOptions.length === 0 ? 'No options' : filter.valueOptions.length > 1 ? filter.valueOptions.length + ' options' : '1 option'}
            </p>
          </div>
          {filterModalOpenIdx === idx ? <FilterOptionsModal filter={filter} idx={idx} updateFilterCallback={updateFilter} closeModalCallback={() => setFilterModalStatus(-1)} /> : ''}
          <button
            className="remove-filter-proto-btn"
            title="Remove Filter"
            onClick={() => {
              // Remove selected filter
              const updatedFilters = stat.filters.filter((_stat, _idx) => _idx !== idx);

              // Loop through all entries and remove filter from all of them
              const updatedEntries = stat.entries.map(_entry => {
                return { ..._entry, filters: _entry.filters.filter(_filter => updatedFilters.map(e => e.name).includes(_filter.name)) };
              });

              const modifiedStat: Statistic = { ...stat, entries: updatedEntries, filters: updatedFilters };

              updateStat(modifiedStat);
            }}
          >
            <div>
              <i className="bi bi-x-lg"></i>
            </div>
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};
