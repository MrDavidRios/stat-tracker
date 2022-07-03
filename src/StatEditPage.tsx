import _ from 'lodash';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterOptionsModal } from './components/FilterOptionsModal';
import { FilterPrototype, Statistic } from './components/Statistic';

export function StatEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat: originalStat, idx } = location.state as { stat: Statistic; saveCallback: Function; idx: number };

  const [stat, updateStat] = useState(originalStat);

  const [filterModalOpenIdx, setFilterModalStatus] = useState(-1);

  function updateFilter(filter: FilterPrototype, idx: number) {
    const newStat = { ...stat };
    newStat.filters[idx] = filter;

    updateStat(newStat);
  }

  // On change, use original callback
  // Having replace = true makes it so that state doesn't carry to main page.

  console.log(stat, originalStat, (location.state as any).stat);

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
        <p></p>
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setFilterModalStatus(idx);
                }}
              >
                Edit Filter Options
              </button>
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

                navigate('/', { state: { modifiedStat: { stat: prunedStat, idx: idx } } }); /* modifiedStats: {stat: Statistic; idx: number} */
              }}
            >
              Save Changes
            </button>
          </>
        )}
      </main>
    </div>
  );
}
