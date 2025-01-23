
import {render, screen, fireEvent} from '@testing-library/angular'
import { CounterComponent } from './counter.component';

describe('Counter', () => {
  it('should render counter', async () => {
    await render(CounterComponent, {
      componentProperties: {counter: 5},
    })

    expect(screen.getByText('Current Count: 5')).toBeTruthy();
  })

  it('should increment the counter on click', async () => {
    await render(CounterComponent, {
      componentProperties: {counter: 5},
    })

    fireEvent.click(screen.getByText('+'))

    expect(screen.getByText('Current Count: 6')).toBeTruthy();
  })
})












