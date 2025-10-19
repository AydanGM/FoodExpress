import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../pages/Checkout";

// --- Mocks ---
const mockNavigate = vi.fn();
const mockClearCart = vi.fn();
let mockItems = [];
const mockGetTotal = () => mockItems.reduce((sum, i) => sum + (i.PRECIO * i.quantity), 0);

// Mock de react-router-dom para controlar la navegación
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock del contexto del carrito para controlar su estado
vi.mock("../context/CartContext", () => ({
    useCart: () => ({
        items: mockItems,
        getTotal: mockGetTotal,
        clearCart: mockClearCart,
        removeFromCart: vi.fn(), // Añadido para un mock más completo
    }),
}));

// Mock de window.alert para que no aparezca en la consola de tests
global.alert = vi.fn();

// --- Configuración de Tests ---
beforeEach(() => {
    vi.clearAllMocks(); // Limpia los mocks antes de cada test
    mockItems = []; // Resetea los items del carrito
});

afterEach(() => {
    vi.useRealTimers(); // Restaura los temporizadores reales después de usar `vi.useFakeTimers()`
});

const renderComponent = () => {
    return render(
        <MemoryRouter>
            <Checkout />
        </MemoryRouter>
    );
};

describe("Página de Checkout", () => {
    it("muestra mensaje y link al menú si el carrito está vacío", () => {
        mockItems = [];
        renderComponent();

        expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
        const link = screen.getByRole("link", { name: /Volver al Menú/i });
        expect(link).toHaveAttribute("href", "/menu");
    });

    it("muestra el resumen del pedido y el formulario si hay items", () => {
        mockItems = [{ ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 2 }];
        renderComponent();

        // Verificar resumen del pedido
        const shippingCost = 750.00;
        const serviceFee = 200.00;
        const total = (10 * 2) + shippingCost + serviceFee;

        expect(screen.getByText("Pizza")).toBeInTheDocument();
        expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();
        expect(screen.getByText(`$${total.toFixed(2)}`)).toBeInTheDocument(); // Total final

        // Verificar formulario
        expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Número de Tarjeta/i)).toBeInTheDocument();
    }, 6000);

    it("muestra errores de validación si el formulario está vacío al enviar", async () => {
        mockItems = [{ ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 1 }];
        renderComponent();

        const payButton = screen.getByRole("button", { name: /Pagar Ahora/i });
        fireEvent.click(payButton);

        // Esperar a que aparezcan los mensajes de error
        expect(await screen.findByText("El nombre es obligatorio.")).toBeInTheDocument();
        expect(screen.getByText("El número de tarjeta debe tener 16 dígitos.")).toBeInTheDocument();
        expect(screen.getByText("El formato debe ser MM/AA.")).toBeInTheDocument();
        expect(screen.getByText("El CVC debe tener 3 o 4 dígitos.")).toBeInTheDocument();

        // Verificar que no se procedió al pago
        expect(mockClearCart).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it.skip("procesa el pago, limpia el carrito y redirige al inicio con un formulario válido", async () => {
        vi.useFakeTimers(); // Usamos temporizadores falsos para controlar el setTimeout

        mockItems = [{ ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 1 }];
        renderComponent();

        // Rellenar el formulario con datos válidos
        await fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: "Usuario de Prueba" } });
        await fireEvent.change(screen.getByLabelText(/Dirección de Envío/i), { target: { value: "Calle Falsa 123" } });
        await fireEvent.change(screen.getByLabelText(/Número de Tarjeta/i), { target: { value: "1111 2222 3333 4444" } });
        await fireEvent.change(screen.getByLabelText(/Expiración/i), { target: { value: "12/99" } });
        await fireEvent.change(screen.getByLabelText(/CVC/i), { target: { value: "123" } });

        // Enviar formulario
        const payButton = screen.getByRole("button", { name: /Pagar Ahora/i });
        fireEvent.click(payButton);

        // 1. Debe mostrar la pantalla de carga
        expect(await screen.findByText("Procesando tu pago...")).toBeInTheDocument();

        // 2. Avanzamos todos los temporizadores pendientes
        await vi.runAllTimersAsync();

        // 3. Verificar que se llamó a la alerta
        expect(global.alert).toHaveBeenCalledWith("¡Pago realizado con éxito! Gracias por tu compra.");

        // 4. Verificar que se limpió el carrito
        expect(mockClearCart).toHaveBeenCalledTimes(1);

        // 5. Verificar que se redirigió al inicio
        expect(mockNavigate).toHaveBeenCalledWith("/inicio");
    });

    it("el botón 'Cancelar Orden' es un enlace a /carrito", () => {
        mockItems = [{ ID: 1, NOMBRE: "Pizza", PRECIO: 10, quantity: 1 }];
        renderComponent();

        const cancelButton = screen.getByRole("button", { name: /Cancelar Orden/i });
        expect(cancelButton).toHaveAttribute("href", "/carrito");
    });
});