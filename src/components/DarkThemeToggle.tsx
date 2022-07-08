export const DarkThemeToggle = ({ enabled, callback }: { enabled: boolean; callback: Function }) => {
  return (
    <div className="form-check form-switch" id="autoStartupCheckboxWrapper">
      <input
        className="form-check-input"
        type="checkbox"
        checked={enabled}
        id="flexSwitchCheckDefault"
        title={enabled ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        onChange={e => {
          callback(e.target.checked);
        }}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        Dark Mode
      </label>
    </div>
  );
};
