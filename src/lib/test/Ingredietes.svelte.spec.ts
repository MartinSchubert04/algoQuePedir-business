import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import IngredientesRow from '$lib/components/Ingredientes.svelte';
import { Ingrediente } from '$lib/types/Ingrediente';

describe('IngredientesRow', () => {
  const mockIngrediente = Ingrediente.fromJson({
    id: 1,
    nombre: 'Tomate',
    costoMercado: 50,
    grupoAlimenticio: 'Frutas y Verduras',
    esDeOrigenAnimal: false
  });

  const mockIngrediente2 = Ingrediente.fromJson({
    id: 1,
    nombre: 'CARNE',
    costoMercado: 500,
    grupoAlimenticio: 'ANIMAL',
    esDeOrigenAnimal: true
  });

  it('debería renderizar los datos del ingrediente correctamente cuando mostrar=true', async () => {
    const mockOnDelete = vi.fn();

    render(IngredientesRow, {
      ingrediente: mockIngrediente,
      mostrar: true,
      onDelete: mockOnDelete
    });

    // Nombre
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    // Costo
    expect(screen.getByText('$50')).toBeInTheDocument();
    // Grupo alimenticio
    expect(screen.getByText('Frutas y Verduras')).toBeInTheDocument();

  });



  it('no debería renderizar costo si mostrar=false', () => {
    const mockOnDelete = vi.fn();

    render(IngredientesRow, {
      ingrediente: mockIngrediente2,
      mostrar: false,
      onDelete: mockOnDelete
    });

    expect(screen.queryByText('$500')).not.toBeInTheDocument();
  });
});
