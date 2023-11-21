import { render, waitFor } from '@testing-library/react';
import { Dashboard } from "../Dashboard";
import { Observable, from, of } from 'rxjs';
import React from 'react';

// generate react testing library test for Dashboard
describe('<Dashboard />', () => {
  describe('#render', () => {
    it('should render heroes', async () => {
      const { container }  = render(<Dashboard heroes$={of([{ id:1, name:'foo' }])} />)

      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });

    it('should render empty list', async () => {
      const { container }  = render(<Dashboard heroes$={of([])} />)

      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    });
   })
 })
