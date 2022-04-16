import { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination';
// import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Form1 from './views/Form1';
// import Form2 from './views/Form2';

const arr = [];

for (let i = 0; i < 1000; i++) {
    arr.push({
        id: i + 1,
        title: 'Data ' + (i + 1),
    });
}

const fakeReqPagi = ({ index = 1, size = 10 }) => {
    return new Promise((resolve) => {
        const res = {
            pageInfo: {
                index,
                size,
                total: arr.length,
            },
            data: arr.slice((index - 1) * size, (index - 1) * size + size),
        };

        setTimeout(() => {
            resolve(res);
        }, 1000);
    });
};

function App() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pagiInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async (pInfo = {}) => {
        setLoading(true);

        const res = await fakeReqPagi(pInfo);

        const { data, pageInfo } = res;

        setData(data);
        setPageInfo({
            current: pageInfo.index,
            pageSize: pageInfo.size,
            total: pageInfo.total,
        });

        setLoading(false);
    };

    const handleChange = (page, pageSize) => {
        setPageInfo({
            ...pagiInfo,
            current: page,
            pageSize,
        });

        getData({
            index: page,
            size: pageSize,
        });
    };

    return (
        <div className='App'>
            <h1>Test Pagination</h1>

            {/* <Link to='/form1'>Form 1</Link>
            <Link to='/form2'>Form 2</Link>

            <Route path={'/form1'} children={<Form1 />} />
            <Route path={'/form2'} children={<Form2 />} /> */}
            
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'black',
                        opacity: 0.9,
                        zIndex: 999,
                    }}>
                    <h3
                        style={{
                            color: 'white',
                            position: 'absolute',
                            zIndex: 1000,
                            fontSize: '20px',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                        Loading...
                    </h3>
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination
                showSizeChanger={true}
                showQuickJumper={true}
                onChange={handleChange}
                pageSizeOptions = {[10, 20, 50, 100, 200]}
                {...pagiInfo}
            />
        </div>
    );
}

export default App;
