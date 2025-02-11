import { PaginationPresenter, PaginationPresenterProps } from './pagination.presenter';

describe('PaginationPresenter', () => {
    it('should correctly initialize with given props', () => {
        const props: PaginationPresenterProps = {
            current_page: 1,
            per_page: 10,
            last_page: 5,
            total: 50,
            data: [{ id: 1, name: 'Test' }]
        };

        const presenter = new PaginationPresenter(props);

        expect(presenter.current_page).toBe(1);
        expect(presenter.per_page).toBe(10);
        expect(presenter.last_page).toBe(5);
        expect(presenter.total).toBe(50);
        expect(presenter.data).toEqual([{ id: 1, name: 'Test' }]);
    });

    it('should transform string numbers to integers', () => {
        const props: PaginationPresenterProps = {
            current_page: "1" as any,
            per_page: '10' as any,
            last_page: '5' as any,
            total: '50' as any,
            data: [{ id: 1, name: 'Test' }]
        };

        const presenter = new PaginationPresenter(props);

        expect(presenter.current_page).toBe("1");
        expect(presenter.per_page).toBe("10");
        expect(presenter.last_page).toBe("5");
        expect(presenter.total).toBe("50");
    });
});