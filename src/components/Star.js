import moment from "moment";
const Star = ({ id, text, image, createdat, name }) => {
    const created = moment(createdat).fromNow();

    return (
        <div className="card mb-5">
            {!!name && (
                <div className="card-header">
                    <strong>{name}</strong>
                </div>
            )}
            <div className="card-body">
                <p className="card-text">{text}</p>
            </div>
            {!!image && (
                <img
                    src={"data:image/png;base64," + image}
                    className="card-img-top"
                    alt="..."
                />
            )}

            <div className="card-footer text-muted">
                <small title={createdat}>{created}</small>
            </div>
        </div>
    );
};

export default Star;
