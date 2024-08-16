import { Link } from "react-router-dom"

const DashHeader = () => {
    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash_header__title">techNotes</h1>
                </Link>
                <nav className="dash-head__nav">

                </nav>
            </div>
        </header>
    );

    return content;
}

export default DashHeader