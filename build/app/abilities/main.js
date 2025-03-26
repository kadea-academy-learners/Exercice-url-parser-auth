import { Bouncer } from '@adonisjs/bouncer';
export const editUser = Bouncer.ability(() => {
    return true;
});
export const deleteUrl = Bouncer.ability((user, url) => {
    if (user.id === url.userId && user.role === 'admin') {
        return true;
    }
    return false;
});
export const updateUrl = Bouncer.ability((user, url) => {
    if (user.id === url.userId) {
        return true;
    }
    return false;
});
//# sourceMappingURL=main.js.map