export const DarkThemeToggle = ({ enabled, callback }: { enabled: boolean; callback: Function }) => {
  return (
    <div className="form-check form-switch" id="autoStartupCheckboxWrapper">
      <input
        className="form-check-input"
        type="checkbox"
        checked={enabled}
        id="flexSwitchCheckDefault"
        title={enabled ? 'Disable Dark Theme' : 'Enable Dark Theme'}
        onChange={e => {
          callback(e.target.checked);
        }}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        Dark Theme
      </label>
    </div>
  );
};
