import vine from '@vinejs/vine';
export const uservalidatore = vine.compile(vine.object({
    email: vine.string().email().minLength(6).maxLength(254).email(),
    username: vine.string().minLength(3).maxLength(20),
    password: vine.string().minLength(3).maxLength(20),
    role: vine.enum(['admin', 'user']),
}));
export const loginvalidatore = vine.compile(vine.object({
    email: vine.string().email().minLength(6).maxLength(254).email(),
    password: vine.string().minLength(3).maxLength(20),
}));
export const urlvalidatore = vine.compile(vine.object({
    url: vine.string().url().minLength(6).maxLength(254),
    shortUrl: vine.string().minLength(3).maxLength(20),
}));
//# sourceMappingURL=user.js.map