const ContextMenuDropdown = ({
  idx,
  callback,
  size = 32,
}: {
  idx: number;
  callback: Function;
  size?: number;
}) => {
  return (
    <div style={{ paddingTop: '5px' }} className="remove-action-btn">
      <i
        className="bi bi-three-dots "
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontSize: size, cursor: 'pointer' }}
      ></i>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            className="dropdown-item delete"
            draggable="false"
            href="#"
            onClick={() => callback(idx)}
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenuDropdown;
