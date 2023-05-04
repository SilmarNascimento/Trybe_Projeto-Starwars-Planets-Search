import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockData from './helper/mockData';

describe('Verifica se o componente Table é renderizado corretamente', () => {
  const URL = 'https://swapi.dev/api/planets';

  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('Verifica se a tabela é renderizada corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(URL);
      expect(fetch).toBeCalledTimes(1);
    });

    const planetsRow = await screen.findAllByTestId('planet-name');
    expect(planetsRow).toHaveLength(10);
  });

  test('Verifica se filtros e multiplos filtros renderizam o componente Tabela corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(URL);
      expect(fetch).toBeCalledTimes(1);
    });

    await screen.findAllByTestId('planet-name');

    const featureCombobox = screen.getAllByRole('combobox');
    const numberInput = screen.getByRole('spinbutton');
    const formBtns = screen.getAllByRole('button');

    userEvent.selectOptions(featureCombobox[0], 'rotation_period');
    userEvent.selectOptions(featureCombobox[1], 'menor que');
    userEvent.type(numberInput, '20');
    userEvent.click(formBtns[0]);

    const removeFilter = await screen.findByRole('button', {
      name: /limpar filtro/i,
    });
    const planetRowsOneFilter = await screen.findAllByTestId('planet-name');
    expect(removeFilter).toBeInTheDocument();
    expect(planetRowsOneFilter).toHaveLength(2);

    userEvent.selectOptions(featureCombobox[0], 'diameter');
    userEvent.selectOptions(featureCombobox[1], 'maior que');
    userEvent.type(numberInput, '5000');
    userEvent.click(formBtns[0]);

    const removeFilterBtn = await screen.findAllByTestId('filter');
    const planetRowsTwoFilters = await screen.findAllByTestId('planet-name');
    expect(removeFilterBtn).toHaveLength(2);
    expect(planetRowsTwoFilters).toHaveLength(1);

    userEvent.selectOptions(featureCombobox[0], 'orbital_period');
    userEvent.selectOptions(featureCombobox[1], 'igual a');
    userEvent.type(numberInput, '5110');
    userEvent.click(formBtns[0]);

    const planetRowsThreeFilters = await screen.findAllByTestId('planet-name');
    expect(planetRowsThreeFilters).toHaveLength(1);
  });

  test('Verifica a funcionalidade do botão "ordenar" com filtro "ASC"', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(URL);
      expect(fetch).toBeCalledTimes(1);
    });

    await screen.findAllByTestId('planet-name');
    const featureCombobox = screen.getAllByRole('combobox');
    const radioBtns = screen.getAllByRole('radio');
    const btns = screen.getAllByRole('button');

    userEvent.selectOptions(featureCombobox[2], 'rotation_period');
    userEvent.click(radioBtns[0]);
    userEvent.click(btns[1]);

    userEvent.selectOptions(featureCombobox[2], 'population');
    userEvent.click(radioBtns[0]);
    userEvent.click(btns[1]);

    const info = await screen.findAllByTestId('planet-name');
    expect(info).toHaveLength(10);
  });

  test('Verifica a funcionalidade do botão "ordenar" com filtro "DESC"', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(URL);
      expect(fetch).toBeCalledTimes(1);
    });

    await screen.findAllByTestId('planet-name');
    const featureCombobox = screen.getAllByRole('combobox');
    const radioBtns = screen.getAllByRole('radio');
    const btns = screen.getAllByRole('button');

    userEvent.selectOptions(featureCombobox[2], 'rotation_period');
    userEvent.click(radioBtns[1]);
    userEvent.click(btns[1]);

    userEvent.selectOptions(featureCombobox[2], 'population');
    userEvent.click(radioBtns[1]);
    userEvent.click(btns[1]);
  });

});