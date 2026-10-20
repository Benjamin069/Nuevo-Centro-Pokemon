import { useState } from 'react';
import './App.css';

export default function App() {
  // Manejo de pantallas y del carrito
  const [pagina, setPagina] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  // Catalogo de productos y servicios
  const listaServicios = [
    { id: 1, nombre: 'Curación Total PS/PP', categoria: 'salud', precio: 0, img: '/png/Curación Total PS-PP.png' },
    { id: 2, nombre: 'Tratamiento Estado Alterado', categoria: 'salud', precio: 200, img: null },
    { id: 3, nombre: 'Poción de Máxima Salud', categoria: 'items', precio: 700, img: '/png/pocion maxima.webp' },
    { id: 4, nombre: 'Guardería y Cuidados Diarios', categoria: 'cuidado', precio: 500, img: null },
    { id: 5, nombre: 'Ultra Ball (Pack x5)', categoria: 'items', precio: 1200, img: '/png/Ultra Ball.webp' },
    { id: 6, nombre: 'Revivir Máximo', categoria: 'items', precio: 1500, img: '/png/Revivir_m%3Fximo_GO.webp' },
    { id: 7, nombre: 'MT24 - Rayo', categoria: 'items', precio: 3000, img: '/png/MT24 - Rayo.webp' },
    { id: 8, nombre: 'Masaje Relajante Pokémon', categoria: 'cuidado', precio: 350, img: null },
  ];

  // Funciones para agregar o limpiar la mochila
  const agregarAlCarrito = (item) => {
    setCarrito([...carrito, item]);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Suma de los precios en el carrito
  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Filtro de la lista según lo seleccionado
  const serviciosFiltrados = filtroCategoria === 'todos' 
    ? listaServicios 
    : listaServicios.filter(s => s.categoria === filtroCategoria);

  return (
    <div className="app-container">
      {/* Barra superior con el menu */}
      <header className="header">
        <div className="logo">
          <h1>Centro Pokémon</h1>
        </div>
        <nav className="navbar">
          <button className={pagina === 'inicio' ? 'active' : ''} onClick={() => setPagina('inicio')}>Inicio</button>
          <button className={pagina === 'servicios' ? 'active' : ''} onClick={() => setPagina('servicios')}>Servicios</button>
          <button className={pagina === 'pokedex' ? 'active' : ''} onClick={() => setPagina('pokedex')}>Pokédex</button>
          <button className={pagina === 'blogs' ? 'active' : ''} onClick={() => setPagina('blogs')}>Blogs</button>
          <button className={pagina === 'nosotros' ? 'active' : ''} onClick={() => setPagina('nosotros')}>Nosotros</button>
          <button className={pagina === 'contacto' ? 'active' : ''} onClick={() => setPagina('contacto')}>Contacto</button>
        </nav>
      </header>

      {/* Vistas principales */}
      <main className="main-content">
        {/* Inicio */}
        {pagina === 'inicio' && (
          <section>
            <div className="hero">
              <h2>Bienvenido al Centro Pokémon</h2>
              <p>Salud, bienestar y entrenamiento especializado para tus compañeros de aventura.</p>
              <button className="btn" onClick={() => setPagina('servicios')}>Ver Servicios</button>
            </div>
            <div className="servicios-destacados">
              <h2>Nuestros Servicios Destacados</h2>
              <div className="grid">
                <div className="card">
                  <h3>Centro de Curación</h3>
                  <p>Restauración completa de PS y PP en tiempo récord con la tecnología de la Enfermera Joy.</p>
                  <button className="btn-secondary" onClick={() => setPagina('pokedex')}>Ir a la Pokédex</button>
                </div>
                <div className="card">
                  <h3>Consejos y Noticias</h3>
                  <p>Mantente informado con las últimas noticias y consejos para ser un mejor Entrenador.</p>
                  <button className="btn-secondary" onClick={() => setPagina('blogs')}>Leer Artículos</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Catalogo de servicios y carrito */}
        {pagina === 'servicios' && (
          <section>
            <h2>Catálogo de Servicios y Suministros</h2>
            <div className="filtros">
              <label htmlFor="cat">Filtrar por categoría: </label>
              <select id="cat" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                <option value="todos">Todos los servicios</option>
                <option value="salud">Salud</option>
                <option value="items">Ítems</option>
                <option value="cuidado">Guardería y Cuidados</option>
              </select>
            </div>

            <div className="grid">
              {serviciosFiltrados.map((item) => (
                <div key={item.id} className="card">
                  {item.img && <img src={item.img} alt={item.nombre} className="poke-img" />}
                  <h3>{item.nombre}</h3>
                  <p><strong>Categoría:</strong> {item.categoria}</p>
                  <p><strong>Precio:</strong> ${item.precio} Pokédolares</p>
                  <button className="btn-add" onClick={() => agregarAlCarrito(item)}>
                    Añadir al Carrito
                  </button>
                </div>
              ))}
            </div>

            {/* Ventana flotante de la mochila */}
            <button className="btn-carrito-flotante" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
              Mochila ({carrito.length})
            </button>

            {mostrarCarrito && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Mochila de Compras</h3>
                  {carrito.length === 0 ? (
                    <p>Tu mochila está vacía.</p>
                  ) : (
                    <ul>
                      {carrito.map((prod, index) => (
                        <li key={index}>{prod.nombre} - ${prod.precio}</li>
                      ))}
                    </ul>
                  )}
                  <p><strong>Total: ${totalCarrito} Pokédolares</strong></p>
                  <div className="modal-actions">
                    <button onClick={vaciarCarrito}>Vaciar</button>
                    <button onClick={() => alert('¡Compra realizada con éxito!')}>Comprar</button>
                    <button onClick={() => setMostrarCarrito(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Pokedex */}
        {pagina === 'pokedex' && (
          <section>
            <h2>Pokédex Regional</h2>
            <p>Consulta la información básica de las especies Pokémon atendidas en nuestro centro.</p>
            <div className="grid">
              <div className="card">
                <img src="/png/bulbasaur.png" alt="Bulbasaur" className="poke-img" />
                <h3>Bulbasaur #001</h3>
                <p><strong>Tipo:</strong> Planta / Veneno</p>
                <p>Nace con una semilla en el lomo que va creciendo con él.</p>
              </div>
              <div className="card">
                <img src="/png/charmander.png" alt="Charmander" className="poke-img" />
                <h3>Charmander #004</h3>
                <p><strong>Tipo:</strong> Fuego</p>
                <p>La llama de su cola indica la salud y fuerza vital que posee.</p>
              </div>
              <div className="card">
                <img src="/png/squirtle.png" alt="Squirtle" className="poke-img" />
                <h3>Squirtle #007</h3>
                <p><strong>Tipo:</strong> Agua</p>
                <p>Su caparazón reduce la resistencia al agua al nadar.</p>
              </div>
            </div>
          </section>
        )}

        {/* Seccion de noticias sin fotos */}
        {pagina === 'blogs' && (
          <section>
            <h2>Noticias y Artículos de Interés</h2>
            <div className="grid">
              <article className="card">
                <h3>Consejos para Cuidar Pokémones Tipo Fuego</h3>
                <p><small>03 de Septiembre, 2026</small></p>
                <p>Descubre las mejores prácticas para mantener la llama de Charmander en temporada de lluvia.</p>
              </article>

              <article className="card">
                <h3>Importancia de la Nutrición Equilibrada</h3>
                <p><small>28 de Agosto, 2026</small></p>
                <p>Análisis sobre cómo las bayas influyen en las estadísticas base y combate.</p>
              </article>

              <article className="card">
                <h3>Tecnologías en la Curación de Estados</h3>
                <p><small>15 de Agosto, 2026</small></p>
                <p>Entrevista con la Enfermera Joy sobre la automatización del Centro.</p>
              </article>
            </div>
          </section>
        )}

        {/* Informacion de la institucion */}
        {pagina === 'nosotros' && (
          <section>
            <h2>Sobre Nosotros</h2>
            <div className="grid">
              <div className="card">
                <h3>Misión</h3>
                <p>Brindar atención médica, curativa y preventiva de la más alta calidad.</p>
              </div>
              <div className="card">
                <h3>Visión</h3>
                <p>Ser la red asistencial líder en innovación médica e investigación Pokémon.</p>
              </div>
            </div>
          </section>
        )}

        {/* Formulario para mensajes */}
        {pagina === 'contacto' && (
          <section>
            <h2>Formulario de Contacto</h2>
            <form className="form-contacto" onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado'); }}>
              <div className="campo">
                <label>Nombre Completo:</label>
                <input type="text" required placeholder="Ej: Ash Ketchum" />
              </div>
              <div className="campo">
                <label>Correo Electrónico:</label>
                <input type="email" required placeholder="entrenador@ejemplo.com" />
              </div>
              <div className="campo">
                <label>Mensaje:</label>
                <textarea rows="4" required placeholder="Escribe tu mensaje..."></textarea>
              </div>
              <button type="submit" className="btn">Enviar Mensaje</button>
            </form>
          </section>
        )}
      </main>

      {/* Pie de pagina */}
      <footer className="footer">
        <p>© 2026 Centro Pokémon - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}