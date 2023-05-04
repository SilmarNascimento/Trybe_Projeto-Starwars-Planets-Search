import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Verifica se o component Form é renderizado corretamente', () => {
  test('Verifica se os inputs são renderizados', () => {
    render(<App />);

    const inputName = screen.getByRole('textbox', {
      name: /nome/i,
    });
    const numberInput = screen.getByRole('spinbutton');
    const buttons = screen.getAllByRole('button');
    const comboBoxs = screen.getAllByRole('combobox');
    const radioBtn = screen.getAllByRole('radio');


    expect(inputName).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
    expect(comboBoxs).toHaveLength(3);
    expect(radioBtn).toHaveLength(2);
  });

  test('Verifica se os campos de input renderizam os valores corretamente', () => {
    render(<App />);

    const textInput = screen.getByRole('textbox', {
      name: /nome/i,
    });
    const numberInput = screen.getByRole('spinbutton');

    userEvent.type(textInput, 'alderaan');
    userEvent.type(numberInput, '20');

    expect(textInput).toHaveValue('alderaan');
    expect(numberInput).toHaveValue(20);
  });

  test('Verifica se as options dos selects são renderizadas corretamente', () => {
    render(<App />);

    const featureCombobox = screen.getAllByRole('combobox');
    const options = screen.getAllByRole('option');
    userEvent.selectOptions(featureCombobox[0], 'population');
    userEvent.selectOptions(featureCombobox[1], 'igual a');
    userEvent.selectOptions(featureCombobox[2], 'population');

    
    expect(featureCombobox).toHaveLength(3);
    expect(options).toHaveLength(13);
    expect(options[0].selected).toBeTruthy();
    expect(options[7].selected).toBeTruthy();
    expect(options[8].selected).toBeTruthy();
  });

  test('Verifica se os radio button funcionam corretamente', () => {
    render(<App />);

    const radioBtns = screen.getAllByRole('radio');
    userEvent.click(radioBtns[0]);

    expect(radioBtns).toHaveLength(2);
    expect(radioBtns[0].checked).toBeTruthy();
    expect(radioBtns[1].checked).not.toBeTruthy();

    userEvent.click(radioBtns[1]);

    expect(radioBtns[0].checked).toBeFalsy();
    expect(radioBtns[1].checked).not.toBeFalsy();
  });

  test('Verifica a funcionalidade do botão "filtrar"', () => {
    render(<App />);

    const featureCombobox = screen.getAllByRole('combobox');
    const options = screen.getAllByRole('option');
    const numberInput = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', {
      name: /filtrar/i,
    });
    expect(featureCombobox[0]).toHaveLength(5);

    userEvent.selectOptions(featureCombobox[0], 'rotation_period');
    userEvent.selectOptions(featureCombobox[1], 'menor que');
    userEvent.type(numberInput, '20');

    expect(options[3].selected).toBeTruthy();
    expect(options[6].selected).toBeTruthy();
    expect(numberInput).toHaveValue(20);
    userEvent.click(filterBtn);

    expect(featureCombobox[0]).toHaveLength(4);
  });
});
