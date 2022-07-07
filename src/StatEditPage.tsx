import { Modal } from 'bootstrap';
import _ from 'lodash';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorModal } from './components/ErrorModal';
import { StatFiltersForm } from './components/StatFiltersForm';
import { FilterPrototype, Statistic } from './components/Statistic';

export function StatEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat: originalStat, idx, statAmount, adding = false } = location.state as { stat: Statistic; idx: number; statAmount: number; adding?: boolean };

  const [stat, updateStat] = useState(originalStat);

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
        {adding ? (
          ''
        ) : (
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
        )}
      </header>
      <main>
        <hr />
        <h2>Filters</h2>
        <StatFiltersForm stat={stat} updateStat={updateStat} />
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
        {!adding && _.isEqual(stat, originalStat) ? (
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
                } else {
                  console.log(statAmount);
                  if (adding) navigate('/', { state: { statToAdd: prunedStat, statAmount: statAmount } });
                  else navigate('/', { state: { modifiedStat: { stat: prunedStat, idx: idx } } });
                } /* modifiedStats: {stat: Statistic; idx: number} */
              }}
            >
              {adding ? 'Add Stat' : 'Save Changes'}
            </button>
          </>
        )}
      </main>
      <ErrorModal title="Error - No options on filter" errorMsg="You cannot create a filter without any options." id="errorModal" />
    </div>
  );
}
