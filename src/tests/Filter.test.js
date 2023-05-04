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

  test('Verifica se os botões de remover filtro e remover tudo estão renderizados corretamente', async () => {
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

    userEvent.selectOptions(featureCombobox[0], 'diameter');
    userEvent.selectOptions(featureCombobox[1], 'maior que');
    userEvent.type(numberInput, '5000');
    userEvent.click(formBtns[0]);

    userEvent.selectOptions(featureCombobox[0], 'orbital_period');
    userEvent.selectOptions(featureCombobox[1], 'igual a');
    userEvent.type(numberInput, '5110');
    userEvent.click(formBtns[0]);

    const removeFilterBtn = await screen.findAllByTestId('filter');
    const removeAllBtn = await screen.findByRole('button', {
      name: /remover tudo/i,
    });

    expect(removeFilterBtn).toHaveLength(3);
    expect(removeAllBtn).toBeInTheDocument();
  });

  test('Verifica se os botões Limpar Filtro está funcionando corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(URL);
      expect(fetch).toBeCalledTimes(1);
    });

    const tableWithoutFilter =  await screen.findAllByTestId('planet-name');
    expect(tableWithoutFilter).toHaveLength(10);

    const featureCombobox = screen.getAllByRole('combobox');
    const numberInput = screen.getByRole('spinbutton');
    const formBtns = screen.getAllByRole('button');

    userEvent.selectOptions(featureCombobox[0], 'rotation_period');
    userEvent.selectOptions(featureCombobox[1], 'menor que');
    userEvent.type(numberInput, '20');
    userEvent.click(formBtns[0]);

    userEvent.selectOptions(featureCombobox[0], 'diameter');
    userEvent.selectOptions(featureCombobox[1], 'maior que');
    userEvent.type(numberInput, '5000');
    userEvent.click(formBtns[0]);

    userEvent.selectOptions(featureCombobox[0], 'orbital_period');
    userEvent.selectOptions(featureCombobox[1], 'igual a');
    userEvent.type(numberInput, '5110');
    userEvent.click(formBtns[0]);

    const removeFilterBtn = await screen.findAllByRole('button', {
      name: /limpar filtro/i,
    });
    const filteredTable = await screen.findAllByTestId('planet-name');
    expect(removeFilterBtn).toHaveLength(3);
    expect(filteredTable).toHaveLength(1);

    userEvent.click(removeFilterBtn[1]);
    const lastTable = await screen.findAllByTestId('planet-name');
    expect(lastTable).toHaveLength(1);
  });

  test('Verifica se o botão Remover Tudo está funcionando corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(URL);
      expect(fetch).toBeCalledTimes(1);
    });

    const tableWithoutFilter =  await screen.findAllByTestId('planet-name');
    expect(tableWithoutFilter).toHaveLength(10);

    const featureCombobox = screen.getAllByRole('combobox');
    const numberInput = screen.getByRole('spinbutton');
    const formBtns = screen.getAllByRole('button');

    userEvent.selectOptions(featureCombobox[0], 'rotation_period');
    userEvent.selectOptions(featureCombobox[1], 'menor que');
    userEvent.type(numberInput, '20');
    userEvent.click(formBtns[0]);

    userEvent.selectOptions(featureCombobox[0], 'diameter');
    userEvent.selectOptions(featureCombobox[1], 'maior que');
    userEvent.type(numberInput, '5000');
    userEvent.click(formBtns[0]);

    userEvent.selectOptions(featureCombobox[0], 'orbital_period');
    userEvent.selectOptions(featureCombobox[1], 'igual a');
    userEvent.type(numberInput, '5110');
    userEvent.click(formBtns[0]);

    const filteredTable = await screen.findAllByTestId('planet-name');
    expect(filteredTable).toHaveLength(1);

    const removeAllBtn = await screen.findByRole('button', {
      name: /remover tudo/i,
    });

    userEvent.click(removeAllBtn);

    const lastTable = await screen.findAllByTestId('planet-name');
    expect(lastTable).toHaveLength(10);
  });
});
