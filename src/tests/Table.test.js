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
    render(<App />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    await waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
      expect(fetch).toBeCalledWith(URL);
    })

    const header = screen.getAllByRole('columnheader');

    expect(header).toHaveLength(13);
  });

  test('Verifica a funcionalidade do botão "ordenar"', () => {
    render(<App />);
    // const featureCombobox = screen.getAllByRole('combobox');
    // const radioBtns = screen.getAllByRole('radio');
  });

});