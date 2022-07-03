import { Modal } from 'bootstrap';
import _ from 'lodash';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorModal } from './components/ErrorModal';
import { FilterOptionsModal } from './components/FilterOptionsModal';
import { FilterPrototype, Statistic } from './components/Statistic';

export function StatEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat: originalStat, idx, statAmount } = location.state as { stat: Statistic; idx: number; statAmount: number };

  const [stat, updateStat] = useState(originalStat);

  const [filterModalOpenIdx, setFilterModalStatus] = useState(-1);

  function updateFilter(filter: FilterPrototype, idx: number) {
    const newStat = structuredClone(stat);
    newStat.filters[idx] = filter;
    updateStat(newStat);
  }

  // On change, use original callback
  // Having replace = true makes it so that state doesn't carry to main page.
  return (
    <div id="statEditPageWrapper">
      <header>
        <button className="back-arrow-btn" onClick={() => navigate('/', { replace: true })} title="Back">
          <i className="bi bi-arrow-left"></i>
        </button>
        <div>
          <div className="input-with-label-outside">
            <input
              className="form-control"
              id="statNameInput"
              value={stat.statName}
              onChange={e => {
                const modifiedStat: Statistic = { ...stat, statName: e.target.value };

                updateStat(modifiedStat);
              }}
            ></input>
            <p>Stat Name</p>
          </div>
        </div>
        <button
          id="deleteStatButton"
          title="Delete Stat"
          onClick={() => {
            navigate('/', { state: { statToDeleteIdx: idx, statAmount: statAmount } });
          }}
        >
          <div>
            <i className="bi bi-trash"></i>
          </div>
        </button>
      </header>
      <main>
        <hr />
        <h2>Filters</h2>
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
                  const updatedFilters = stat.filters.filter((_stat, _idx) => _idx !== idx);
                  const modifiedStat: Statistic = { ...stat, filters: updatedFilters };

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
        <button
          id="addFilterButton"
          className="big-btn"
          onClick={() => {
            if (!_.some(stat.filters, _filter => _filter.name.trim() === '')) {
              const modifiedStat = { ...stat, filters: [...stat.filters, new FilterPrototype('', [])] };
              updateStat(modifiedStat);
            }
          }}
        >
          <div>
            <i className="bi bi-plus-lg"></i>
          </div>
          Add Filter
        </button>
        {_.isEqual(stat, originalStat) ? (
          ''
        ) : (
          <>
            <hr />
            <button
              id="saveEditsButton"
              className="big-btn"
              onClick={() => {
                const prunedStat = { ...stat, filters: stat.filters.filter(_filter => _filter.name.trim() !== '') };

                // Check if there are any errors with input. If so, bring up modal window
                if (_.some(prunedStat.filters, _filter => _filter.valueOptions.length === 0)) {
                  const errorModal = Modal.getOrCreateInstance(document.getElementById('errorModal') as Element);
                  errorModal.toggle();
                } else navigate('/', { state: { modifiedStat: { stat: prunedStat, idx: idx } } }); /* modifiedStats: {stat: Statistic; idx: number} */
              }}
            >
              Save Changes
            </button>
          </>
        )}
      </main>
      <ErrorModal title="Error - No options on filter" errorMsg="You cannot create a filter without any options." id="errorModal" />
    </div>
  );
}
