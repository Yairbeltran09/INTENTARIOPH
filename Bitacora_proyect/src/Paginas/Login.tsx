import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="form-signin bg-white p-4 rounded shadow" style={{ maxWidth: "400px" }}>
              <form>
                <h1 className="h3 mb-3 fw-normal">Inicie sesión</h1>
                <p>Inicie sesión ingresado su usario y contraseña</p>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingInput"
                    placeholder="Usuario"
                    type="text"
                  />
                  <label htmlFor="floatingInput">Usuario:</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Contraseña"
                    type="password"
                  />
                  <label htmlFor="floatingPassword">Contraseña:</label>
                </div>
                <div className="form-check text-start my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="remember-me"
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Recordar
                  </label>
                </div>
                <Link to={'/Proveedores'}> 
                <button className="btn  btn-secondary w-100 text-white py-2" type="submit">
                  <Link to={'/Reportes'}/>
                  Iniciar Sesión
                </button>
                </Link>
                <p className="mt-5 mb-3 text-body-secondary text-center">
                  Copyright © 2024 Todos los derechos reservados
                </p>
              </form>
            </div>
          </div>
        </div>
    );
  };
  
  export default Login;
  