const {
    AuthRealm,
    SecurityUtils,
    ShiroFilterFactory,
    ShiroConfig,
    RealmSecurityManager,
    UsernamePasswordToken,
    AuthenticationInfo,
    AuthorizationInfo,
} = require("../lib/index");

const Koa = require('koa');
const app = new Koa();


class MyRealm extends AuthRealm{
    async doGetAuthenticationInfo(token){
        return new AuthenticationInfo('zyd', '12345');
    }
    async doGetAuthorizationInfo(token){
        return new AuthorizationInfo(['admin','sys'], ['create', 'delete']);
    }
}

let securityManager = new RealmSecurityManager(new MyRealm());

const factory = new ShiroFilterFactory(new ShiroConfig());
factory.setSecurityManager(securityManager);
const instance = factory.createInstance();

SecurityUtils.setSecurityManager(securityManager);

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response
app.use(async ctx => {
    instance.doFilter(ctx.request, ctx.response);
    let subject = SecurityUtils.getSubjectById(ctx.request);
    if(subject == null){
        subject = SecurityUtils.getSubject();
    }
    if(!subject.isAuthenticated() && ctx.request.url != '/logout'){
        await subject.login(new UsernamePasswordToken('zyd', '12345'));
        let subjectId = '123';
        ctx.cookies.set('subjectId', subjectId);
        SecurityUtils.addSubject(subjectId, subject);
    }
    ctx.body = 'Hello World';
});

app.listen(3000);