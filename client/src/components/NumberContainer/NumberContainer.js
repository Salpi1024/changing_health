import './NumberContainer.css';
function NumberContainer({ number }) {
    return (
    <div className="container">
    <h3>{number.type.toUpperCase()}</h3>
    <h1>{number.value}</h1>
    </div>)
};

export default NumberContainer;