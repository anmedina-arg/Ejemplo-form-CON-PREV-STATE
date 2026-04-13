// eslint-disable-next-line react/prop-types
const Input = ({ label, type, name, handler, value }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        onChange={handler}
        value={value}
      />
    </div>
  );
};

export default Input;
