import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const urls = () => import('#controllers/urls_controller');
const auth = () => import('#controllers/users_controller');
router.on('/').render('pages/singIn').as('singIn');
router.on('/pages/home').render('pages/home').as('home').use(middleware.auth());
router.on('/pages/login').render('pages/login').as('login');
router.post('/url', [urls, 'generate']).use(middleware.auth());
router.get('pages/goToUrl', [urls, 'showUrls']).as('goToUrl').use(middleware.auth());
router.post('/singIn', [auth, 'singIn']).as('singIN');
router.post('/login', [auth, 'login']);
router.post('/urls/:id', [urls, 'deleteUrl']).as('deleteUrl').use(middleware.auth());
router.post('/urls/update/:id', [urls, 'updateUrl']).as('updateUrl').use(middleware.auth());
router.post('/logout', [auth, 'logout']).as('logout').use(middleware.auth());
//# sourceMappingURL=routes.js.map