import Home from '../components/Admin/Pages/index';
import NotFound from '../components/404';
import ChiTiet from '../components/Admin/Posts/viewPost';
import TimKiem from '../components/Admin/Posts/viewPost';
// import DangKy from '../pages/register';
// import DangNhap from '../pages/login';

const Routes=[
    {   path: '/',
        exact: true,
        main: Home
    },
    {
        path: '/chi-tiet/:id',
        exact: true,
        main: ChiTiet
    },
    {
        path: '/tim-kiem/:search',
        exact: true,
        main: TimKiem
    },
    // {
    //     path: '/dang-ky',
    //     exact: true,
    //     main: DangKy
    // },
    // {
    //     path: '/dang-nhap',
    //     exact: true,
    //     main: DangNhap
    // },
    {
        path: '',
        exact: false,
        main: NotFound
    }
]
export default Routes;