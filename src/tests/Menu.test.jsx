import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Menu from "../pages/Menu";

/*
  Test independiente del backend:
  - usa itemsMock (variable local) como fuente de datos
  - stubea global.fetch para devolverla
  - envuelve el render con MemoryRouter para que useLocation/useNavigate funcionen
*/

afterEach(() => {
  cleanup();
  // restaurar mocks globales para no contaminar otros tests
  try { vi.unstubAllGlobals(); } catch (e) {}
  vi.resetAllMocks();
});

const itemsMock = [
  {
    ID: 1,
    NOMBRE: "Ensalada",
    IMAGEN_URL: "/assets/img/pngtree-egg-salads-isolated.png",
    PRECIO: 5,
    tipoElemento: "comida",
    CATEGORIA: "ensalada",
  },
];

test("carga y renderiza items usando datos locales (no requiere backend)", async () => {
  // stubear fetch para devolver itemsMock
  vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(itemsMock),
    })
  ));

  // se envuelve con MemoryRouter para que useLocation() esté disponible
  render(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  // busca el heading del item
  expect(await screen.findByRole("heading", { name: /Ensalada/i })).toBeInTheDocument();

  // verificar que la imagen usa la ruta definida en itemsMock
  const img = screen.getByRole("img", { name: /Ensalada/i });
  expect(img).toHaveAttribute("src", "/assets/img/pngtree-egg-salads-isolated.png");
});

test("muestra mensaje de error cuando fetch (stub) devuelve ok: false", async () => {
  // stubear fetch para simular fallo del endpoint
  vi.stubGlobal("fetch", vi.fn(() =>
    Promise.resolve({ ok: false })
  ));

  render(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  // el componente debe mostrar algun texto de error
  await waitFor(() => {
    const maybeError = screen.queryByText(/error|falló|no se pudo/i);
    expect(maybeError).toBeTruthy();
  });
});