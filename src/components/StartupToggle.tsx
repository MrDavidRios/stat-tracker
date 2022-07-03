export const StartupToggle = ({ enabled, callback }: { enabled: boolean; callback: Function }) => {
  return (
    <div className="form-check form-switch" id="autoStartupCheckboxWrapper">
      <input
        className="form-check-input"
        type="checkbox"
        checked={enabled}
        id="flexSwitchCheckDefault"
        title={enabled ? 'Disable Startup' : 'Enable Startup'}
        onChange={e => {
          window.Main.toggleAutoStartup(e.target.checked);
          callback(e.target.checked);
        }}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        Open on startup
      </label>
    </div>
  );
};
