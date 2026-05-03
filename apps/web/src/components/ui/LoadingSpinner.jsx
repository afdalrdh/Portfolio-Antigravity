import './LoadingSpinner.css';

export default function LoadingSpinner() {
    return (
        <div className="loading-spinner-wrapper">
            <div className="dot-grid">
                <span className="dot" style={{ '--i': 0 }}></span>
                <span className="dot" style={{ '--i': 1 }}></span>
                <span className="dot" style={{ '--i': 2 }}></span>
                <span className="dot" style={{ '--i': 3 }}></span>
                <span className="dot" style={{ '--i': 4 }}></span>
                <span className="dot" style={{ '--i': 5 }}></span>
                <span className="dot" style={{ '--i': 6 }}></span>
                <span className="dot" style={{ '--i': 7 }}></span>
                <span className="dot" style={{ '--i': 8 }}></span>
            </div>
        </div>
    );
}
