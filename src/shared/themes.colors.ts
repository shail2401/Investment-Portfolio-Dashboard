import { ThemeColors } from "../models/theme-colors.model";

export const THEMES_COLORS: ThemeColors[] = [
  {
    name: 'Default',
    colorSet: [
      '#083d77',
      '#ff6b6b',
      '#f4d35e',
      '#ee964b',
      '#f9573b'
    ]
  },
  {
    name: 'Bright',
    colorSet: [
      '#26547c',
      '#ff6b6b',
      '#ffd166',
      '#06d6a0',
      '#fcfcfc'
    ]
  }
];

export const LINE_CHART_THEME: any[] = [
  {
    fill: true,
    tension: 0.5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(6, 214, 160, 0.2)',
    borderColor: 'rgba(0, 200, 140, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    pointRadius: 3,
  },
  {
    fill: true,
    tension: 0.5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 209, 102, 0.2',
    borderColor: 'rgba(240, 180, 89, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    pointRadius: 3,
  },
  {
    fill: true,
    tension: 0.5,
    borderWidth: 1.5,
    backgroundColor: 'rgba(15, 78, 133, 0.2)',
    borderColor: 'rgba(3, 64, 128, 0.5)',
    pointBackgroundColor: '#000',
    pointBorderColor: '#000',
    pointHoverBackgroundColor: '#555',
    pointHoverBorderColor: '#555',
    pointRadius: 3,
  }
]