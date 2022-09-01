import { useState } from "react";
import axios from "axios";

function App() {
  const [dataUser, setDatauser] = useState({
    user: "",
    password: "",
  });

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    const objDataUser = { ...dataUser, [name]: value };
    setDatauser(objDataUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("No envia datos");
    } else {
      const res = await axios.post("http://localhost:3001/user/login", dataUser);
      console.log(res.data);
    }
  };

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-tittle fw-bold mb-4">Login</h1>
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate={true}
                  autoComplete="off"
                >
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">
                      Usuario
                    </label>
                    <input
                      onChange={handleInputchange}
                      value={dataUser.user}
                      id="email"
                      type="text"
                      className="form-control"
                      name="user"
                      required
                      autoFocus
                    />
                    <div className="invalid-feedback">Usuario No Válido</div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="password">
                        Password
                      </label>
                      <a href="/" className="float-end">
                        ¿Olvidaste tu password?
                      </a>
                    </div>
                    <input
                      onChange={handleInputchange}
                      value={dataUser.password}
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      required
                    />
                    <div className="invalid-feedback">
                      La passwrod es requerida
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="form-check-input"
                      />
                      <label htmlFor="remember" className="form-check-label">
                        Recordarme
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary ms-auto">
                      <i className="bi bi-box-arrow-in-right"></i> Ingresar
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Todos los derechos reservados &copy; 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
