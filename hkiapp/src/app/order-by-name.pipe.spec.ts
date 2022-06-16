import { OrderByNamePipe } from './order-by-name.pipe';

describe('OrderByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
