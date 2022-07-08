import { Modal } from 'bootstrap';
import _ from 'lodash';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorModal } from './components/ErrorModal';
import { StatFiltersForm } from './components/StatFiltersForm';
import { FilterPrototype, Statistic } from './components/Statistic';
import { getDuplicates } from './utils/arrayOps';

export function StatEditPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat: originalStat, idx, statAmount, adding = false } = location.state as { stat: Statistic; idx: number; statAmount: number; adding?: boolean };

  const [stat, updateStat] = useState(structuredClone(originalStat) as Statistic);
  const [invalidInputIndices, setInvalidInputIndices] = useState([] as number[][]);

  // On change, use original callback
  // Having replace = true makes it so that state doesn't carry to main page.
  return (
    <div id="statEditPageWrapper" className="background">
      <header>
        <button className="back-arrow-btn hover-background" onClick={() => navigate('/', { replace: true })} title="Back">
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
            className="hover-background"
            title="Delete Stat"
            onClick={() => {
              navigate('/', { state: { statToDeleteIdx: idx, statAmount: statAmount } });
            }}
          >
            <div>
              <i className="bi bi-trash3"></i>
            </div>
          </button>
        )}
      </header>
      <main>
        <hr />
        <h2>Filters</h2>
        <StatFiltersForm
          stat={stat}
          updateStat={updateStat}
          invalidInputIndices={JSON.stringify(invalidInputIndices)}
          updateInvalidInputIndices={(indices: string) => setInvalidInputIndices(JSON.parse(indices))}
        />
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

                const filterNames = stat.filters.map(_filter => _filter.name.toLowerCase());

                if (filterNames.length !== new Set(filterNames).size) {
                  const duplicateNameErrorModal = Modal.getOrCreateInstance(document.getElementById('duplicateNameErrorModal') as Element);
                  duplicateNameErrorModal.toggle();

                  const duplicateFilterNameIndices: number[][] = Array.from(getDuplicates(filterNames).values());
                  setInvalidInputIndices(duplicateFilterNameIndices);
                } else {
                  // Check if there are any errors with input. If so, bring up modal window
                  if (_.some(prunedStat.filters, _filter => _filter.valueOptions.length === 0)) {
                    const errorModal = Modal.getOrCreateInstance(document.getElementById('errorModal') as Element);
                    errorModal.toggle();
                  } else {
                    if (adding) navigate('/', { state: { statToAdd: prunedStat, statAmount: statAmount } });
                    else navigate('/', { state: { modifiedStat: { stat: prunedStat, idx: idx } } });
                  } /* modifiedStats: {stat: Statistic; idx: number} */
                }
              }}
            >
              {adding ? 'Add Stat' : 'Save Changes'}
            </button>
          </>
        )}
      </main>
      <ErrorModal title="Error - No options on filter" errorMsg="You cannot create a filter without any options." id="errorModal" />
      <ErrorModal title="Error - Duplicate filter names" errorMsg="You cannot have multiple filters with the same name." id="duplicateNameErrorModal" />
    </div>
  );
}
