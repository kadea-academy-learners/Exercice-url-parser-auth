import User from '#models/user';
import { loginvalidatore, uservalidatore } from '#validators/user';
export default class UsersController {
    async singIn({ request, response, view }) {
        const data = request.all();
        const payload = await uservalidatore.validate(data);
        try {
            const findUser = await User.findBy('email', payload.email);
            console.log('finuser', findUser);
            if (findUser) {
                response.status(400).send({ messages: "Utilisateur non trouvé" });
                return response.redirect('pages/login');
            }
            await User.create({ email: payload.email, username: payload.username, password: payload.password, role: payload.role });
            return view.render('pages/login', { username: payload.username });
        }
        catch (error) {
            return response.redirect().back();
        }
    }
    async login({ request, response, view, auth }) {
        const data = request.all();
        const payload = await loginvalidatore.validate(data);
        try {
            const user = await User.findBy('email', payload.email);
            console.log(user);
            if (!user) {
                response.status(400).send({ messages: "Utilisateur non trouvé" });
                return response.redirect('pages/login');
            }
            console.log('credent');
            await auth.use('web').login(user);
            return view.render('pages/home', { isAuthenticated: true,
                user: user
            });
        }
        catch (error) {
            response.status(400).send({ messages: error });
            return response.redirect().back();
        }
    }
    async logout({ response, auth }) {
        await auth.use('web').logout();
        return response.redirect().toRoute('login');
    }
}
//# sourceMappingURL=users_controller.js.map