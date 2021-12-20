const Login = () => {
    return (
        <form>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                    Your password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Log in
            </button>
        </form>
    );
};

export default Login;
