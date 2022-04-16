import { useMemo, useState } from 'react';

const Pagination = ({
    current = 1,
    pageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 100],
    showQuickJumper = false,
    showSizeChanger = true,
    total = 0,
    onChange,
}) => {
    const [currentPage, setCurrentPage] = useState(current);
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);
    const [pageJump, setPageJump] = useState();

    const handleChangePageSize = (e) => {
        const pageSize = Number(e.target.value);
        const numberOfPages = Math.ceil(total / pageSize);

        if (currentPage > numberOfPages) {
            setCurrentPage(1);
            setCurrentPageSize(pageSize);

            onChange(1, pageSize);
        } else {
            setCurrentPageSize(pageSize);
            onChange(currentPage, pageSize);
        }
    };

    const handleChangePage = (value) => {
        setCurrentPage(value);

        onChange(value, currentPageSize);
    };

    const handleChangePageJump = (e) => {
        setPageJump(e.target.value);
    };

    const handleBlurPageJump = () => {
        if (isNaN(pageJump)) return;

        if (pageJump < 1) {
            setCurrentPage(1);
            return;
        }

        const numberOfPages = Math.ceil(total / currentPageSize);

        if (pageJump > numberOfPages) {
            setCurrentPage(numberOfPages);
            return;
        }

        setCurrentPage(Number(pageJump));
        onChange(Number(pageJump), currentPageSize);
    };

    const renderPageSizeOptions = () => {
        return (
            <select onChange={handleChangePageSize} value={currentPageSize}>
                {pageSizeOptions.map((item) => {
                    return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        );
    };

    const renderPaginationItem = useMemo(() => {
        const numberOfPages = Math.ceil(total / currentPageSize);
        let items = [];

        if (numberOfPages <= 1) {
            items = [1];
        } else if (numberOfPages <= 5) {
            items = [1, 2, 3, 4, 5];
        } else {
            if (currentPage <= 3) {
                items = [1, 2, 3, 4, '...', numberOfPages];
            } else if (currentPage > 3 && currentPage < numberOfPages - 2) {
                items = [
                    1,
                    '...',
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    '...',
                    numberOfPages,
                ];
            } else {
                items = [
                    1,
                    '...',
                    numberOfPages - 3,
                    numberOfPages - 2,
                    numberOfPages - 1,
                    numberOfPages,
                ];
            }
        }

        return items.map((item) => {
            return (
                <li
                    onClick={
                        item !== '...' ? () => handleChangePage(item) : () => {}
                    }
                    className={`pagination__item ${
                        item === currentPage ? 'active' : ''
                    }`}>
                    {item}
                </li>
            );
        });
    }, [total, currentPageSize, currentPage]);

    return (
        <ul className='pagination'>
            {renderPaginationItem}

            {showSizeChanger && (
                <li className='pagination__options'>
                    {renderPageSizeOptions()}
                </li>
            )}

            {showQuickJumper && (
                <li className='pagination__jumber'>
                    Go to{' '}
                    <input
                        type='number'
                        value={pageJump || ''}
                        onChange={handleChangePageJump}
                        onBlur={handleBlurPageJump}
                    />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
