const Star = ({ id, text, image, createdAt, updatedAt }) => {
    return (
        <div className="card mb-3">
            {!!image && (
                <img
                    src={"data:image/png;base64," + image}
                    className="card-img-top"
                    alt="..."
                />
            )}
            <div className="card-body">
                {/* <h5 className="card-title">Card title</h5> */}
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
};

export default Star;
